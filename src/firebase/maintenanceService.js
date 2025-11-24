import { db } from './config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const MAINTENANCE_DOC_ID = 'maintenance_settings';

// Fallback to localStorage if Firebase is unavailable
const FALLBACK_KEY = 'acft_maintenance_mode';

// Track active operations for cleanup
const activeOperations = new Set();

/**
 * Check if error is an abort error that should be suppressed
 * @param {Error} error - The error to check
 * @returns {boolean} Whether the error should be suppressed
 */
function isAbortError(error) {
  return (
    error?.name === 'AbortError' ||
    error?.message?.includes('aborted') ||
    error?.message?.includes('cancelled') ||
    error?.code === 'cancelled' ||
    error?.code === 'aborted'
  );
}

/**
 * Safely handle Firebase operations with abort protection
 * @param {Function} operation - The Firebase operation to execute
 * @param {string} operationName - Name of the operation for logging
 * @returns {Promise<any>} Result of the operation
 */
async function safeFirebaseOperation(operation, operationName) {
  const operationId = `${operationName}_${Date.now()}`;
  activeOperations.add(operationId);

  try {
    const result = await operation();
    return result;
  } catch (error) {
    // Suppress abort errors completely
    if (isAbortError(error)) {
      console.log(`Operation ${operationName} was cancelled (this is normal)`);
      return null;
    }
    
    // Log other errors but don't throw them
    console.warn(`Error in ${operationName}:`, error.message);
    return null;
  } finally {
    activeOperations.delete(operationId);
  }
}

/**
 * Get current maintenance mode status
 * @returns {Promise<boolean>} Maintenance mode status
 */
export async function getMaintenanceMode() {
  try {
    // Check if Firebase is available
    if (!db) {
      console.log('Firebase not available, using localStorage fallback');
      return getLocalStorageMaintenanceMode();
    }

    const result = await safeFirebaseOperation(async () => {
      const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const enabled = docSnap.data().enabled || false;
        // Update localStorage as backup
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
        return enabled;
      }
      
      // If document doesn't exist, create it with default value
      await setDoc(docRef, { 
        enabled: false,
        createdAt: new Date().toISOString()
      });
      
      // Update localStorage
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(false));
      return false;
    }, 'getMaintenanceMode');

    // If Firebase operation failed, use localStorage
    if (result === null) {
      return getLocalStorageMaintenanceMode();
    }

    return result;
  } catch (error) {
    // This should never happen due to safeFirebaseOperation, but just in case
    if (!isAbortError(error)) {
      console.warn('Unexpected error in getMaintenanceMode:', error.message);
    }
    return getLocalStorageMaintenanceMode();
  }
}

/**
 * Set maintenance mode status
 * @param {boolean} enabled - Whether maintenance mode should be enabled
 * @returns {Promise<boolean>} Success status
 */
export async function setMaintenanceMode(enabled) {
  try {
    // Always update localStorage first as backup
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
    
    // Check if Firebase is available
    if (!db) {
      console.log('Firebase not available, using localStorage only');
      return true;
    }

    const result = await safeFirebaseOperation(async () => {
      const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
      await setDoc(docRef, { 
        enabled,
        updatedAt: new Date().toISOString()
      });
      return true;
    }, 'setMaintenanceMode');

    // Always return true since localStorage was updated
    return true;
  } catch (error) {
    // This should never happen due to safeFirebaseOperation, but just in case
    if (!isAbortError(error)) {
      console.warn('Unexpected error in setMaintenanceMode:', error.message);
    }
    return true; // Still return true since localStorage was updated
  }
}

/**
 * Listen to maintenance mode changes in real-time
 * @param {function} callback - Callback function to handle changes
 * @returns {function} Unsubscribe function
 */
export function onMaintenanceModeChange(callback) {
  // Check if Firebase is available
  if (!db) {
    console.log('Firebase not available, using localStorage fallback');
    const enabled = getLocalStorageMaintenanceMode();
    callback(enabled);
    return () => {}; // Return empty unsubscribe function
  }

  let unsubscribe;
  let isActive = true;

  try {
    const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
    
    unsubscribe = onSnapshot(docRef, (doc) => {
      if (!isActive) return; // Prevent callback if unsubscribed
      
      try {
        if (doc.exists()) {
          const enabled = doc.data().enabled || false;
          // Update localStorage as backup
          localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
          callback(enabled);
        } else {
          callback(false);
        }
      } catch (callbackError) {
        if (!isAbortError(callbackError)) {
          console.warn('Error in maintenance mode callback:', callbackError.message);
        }
        // Fallback to localStorage
        const enabled = getLocalStorageMaintenanceMode();
        callback(enabled);
      }
    }, (error) => {
      if (!isActive) return; // Prevent error handling if unsubscribed
      
      // Suppress abort errors
      if (isAbortError(error)) {
        console.log('Maintenance mode listener was cancelled (this is normal)');
        return;
      }
      
      console.warn('Error listening to maintenance mode changes:', error.message);
      console.log('Falling back to localStorage');
      const enabled = getLocalStorageMaintenanceMode();
      callback(enabled);
    });
  } catch (error) {
    if (!isAbortError(error)) {
      console.warn('Error setting up maintenance mode listener:', error.message);
    }
    // Fallback to localStorage
    const enabled = getLocalStorageMaintenanceMode();
    callback(enabled);
    return () => {}; // Return empty unsubscribe function
  }

  // Return unsubscribe function that prevents further callbacks
  return () => {
    isActive = false;
    if (unsubscribe) {
      try {
        unsubscribe();
      } catch (error) {
        if (!isAbortError(error)) {
          console.warn('Error unsubscribing from maintenance mode listener:', error.message);
        }
      }
    }
  };
}

/**
 * Get maintenance mode from localStorage as fallback
 * @returns {boolean} Maintenance mode status from localStorage
 */
function getLocalStorageMaintenanceMode() {
  try {
    const stored = localStorage.getItem(FALLBACK_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return false;
  }
}

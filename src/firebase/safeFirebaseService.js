import { db } from './config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { createSafeAsyncWrapper, safeStateUpdate } from '../utils/globalErrorSuppression';

const MAINTENANCE_DOC_ID = 'maintenance_settings';
const FALLBACK_KEY = 'acft_maintenance_mode';

// Track active operations for cleanup
const activeOperations = new Map();

/**
 * Enhanced Firebase service with comprehensive abort protection
 */
class SafeFirebaseService {
  constructor() {
    this.isInitialized = false;
    this.initialize();
  }

  initialize() {
    try {
      this.isInitialized = !!db;
      if (!this.isInitialized) {
        console.log('Firebase not available, using localStorage fallback');
      }
    } catch (error) {
      console.log('Firebase initialization failed, using localStorage fallback');
      this.isInitialized = false;
    }
  }

  /**
   * Safe Firebase operation with abort protection
   */
  async safeOperation(operation, operationName, fallbackValue = null) {
    const operationId = `${operationName}_${Date.now()}`;
    
    try {
      activeOperations.set(operationId, true);
      
      if (!this.isInitialized) {
        return fallbackValue;
      }

      const result = await operation();
      return result;
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || '';
      
      // Suppress abort errors completely
      if (this.isAbortError(error)) {
        console.log(`Operation ${operationName} was cancelled (normal behavior)`);
        return fallbackValue;
      }
      
      // Log other errors but don't throw
      console.warn(`Error in ${operationName}:`, errorMessage);
      return fallbackValue;
    } finally {
      activeOperations.delete(operationId);
    }
  }

  /**
   * Check if error is abort-related
   */
  isAbortError(error) {
    const errorMessage = error?.message || error?.toString() || '';
    
    return (
      error?.name === 'AbortError' ||
      errorMessage.includes('aborted') ||
      errorMessage.includes('cancelled') ||
      errorMessage.includes('user aborted') ||
      errorMessage.includes('request aborted') ||
      error?.code === 'cancelled' ||
      error?.code === 'aborted' ||
      error?.code === 'abort'
    );
  }

  /**
   * Get maintenance mode with abort protection
   */
  async getMaintenanceMode() {
    return this.safeOperation(async () => {
      const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const enabled = docSnap.data().enabled || false;
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
        return enabled;
      }
      
      // Create document with default value
      await setDoc(docRef, { 
        enabled: false,
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(false));
      return false;
    }, 'getMaintenanceMode', this.getLocalStorageMaintenanceMode());
  }

  /**
   * Set maintenance mode with abort protection
   */
  async setMaintenanceMode(enabled) {
    // Always update localStorage first
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
    
    const result = await this.safeOperation(async () => {
      const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
      await setDoc(docRef, { 
        enabled,
        updatedAt: new Date().toISOString()
      });
      return true;
    }, 'setMaintenanceMode', true);

    return result;
  }

  /**
   * Listen to maintenance mode changes with abort protection
   */
  onMaintenanceModeChange(callback) {
    if (!this.isInitialized) {
      const enabled = this.getLocalStorageMaintenanceMode();
      callback(enabled);
      return () => {};
    }

    let unsubscribe;
    let isActive = true;
    const listenerId = `listener_${Date.now()}`;

    try {
      const docRef = doc(db, 'admin', MAINTENANCE_DOC_ID);
      
      unsubscribe = onSnapshot(docRef, (doc) => {
        if (!isActive) return;
        
        try {
          if (doc.exists()) {
            const enabled = doc.data().enabled || false;
            localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
            callback(enabled);
          } else {
            callback(false);
          }
        } catch (callbackError) {
          if (!this.isAbortError(callbackError)) {
            console.warn('Error in maintenance mode callback:', callbackError.message);
          }
          const enabled = this.getLocalStorageMaintenanceMode();
          callback(enabled);
        }
      }, (error) => {
        if (!isActive) return;
        
        if (this.isAbortError(error)) {
          console.log('Maintenance mode listener was cancelled (normal behavior)');
          return;
        }
        
        console.warn('Error listening to maintenance mode changes:', error.message);
        const enabled = this.getLocalStorageMaintenanceMode();
        callback(enabled);
      });
    } catch (error) {
      if (!this.isAbortError(error)) {
        console.warn('Error setting up maintenance mode listener:', error.message);
      }
      const enabled = this.getLocalStorageMaintenanceMode();
      callback(enabled);
      return () => {};
    }

    // Return unsubscribe function
    return () => {
      isActive = false;
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          if (!this.isAbortError(error)) {
            console.warn('Error unsubscribing from maintenance mode listener:', error.message);
          }
        }
      }
    };
  }

  /**
   * Get maintenance mode from localStorage
   */
  getLocalStorageMaintenanceMode() {
    try {
      const stored = localStorage.getItem(FALLBACK_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.warn('Error reading from localStorage:', error.message);
      return false;
    }
  }

  /**
   * Cleanup all active operations
   */
  cleanup() {
    activeOperations.clear();
  }
}

// Create singleton instance
const safeFirebaseService = new SafeFirebaseService();

// Export safe functions
export const getMaintenanceMode = createSafeAsyncWrapper(
  () => safeFirebaseService.getMaintenanceMode(),
  'getMaintenanceMode'
);

export const setMaintenanceMode = createSafeAsyncWrapper(
  (enabled) => safeFirebaseService.setMaintenanceMode(enabled),
  'setMaintenanceMode'
);

export const onMaintenanceModeChange = (callback) => {
  return safeFirebaseService.onMaintenanceModeChange(callback);
};

export default safeFirebaseService;

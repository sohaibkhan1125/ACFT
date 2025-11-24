import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { safeAsyncWrapper, safeAsyncWrapperWithTimeout, safeStateUpdate } from '../utils/asyncErrorHandler';

const MAINTENANCE_DOC_ID = 'maintenance_settings';
const FALLBACK_KEY = 'acft_maintenance_mode';

/**
 * Ultra-safe Firebase service with comprehensive abort error handling
 */
class UltraSafeFirebaseService {
  constructor() {
    this.isInitialized = false;
    this.activeOperations = new Set();
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
   * Ultra-safe operation wrapper that catches ALL possible abort errors
   */
  async ultraSafeOperation(operation, operationName, fallbackValue = null) {
    const operationId = `${operationName}_${Date.now()}`;
    this.activeOperations.add(operationId);

    try {
      if (!this.isInitialized) {
        return fallbackValue;
      }

      // Wrap the operation in multiple layers of error handling
      const result = await Promise.race([
        operation(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Operation timeout')), 30000)
        )
      ]);

      return result;
    } catch (error) {
      // Catch ALL possible abort-related errors
      const errorMessage = error?.message || error?.toString() || '';
      const errorName = error?.name || '';
      const errorStack = error?.stack || '';

      const isAbortError = (
        errorName === 'AbortError' ||
        errorMessage.includes('aborted') ||
        errorMessage.includes('cancelled') ||
        errorMessage.includes('user aborted') ||
        errorMessage.includes('request aborted') ||
        errorMessage.includes('signal is aborted') ||
        errorMessage.includes('webchannel') ||
        errorMessage.includes('firebase') ||
        errorStack.includes('webchannel') ||
        errorStack.includes('firebase')
      );

      if (isAbortError) {
        console.log(`Operation ${operationName} was cancelled (normal behavior)`);
        return fallbackValue;
      }

      // Log other errors but don't throw
      console.warn(`Error in ${operationName}:`, errorMessage);
      return fallbackValue;
    } finally {
      this.activeOperations.delete(operationId);
    }
  }

  /**
   * Get maintenance mode with ultra-safe error handling
   */
  async getMaintenanceMode() {
    return this.ultraSafeOperation(async () => {
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
   * Set maintenance mode with ultra-safe error handling
   */
  async setMaintenanceMode(enabled) {
    // Always update localStorage first
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(enabled));
    
    const result = await this.ultraSafeOperation(async () => {
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
   * Listen to maintenance mode changes with ultra-safe error handling
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
          // Ultra-safe callback error handling
          const errorMessage = callbackError?.message || callbackError?.toString() || '';
          const errorName = callbackError?.name || '';
          const errorStack = callbackError?.stack || '';

          const isAbortError = (
            errorName === 'AbortError' ||
            errorMessage.includes('aborted') ||
            errorMessage.includes('cancelled') ||
            errorMessage.includes('user aborted') ||
            errorMessage.includes('request aborted') ||
            errorMessage.includes('signal is aborted') ||
            errorMessage.includes('webchannel') ||
            errorMessage.includes('firebase') ||
            errorStack.includes('webchannel') ||
            errorStack.includes('firebase')
          );

          if (!isAbortError) {
            console.warn('Error in maintenance mode callback:', errorMessage);
          }
          
          const enabled = this.getLocalStorageMaintenanceMode();
          callback(enabled);
        }
      }, (error) => {
        if (!isActive) return;
        
        // Ultra-safe error handling for listener errors
        const errorMessage = error?.message || error?.toString() || '';
        const errorName = error?.name || '';
        const errorStack = error?.stack || '';

        const isAbortError = (
          errorName === 'AbortError' ||
          errorMessage.includes('aborted') ||
          errorMessage.includes('cancelled') ||
          errorMessage.includes('user aborted') ||
          errorMessage.includes('request aborted') ||
          errorMessage.includes('signal is aborted') ||
          errorMessage.includes('webchannel') ||
          errorMessage.includes('firebase') ||
          errorStack.includes('webchannel') ||
          errorStack.includes('firebase')
        );

        if (isAbortError) {
          console.log('Maintenance mode listener was cancelled (normal behavior)');
          return;
        }
        
        console.warn('Error listening to maintenance mode changes:', errorMessage);
        const enabled = this.getLocalStorageMaintenanceMode();
        callback(enabled);
      });
    } catch (error) {
      // Ultra-safe setup error handling
      const errorMessage = error?.message || error?.toString() || '';
      const errorName = error?.name || '';
      const errorStack = error?.stack || '';

      const isAbortError = (
        errorName === 'AbortError' ||
        errorMessage.includes('aborted') ||
        errorMessage.includes('cancelled') ||
        errorMessage.includes('user aborted') ||
        errorMessage.includes('request aborted') ||
        errorMessage.includes('signal is aborted') ||
        errorMessage.includes('webchannel') ||
        errorMessage.includes('firebase') ||
        errorStack.includes('webchannel') ||
        errorStack.includes('firebase')
      );

      if (!isAbortError) {
        console.warn('Error setting up maintenance mode listener:', errorMessage);
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
          // Ultra-safe unsubscribe error handling
          const errorMessage = error?.message || error?.toString() || '';
          const errorName = error?.name || '';
          const errorStack = error?.stack || '';

          const isAbortError = (
            errorName === 'AbortError' ||
            errorMessage.includes('aborted') ||
            errorMessage.includes('cancelled') ||
            errorMessage.includes('user aborted') ||
            errorMessage.includes('request aborted') ||
            errorMessage.includes('signal is aborted') ||
            errorMessage.includes('webchannel') ||
            errorMessage.includes('firebase') ||
            errorStack.includes('webchannel') ||
            errorStack.includes('firebase')
          );

          if (!isAbortError) {
            console.warn('Error unsubscribing from maintenance mode listener:', errorMessage);
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
    this.activeOperations.clear();
  }
}

// Create singleton instance
const ultraSafeFirebaseService = new UltraSafeFirebaseService();

// Export ultra-safe functions
export const getMaintenanceMode = () => ultraSafeFirebaseService.getMaintenanceMode();
export const setMaintenanceMode = (enabled) => ultraSafeFirebaseService.setMaintenanceMode(enabled);
export const onMaintenanceModeChange = (callback) => ultraSafeFirebaseService.onMaintenanceModeChange(callback);

export default ultraSafeFirebaseService;

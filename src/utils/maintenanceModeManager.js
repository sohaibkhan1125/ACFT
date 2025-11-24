/**
 * Maintenance Mode Manager
 * Handles all maintenance mode operations with perfect state synchronization
 */

import { getMaintenanceMode, setMaintenanceMode, onMaintenanceModeChange } from '../firebase/ultraSafeFirebaseService';

class MaintenanceModeManager {
  constructor() {
    this.listeners = new Set();
    this.isMaintenanceMode = false;
    this.isInitialized = false;
    this.unsubscribe = null;
  }

  /**
   * Initialize the maintenance mode manager
   */
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Get initial maintenance mode state
      this.isMaintenanceMode = await getMaintenanceMode();
      
      // Set up real-time listener
      this.unsubscribe = onMaintenanceModeChange((enabled) => {
        this.isMaintenanceMode = enabled;
        this.notifyListeners(enabled);
      });
      
      this.isInitialized = true;
      console.log('Maintenance mode manager initialized');
    } catch (error) {
      console.warn('Error initializing maintenance mode manager:', error.message);
      this.isInitialized = true; // Still mark as initialized to prevent retries
    }
  }

  /**
   * Get current maintenance mode state
   */
  getCurrentState() {
    return this.isMaintenanceMode;
  }

  /**
   * Set maintenance mode state
   */
  async setMaintenanceMode(enabled) {
    try {
      const success = await setMaintenanceMode(enabled);
      if (success) {
        this.isMaintenanceMode = enabled;
        this.notifyListeners(enabled);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Error setting maintenance mode:', error.message);
      return false;
    }
  }

  /**
   * Add a listener for maintenance mode changes
   */
  addListener(callback) {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of maintenance mode changes
   */
  notifyListeners(enabled) {
    this.listeners.forEach(callback => {
      try {
        callback(enabled);
      } catch (error) {
        console.warn('Error in maintenance mode listener:', error.message);
      }
    });
  }

  /**
   * Cleanup the manager
   */
  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.listeners.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
const maintenanceModeManager = new MaintenanceModeManager();

// Export functions
export const initializeMaintenanceMode = () => maintenanceModeManager.initialize();
export const getMaintenanceModeState = () => maintenanceModeManager.getCurrentState();
export const setMaintenanceModeState = (enabled) => maintenanceModeManager.setMaintenanceMode(enabled);
export const addMaintenanceModeListener = (callback) => maintenanceModeManager.addListener(callback);
export const cleanupMaintenanceMode = () => maintenanceModeManager.cleanup();

export default maintenanceModeManager;

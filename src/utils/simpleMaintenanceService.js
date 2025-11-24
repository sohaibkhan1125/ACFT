/**
 * Simple Maintenance Service
 * Uses localStorage for instant maintenance mode management
 */

const MAINTENANCE_KEY = 'maintenanceMode';

/**
 * Get maintenance mode status from localStorage
 */
export const getMaintenanceMode = () => {
  try {
    const maintenanceMode = localStorage.getItem(MAINTENANCE_KEY);
    return maintenanceMode === 'true';
  } catch (error) {
    console.warn('Error reading maintenance mode from localStorage:', error);
    return false;
  }
};

/**
 * Set maintenance mode status in localStorage
 */
export const setMaintenanceMode = (enabled) => {
  try {
    localStorage.setItem(MAINTENANCE_KEY, enabled.toString());
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('maintenanceModeChanged', {
      detail: { enabled }
    }));
    
    return true;
  } catch (error) {
    console.warn('Error setting maintenance mode in localStorage:', error);
    return false;
  }
};

/**
 * Listen to maintenance mode changes
 */
export const onMaintenanceModeChange = (callback) => {
  const handleStorageChange = (e) => {
    if (e.key === MAINTENANCE_KEY) {
      const enabled = e.newValue === 'true';
      callback(enabled);
    }
  };

  const handleCustomEvent = (e) => {
    callback(e.detail.enabled);
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('maintenanceModeChanged', handleCustomEvent);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('maintenanceModeChanged', handleCustomEvent);
  };
};

export default {
  getMaintenanceMode,
  setMaintenanceMode,
  onMaintenanceModeChange
};

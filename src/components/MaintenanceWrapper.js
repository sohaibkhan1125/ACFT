import React, { useState, useEffect } from 'react';
import MaintenancePage from './MaintenancePage';

const MaintenanceWrapper = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check localStorage immediately for maintenance mode
    const checkMaintenanceMode = () => {
      try {
        const maintenanceMode = localStorage.getItem('maintenanceMode');
        const isEnabled = maintenanceMode === 'true';
        setIsMaintenanceMode(isEnabled);
      } catch (error) {
        console.warn('Error reading maintenance mode from localStorage:', error);
        setIsMaintenanceMode(false);
      }
    };

    // Check immediately
    checkMaintenanceMode();

    // Listen for storage changes (when admin panel updates maintenance mode)
    const handleStorageChange = (e) => {
      if (e.key === 'maintenanceMode') {
        const isEnabled = e.newValue === 'true';
        setIsMaintenanceMode(isEnabled);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    const handleMaintenanceModeChange = (e) => {
      setIsMaintenanceMode(e.detail.enabled);
    };

    window.addEventListener('maintenanceModeChanged', handleMaintenanceModeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('maintenanceModeChanged', handleMaintenanceModeChange);
    };
  }, []);

  // Show maintenance page if maintenance mode is enabled
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  // Show normal content if maintenance mode is disabled
  return <>{children}</>;
};

export default MaintenanceWrapper;

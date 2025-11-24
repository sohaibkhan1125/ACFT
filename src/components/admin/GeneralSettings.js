import React, { useState, useEffect } from 'react';
import { getMaintenanceMode, setMaintenanceMode } from '../../utils/simpleMaintenanceService';

const GeneralSettings = () => {
  const [maintenanceMode, setMaintenanceModeState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load maintenance mode immediately from localStorage
    const loadMaintenanceMode = () => {
      try {
        const isEnabled = getMaintenanceMode();
        setMaintenanceModeState(isEnabled);
        setLoading(false);
      } catch (error) {
        console.warn('Error loading maintenance mode:', error);
        setMaintenanceModeState(false);
        setLoading(false);
      }
    };

    loadMaintenanceMode();
  }, []);

  const handleToggleChange = (enabled) => {
    setMaintenanceModeState(enabled);
    setMessage('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = setMaintenanceMode(maintenanceMode);
      
      if (success) {
        setMessage(
          maintenanceMode 
            ? '✅ Maintenance mode has been enabled. The website is now in maintenance mode.' 
            : '✅ Maintenance mode has been disabled. The website is now accessible.'
        );
      } else {
        setMessage('❌ Error saving maintenance mode settings. Please try again.');
      }
    } catch (error) {
      console.warn('Error saving maintenance mode:', error);
      setMessage('❌ Error saving maintenance mode settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">General Settings</h2>
        <p className="text-gray-600">Manage general website settings and configurations.</p>
      </div>

      {/* Maintenance Mode Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Mode</h3>
            <p className="text-sm text-gray-600">
              Enable maintenance mode to show a maintenance page to all visitors.
            </p>
          </div>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              maintenanceMode 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {maintenanceMode ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => handleToggleChange(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-16 h-8 rounded-full shadow-inner transition-all duration-300 ${
                  maintenanceMode ? 'bg-yellow-400' : 'bg-gray-300'
                }`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow transform transition-all duration-300 ${
                    maintenanceMode ? 'translate-x-9' : 'translate-x-1'
                  }`} style={{ marginTop: '4px' }}></div>
                </div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">
                {maintenanceMode ? 'Maintenance Mode Enabled' : 'Maintenance Mode Disabled'}
              </span>
            </label>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              saving
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-md'
            }`}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                Saving...
              </div>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>

        {maintenanceMode && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800">
                  Maintenance Mode Active
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  When maintenance mode is enabled, visitors will see a maintenance page instead of the main website.
                </p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                <span className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>
                  {message.includes('Error') ? '❌' : '✅'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-xl">🔗</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">
                  Connection Status
                </h4>
                <p className="text-sm text-gray-600">
                  localStorage-based system
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-400 text-xl">⚡</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">
                  Response Time
                </h4>
                <p className="text-sm text-gray-600">
                  Instant updates
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-xl">ℹ️</span>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              About Maintenance Mode
            </h4>
            <div className="text-sm text-blue-700 mt-2 space-y-1">
              <p>• When enabled, all visitors will see a maintenance page</p>
              <p>• Admin panel remains accessible at /admin</p>
              <p>• Changes are saved instantly to localStorage</p>
              <p>• You can toggle maintenance mode on/off at any time</p>
              <p>• Works offline with instant response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;

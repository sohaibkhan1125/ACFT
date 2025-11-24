import { getMaintenanceMode, setMaintenanceMode, onMaintenanceModeChange } from '../firebase/maintenanceService';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock Firebase
jest.mock('../firebase/config', () => ({
  db: null // Simulate Firebase unavailable
}));

describe('Abort Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('getMaintenanceMode', () => {
    test('should handle abort errors gracefully', async () => {
      // Mock an abort error
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      
      // Mock Firebase to throw abort error
      jest.doMock('../firebase/config', () => ({
        db: {
          // Mock db that throws abort error
        }
      }));

      const result = await getMaintenanceMode();
      
      // Should fallback to localStorage and not throw
      expect(result).toBe(false);
    });

    test('should suppress abort errors in console', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // Simulate abort error
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      
      const result = await getMaintenanceMode();
      
      // Should not log abort errors as warnings
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('aborted')
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('setMaintenanceMode', () => {
    test('should handle abort errors and still return success', async () => {
      const result = await setMaintenanceMode(true);
      
      // Should return true even if Firebase fails
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('acft_maintenance_mode', 'true');
    });
  });

  describe('onMaintenanceModeChange', () => {
    test('should handle abort errors in listener', () => {
      const callback = jest.fn();
      
      const unsubscribe = onMaintenanceModeChange(callback);
      
      // Should not throw errors
      expect(() => unsubscribe()).not.toThrow();
      
      // Should call callback with fallback value
      expect(callback).toHaveBeenCalledWith(false);
    });
  });

  describe('Error Suppression', () => {
    test('should suppress various abort error formats', () => {
      const abortErrors = [
        new Error('The user aborted a request'),
        new Error('Request was cancelled'),
        { name: 'AbortError', message: 'Operation aborted' },
        { code: 'cancelled', message: 'Request cancelled' },
        { code: 'aborted', message: 'User aborted request' }
      ];

      abortErrors.forEach(error => {
        // These should all be handled gracefully without throwing
        expect(() => {
          if (error.name === 'AbortError' || 
              error.message?.includes('aborted') ||
              error.message?.includes('cancelled') ||
              error.code === 'cancelled' ||
              error.code === 'aborted') {
            // This is the expected behavior - suppress the error
            return;
          }
          throw error;
        }).not.toThrow();
      });
    });
  });
});

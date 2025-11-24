import { getMaintenanceMode, setMaintenanceMode } from '../firebase/maintenanceService';

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

describe('Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('getMaintenanceMode', () => {
    test('should fallback to localStorage when Firebase is unavailable', async () => {
      localStorageMock.getItem.mockReturnValue('true');
      
      const result = await getMaintenanceMode();
      
      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('acft_maintenance_mode');
    });

    test('should return false when localStorage is empty', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const result = await getMaintenanceMode();
      
      expect(result).toBe(false);
    });

    test('should handle localStorage errors gracefully', async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const result = await getMaintenanceMode();
      
      expect(result).toBe(false);
    });
  });

  describe('setMaintenanceMode', () => {
    test('should save to localStorage when Firebase is unavailable', async () => {
      const result = await setMaintenanceMode(true);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('acft_maintenance_mode', 'true');
    });

    test('should handle localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const result = await setMaintenanceMode(true);
      
      expect(result).toBe(true); // Should still return true
    });
  });
});

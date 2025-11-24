import { initializeGlobalErrorSuppression, createSafeAsyncWrapper, safeStateUpdate } from '../globalErrorSuppression';

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

describe('Comprehensive Abort Error Suppression', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;
  let consoleLogSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    // Initialize global error suppression
    initializeGlobalErrorSuppression();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  describe('Global Error Suppression', () => {
    test('should suppress abort errors in console.error', () => {
      const abortError = new Error('The user aborted a request');
      console.error(abortError);
      
      // Should not call original console.error for abort errors
      expect(consoleErrorSpy).toHaveBeenCalledWith(abortError);
      // But should log as normal info instead
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Request cancelled (normal behavior):',
        abortError
      );
    });

    test('should suppress various abort error formats', () => {
      const abortErrors = [
        'The user aborted a request',
        'Request was cancelled',
        'Operation aborted',
        'Fetch aborted',
        'Network request aborted',
        'Connection aborted',
        'Timeout aborted'
      ];

      abortErrors.forEach(errorMessage => {
        console.error(errorMessage);
        
        expect(consoleLogSpy).toHaveBeenCalledWith(
          'Request cancelled (normal behavior):',
          errorMessage
        );
      });
    });
  });

  describe('Safe Async Wrapper', () => {
    test('should suppress abort errors in async functions', async () => {
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      
      const asyncFunction = jest.fn().mockRejectedValue(abortError);
      const safeFunction = createSafeAsyncWrapper(asyncFunction, 'testFunction');
      
      const result = await safeFunction();
      
      expect(result).toBe(null);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'testFunction was cancelled (normal behavior)'
      );
    });

    test('should handle non-abort errors normally', async () => {
      const normalError = new Error('Normal error');
      
      const asyncFunction = jest.fn().mockRejectedValue(normalError);
      const safeFunction = createSafeAsyncWrapper(asyncFunction, 'testFunction');
      
      const result = await safeFunction();
      
      expect(result).toBe(null);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Error in testFunction:',
        'Normal error'
      );
    });
  });

  describe('Safe State Update', () => {
    test('should handle state updates safely', () => {
      const stateUpdater = jest.fn();
      
      safeStateUpdate(stateUpdater, true);
      
      expect(stateUpdater).toHaveBeenCalled();
    });

    test('should not update state if component is unmounted', () => {
      const stateUpdater = jest.fn();
      
      safeStateUpdate(stateUpdater, false);
      
      expect(stateUpdater).not.toHaveBeenCalled();
    });

    test('should suppress abort errors in state updates', () => {
      const abortError = new Error('The user aborted a request');
      const stateUpdater = jest.fn().mockImplementation(() => {
        throw abortError;
      });
      
      safeStateUpdate(stateUpdater, true);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Request cancelled (normal behavior):',
        'The user aborted a request'
      );
    });
  });

  describe('Unhandled Promise Rejections', () => {
    test('should suppress abort errors in unhandled rejections', () => {
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      
      // Simulate unhandled promise rejection
      const event = new Event('unhandledrejection');
      event.reason = abortError;
      event.preventDefault = jest.fn();
      
      window.dispatchEvent(event);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Promise rejection suppressed (abort error):',
        'The user aborted a request'
      );
    });
  });

  describe('Global Error Events', () => {
    test('should suppress abort errors in global error events', () => {
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      
      // Simulate global error
      const event = new Event('error');
      event.error = abortError;
      event.preventDefault = jest.fn();
      
      window.dispatchEvent(event);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Global error suppressed (abort error):',
        'The user aborted a request'
      );
    });
  });

  describe('Integration Test', () => {
    test('should handle maintenance mode toggle without errors', async () => {
      // Mock Firebase operations that might abort
      const mockGetMaintenanceMode = jest.fn().mockResolvedValue(false);
      const mockSetMaintenanceMode = jest.fn().mockResolvedValue(true);
      
      // Test loading maintenance mode
      const loadFunction = createSafeAsyncWrapper(mockGetMaintenanceMode, 'loadMaintenanceMode');
      const loadResult = await loadFunction();
      expect(loadResult).toBe(false);
      
      // Test saving maintenance mode
      const saveFunction = createSafeAsyncWrapper(mockSetMaintenanceMode, 'setMaintenanceMode');
      const saveResult = await saveFunction();
      expect(saveResult).toBe(true);
      
      // No errors should be logged
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});

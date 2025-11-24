/**
 * Test script to verify error suppression is working
 */

export function testErrorSuppression() {
  console.log('Testing error suppression...');
  
  // Test 1: Simulate Firebase WebChannel abort error
  setTimeout(() => {
    try {
      const error = new Error('The user aborted a request.');
      error.name = 'AbortError';
      error.stack = 'at webchannel_blob.js:123:45';
      throw error;
    } catch (e) {
      console.error('Test 1 - This should be suppressed:', e);
    }
  }, 100);

  // Test 2: Simulate Firebase WebChannel abort error with different message
  setTimeout(() => {
    try {
      const error = new Error('signal is aborted without reason');
      error.name = 'AbortError';
      error.stack = 'at firebase/webchannel-blob/esm/webchannel_blob_es2018.js:123:45';
      throw error;
    } catch (e) {
      console.error('Test 2 - This should be suppressed:', e);
    }
  }, 200);

  // Test 3: Simulate unhandled promise rejection
  setTimeout(() => {
    Promise.reject(new Error('The user aborted a request.'));
  }, 300);

  // Test 4: Simulate normal error (should not be suppressed)
  setTimeout(() => {
    try {
      throw new Error('This is a normal error that should be shown');
    } catch (e) {
      console.error('Test 4 - This should NOT be suppressed:', e);
    }
  }, 400);

  console.log('Error suppression tests initiated. Check console output.');
}

export default testErrorSuppression;

/**
 * Final comprehensive test for all error suppression methods
 */

export function testFinalErrorSuppression() {
  console.log('Testing final comprehensive error suppression...');
  
  // Test 1: Simulate the exact Firebase WebChannel error from the user's report
  setTimeout(() => {
    try {
      const error = new Error('The user aborted a request.');
      error.name = 'AbortError';
      error.stack = 'at __webpack_modules__../node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js.h.abort';
      throw error;
    } catch (e) {
      console.error('Test 1 - Firebase WebChannel error (should be suppressed):', e);
    }
  }, 100);

  // Test 2: Simulate the exact signal abort error from the user's report
  setTimeout(() => {
    try {
      const error = new Error('signal is aborted without reason');
      error.name = 'AbortError';
      error.stack = 'at __webpack_modules__../node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js.h.abort';
      throw error;
    } catch (e) {
      console.error('Test 2 - Signal abort error (should be suppressed):', e);
    }
  }, 200);

  // Test 3: Simulate unhandled promise rejection with exact error
  setTimeout(() => {
    Promise.reject(new Error('The user aborted a request.'));
  }, 300);

  // Test 4: Simulate another unhandled promise rejection
  setTimeout(() => {
    Promise.reject(new Error('signal is aborted without reason'));
  }, 400);

  // Test 5: Simulate Firebase WebChannel Blob error
  setTimeout(() => {
    try {
      const error = new Error('The user aborted a request.');
      error.name = 'AbortError';
      error.stack = 'at webchannel_blob_es2018.js:123:45';
      throw error;
    } catch (e) {
      console.error('Test 5 - WebChannel Blob error (should be suppressed):', e);
    }
  }, 500);

  // Test 6: Simulate Firebase WebChannel wrapper error
  setTimeout(() => {
    try {
      const error = new Error('The user aborted a request.');
      error.name = 'AbortError';
      error.stack = 'at __webpack_modules__../node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js.N.cancel';
      throw error;
    } catch (e) {
      console.error('Test 6 - WebChannel wrapper error (should be suppressed):', e);
    }
  }, 600);

  // Test 7: Simulate normal error (should NOT be suppressed)
  setTimeout(() => {
    try {
      throw new Error('This is a normal error that should be shown');
    } catch (e) {
      console.error('Test 7 - Normal error (should NOT be suppressed):', e);
    }
  }, 700);

  // Test 8: Simulate Firebase Firestore error
  setTimeout(() => {
    try {
      const error = new Error('The user aborted a request.');
      error.name = 'AbortError';
      error.stack = 'at firestore.js:123:45';
      throw error;
    } catch (e) {
      console.error('Test 8 - Firestore error (should be suppressed):', e);
    }
  }, 800);

  console.log('Final comprehensive error suppression tests initiated.');
  console.log('Expected: Only Test 7 should show an error, all others should be suppressed.');
  console.log('Check console output to verify error suppression is working correctly.');
}

export default testFinalErrorSuppression;

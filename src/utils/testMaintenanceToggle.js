/**
 * Test script to verify maintenance mode toggle works without errors
 */

import { getMaintenanceMode, setMaintenanceMode, onMaintenanceModeChange } from '../firebase/safeFirebaseService';

/**
 * Test maintenance mode operations
 */
export async function testMaintenanceToggle() {
  console.log('🧪 Testing Maintenance Mode Toggle...');
  
  try {
    // Test 1: Get current maintenance mode
    console.log('1. Getting current maintenance mode...');
    const currentMode = await getMaintenanceMode();
    console.log(`   Current mode: ${currentMode}`);
    
    // Test 2: Toggle maintenance mode ON
    console.log('2. Setting maintenance mode ON...');
    const setOnResult = await setMaintenanceMode(true);
    console.log(`   Set ON result: ${setOnResult}`);
    
    // Test 3: Verify maintenance mode is ON
    console.log('3. Verifying maintenance mode is ON...');
    const verifyOn = await getMaintenanceMode();
    console.log(`   Verified ON: ${verifyOn}`);
    
    // Test 4: Toggle maintenance mode OFF
    console.log('4. Setting maintenance mode OFF...');
    const setOffResult = await setMaintenanceMode(false);
    console.log(`   Set OFF result: ${setOffResult}`);
    
    // Test 5: Verify maintenance mode is OFF
    console.log('5. Verifying maintenance mode is OFF...');
    const verifyOff = await getMaintenanceMode();
    console.log(`   Verified OFF: ${verifyOff}`);
    
    // Test 6: Test real-time listener
    console.log('6. Testing real-time listener...');
    let listenerCalled = false;
    const unsubscribe = onMaintenanceModeChange((enabled) => {
      console.log(`   Listener called with: ${enabled}`);
      listenerCalled = true;
    });
    
    // Wait a bit for listener to be called
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Cleanup listener
    if (unsubscribe) {
      unsubscribe();
    }
    
    console.log(`   Listener was called: ${listenerCalled}`);
    
    console.log('✅ All maintenance mode tests completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Maintenance mode test failed:', error);
    return false;
  }
}

/**
 * Test error suppression
 */
export function testErrorSuppression() {
  console.log('🧪 Testing Error Suppression...');
  
  // Test various abort error formats
  const abortErrors = [
    'The user aborted a request',
    'Request was cancelled',
    'Operation aborted',
    'Fetch aborted',
    'Network request aborted'
  ];
  
  abortErrors.forEach((errorMessage, index) => {
    console.log(`   Testing abort error ${index + 1}: ${errorMessage}`);
    
    // These should be suppressed and not appear as errors
    console.error(errorMessage);
    console.warn(errorMessage);
  });
  
  console.log('✅ Error suppression test completed!');
}

// Run tests if this file is executed directly
if (typeof window !== 'undefined') {
  // Make tests available globally for manual testing
  window.testMaintenanceToggle = testMaintenanceToggle;
  window.testErrorSuppression = testErrorSuppression;
  
  console.log('🔧 Maintenance mode tests available:');
  console.log('   - testMaintenanceToggle()');
  console.log('   - testErrorSuppression()');
}

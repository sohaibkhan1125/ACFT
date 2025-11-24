/**
 * Test script to verify official Army AFT scoring matches competitor
 * Run this to test specific cases and ensure parity
 */

import { calculateTotalScoreOfficial, getDebugInfo } from './officialScoringLogic';

// Test Case A: Female 17-21, MDL = 80 lbs (should return 20 points)
export function testCaseA() {
  console.log('=== Test Case A: Female 17-21, MDL = 80 lbs ===');
  
  const inputs = {
    sex: 'female',
    ageGroup: '17-21',
    mdl: 80,
    spt: 2.6,
    hrp: 4,
    sdc: 4.25, // 4:15 in minutes
    plk: 1.0,  // 1:00 in minutes
    twoMR: 25.37 // 25:22 in minutes
  };

  const debugInfo = getDebugInfo('female', '17-21', inputs);
  
  console.log('Inputs:', inputs);
  console.log('Results:', debugInfo.results);
  console.log('Total Score:', debugInfo.totalScore);
  console.log('MDL Debug:', debugInfo.debugInfo.MDL);
  
  // Expected: MDL should be 20 points
  const mdlPoints = debugInfo.results.MDL;
  console.log(`MDL Points: ${mdlPoints} (Expected: 20)`);
  
  return {
    testCase: 'A',
    expected: { MDL: 20 },
    actual: { MDL: mdlPoints },
    passed: mdlPoints === 20,
    debugInfo
  };
}

// Test Case B: Additional test cases
export function testCaseB() {
  console.log('=== Test Case B: Female 17-21, Various Inputs ===');
  
  const testCases = [
    { mdl: 60, expected: 0, description: 'MDL 60 lbs' },
    { mdl: 80, expected: 20, description: 'MDL 80 lbs' },
    { mdl: 120, expected: 60, description: 'MDL 120 lbs' },
    { mdl: 150, expected: 90, description: 'MDL 150 lbs' },
    { mdl: 210, expected: 100, description: 'MDL 210 lbs' }
  ];

  const results = [];
  
  testCases.forEach((testCase, index) => {
    const inputs = {
      sex: 'female',
      ageGroup: '17-21',
      mdl: testCase.mdl,
      spt: 2.6,
      hrp: 4,
      sdc: 4.25,
      plk: 1.0,
      twoMR: 25.37
    };

    const debugInfo = getDebugInfo('female', '17-21', inputs);
    const actualPoints = debugInfo.results.MDL;
    const passed = actualPoints === testCase.expected;
    
    console.log(`${testCase.description}: Expected ${testCase.expected}, Got ${actualPoints} ${passed ? '✓' : '✗'}`);
    
    results.push({
      testCase: `B${index + 1}`,
      description: testCase.description,
      expected: testCase.expected,
      actual: actualPoints,
      passed
    });
  });
  
  return results;
}

// Run all tests
export function runAllTests() {
  console.log('🧪 Running Official Army AFT Scoring Tests');
  console.log('==========================================');
  
  const testA = testCaseA();
  const testB = testCaseB();
  
  const allResults = [testA, ...testB];
  const passedTests = allResults.filter(result => result.passed).length;
  const totalTests = allResults.length;
  
  console.log('\n📊 Test Summary:');
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('✅ All tests passed! Official scoring is working correctly.');
  } else {
    console.log('❌ Some tests failed. Check the scoring tables.');
  }
  
  return {
    totalTests,
    passedTests,
    successRate: (passedTests / totalTests) * 100,
    results: allResults
  };
}

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
  window.testOfficialScoring = {
    testCaseA,
    testCaseB,
    runAllTests
  };
}

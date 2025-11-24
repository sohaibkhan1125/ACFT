// Simple test to verify MDL scoring for Female 17-21
const officialScoringTables = {
  "female": {
    "17-21": {
      "MDL": [
        { "min": 0, "max": 79, "points": 0 },
        { "min": 80, "max": 89, "points": 20 },
        { "min": 90, "max": 99, "points": 30 },
        { "min": 100, "max": 109, "points": 40 },
        { "min": 110, "max": 119, "points": 50 },
        { "min": 120, "max": 120, "points": 60 },
        { "min": 121, "max": 130, "points": 70 },
        { "min": 131, "max": 140, "points": 80 },
        { "min": 141, "max": 150, "points": 90 },
        { "min": 151, "max": 210, "points": 100 }
      ]
    }
  }
};

function calculateMDLPoints(weight) {
  const eventData = officialScoringTables.female['17-21'].MDL;
  
  for (const range of eventData) {
    if (weight >= range.min && weight <= range.max) {
      return range.points;
    }
  }
  
  return 0;
}

// Test the specific case
console.log('Testing Female 17-21, MDL = 80 lbs');
console.log('Expected: 20 points');
console.log('Actual:', calculateMDLPoints(80));
console.log('Test passed:', calculateMDLPoints(80) === 20);

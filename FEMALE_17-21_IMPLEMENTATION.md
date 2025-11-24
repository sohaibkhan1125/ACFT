# ACFT Calculator - Female (Age Group: 17–21) Implementation

## Summary
This document outlines the changes made to implement the specific functionality for Female (Age Group: 17–21) in the ACFT Calculator.

## Changes Made

### 1. Updated Scoring Tables (`src/data/scoringTables.json`)

#### MDL (3 Repetitions – Maximum Deadlift)
- **Default value**: 60 lbs
- **Minimum value**: 60 lbs
- **Maximum value**: 210 lbs
- **Scoring**: 0 points at 60 lbs, 100 points at 141-210 lbs

#### SPT (Standing Power Throw)
- **Default value**: 2.60 meters
- **Minimum value**: 2.60 meters
- **Maximum value**: 8.40 meters
- **Scoring**: 0 points at 2.6m, 100 points at 6.6-8.4m

#### HRP (Hand Release Push-up)
- **Default value**: 4 repetitions
- **Minimum value**: 4 reps
- **Maximum value**: 53 reps
- **Scoring**: 0 points at 4 reps, 100 points at 37-53 reps

#### SDC (Sprint-Drag-Carry)
- **Default value**: 4:15 (4 minutes 15 seconds)
- **Minimum value**: 3:17 (3 minutes 17 seconds / 3.28 minutes)
- **Scoring**: 0 points at 4:15+, 100 points at 2:36 or less

#### PLK (Plank)
- **Default value**: 1:00 (1 minute)
- **Minimum value**: 0:00
- **Maximum value**: 6:00
- **Scoring**: 0 points at 1:00, 100 points at 5:06-6:00

#### 2MR (Two-Mile Run)
- **Default value**: 25:22 (25 minutes 22 seconds)
- **Minimum value**: 15:00
- **Maximum value**: 30:00
- **Scoring**: 0 points at 25:22+, 100 points at 17:54 or less

### 2. Updated Default Values (`src/utils/defaultValues.js`)

Updated the `getDefaultValues` function for Female 17-21:
```javascript
'17-21': {
  mdl: 60,    // 0 points (60 lbs default)
  spt: 2.6,   // 0 points (2.60 meters default)
  hrp: 4,     // 0 points (4 reps default)
  sdc: 255,   // 4:15 minutes (4 minutes 15 seconds = 255 seconds, 0 points)
  plk: 60,    // 1:00 minutes (0 points)
  twoMR: 1522 // 25:22 minutes (0 points)
}
```

### 3. Updated Slider Ranges (`src/utils/defaultValues.js`)

Updated the `getSliderRanges` function for Female:
```javascript
female: {
  mdl: { min: 60, max: 210 },  // Updated for Female 17-21: 60-210 lbs
  spt: { min: 2.6, max: 8.4 }, // Updated for Female 17-21: 2.6-8.4 meters
  hrp: { min: 4, max: 53 },    // Updated for Female 17-21: 4-53 reps
  sdc: { min: 197, max: 300 }, // Updated for Female 17-21: 3:17 to 5:00
  plk: { min: 0, max: 360 },   // Same as males
  twoMR: { min: 900, max: 1800 } // Updated for Female 17-21: 15:00 to 30:00
}
```

## How It Works

1. When a user selects **Female** as the gender and **17-21** as the age group, the calculator automatically loads the default values specified above.

2. The sliders are configured with the appropriate min/max ranges for each event.

3. As the user adjusts the sliders or types in values, the scoring is calculated based on the updated scoring tables.

4. All default values correspond to 0 points, ensuring that the minimum performance levels start at 0 points.

5. The scoring logic uses the `calculateEventPoints` function in `src/utils/scoringLogic.js` to determine points based on performance.

## Testing

To test the implementation:

1. Start the development server: `npm start`
2. Navigate to the Calculator section
3. Select **Female** for Sex
4. Select **17-21** for Age Group
5. Verify that all default values are set correctly:
   - MDL: 60 lbs (0 points)
   - SPT: 2.60 meters (0 points)
   - HRP: 4 reps (0 points)
   - SDC: 4:15 (0 points)
   - PLK: 1:00 (0 points)
   - 2MR: 25:22 (0 points)
6. Test the sliders to ensure they respect the min/max ranges
7. Verify that the scoring updates correctly as values change

## Notes

- The implementation only affects the Female 17-21 age group
- Other age groups and male categories remain unchanged
- The scoring logic is based on the official ACFT standards for Female 17-21
- All time values are stored in seconds internally and converted to minutes for display


/**
 * Default values for ACFT events based on sex and age group
 * These represent minimum performance levels (0 points)
 */

export const getDefaultValues = (sex, ageGroup) => {
  const defaults = {
    male: {
      '17-21': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points  
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '22-26': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '27-31': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '32-36': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '37-41': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '42-46': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '47-51': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '52-56': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '57-61': {
        mdl: 80,    // 0 points
        spt: 4.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,    // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      }
    },
    female: {
      '17-21': {
        mdl: 60,    // 0 points (60 lbs default)
        spt: 2.6,   // 0 points (2.60 meters default)
        hrp: 4,     // 0 points (4 reps default)
        sdc: 255,   // 4:15 minutes (4 minutes 15 seconds = 255 seconds, 0 points)
        plk: 60,    // 1:00 minutes (0 points)
        twoMR: 1522 // 25:22 minutes (0 points)
      },
      '22-26': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '27-31': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '32-36': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '37-41': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '42-46': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '47-51': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '52-56': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      },
      '57-61': {
        mdl: 60,    // 0 points
        spt: 3.0,   // 0 points
        hrp: 4,     // 0 points
        sdc: 180,   // 3:00 minutes (60 points)
        plk: 0,     // 0:00 minutes (0 points)
        twoMR: 1440 // 24:00 minutes (0 points)
      }
    }
  };

  return defaults[sex]?.[ageGroup] || defaults.male['17-21'];
};

/**
 * Get slider ranges based on sex and age group
 */
export const getSliderRanges = (sex, ageGroup) => {
  const ranges = {
    male: {
      mdl: { min: 80, max: 340 },
      spt: { min: 4.0, max: 12.6 },
      hrp: { min: 4, max: 61 },
      sdc: { min: 90, max: 180 },  // 1:30 to 3:00
      plk: { min: 0, max: 360 },   // 0:00 to 6:00
      twoMR: { min: 840, max: 1440 } // 14:00 to 24:00
    },
    female: {
      mdl: { min: 60, max: 210 },  // Updated for Female 17-21: 60-210 lbs
      spt: { min: 2.6, max: 8.4 }, // Updated for Female 17-21: 2.6-8.4 meters
      hrp: { min: 4, max: 53 },    // Updated for Female 17-21: 4-53 reps
      sdc: { min: 197, max: 300 },  // Updated for Female 17-21: 3:17 to 5:00 (3.28-5.0 minutes in seconds)
      plk: { min: 0, max: 360 },   // Same as males
      twoMR: { min: 900, max: 1800 } // Updated for Female 17-21: 15:00 to 30:00
    }
  };

  return ranges[sex] || ranges.male;
};

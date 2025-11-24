import scoringTables from '../data/scoringTables.json';

/**
 * Calculate points for a specific event based on performance
 * @param {string} sex - 'male' or 'female'
 * @param {string} ageGroup - age group (e.g., '17-21', '22-26')
 * @param {string} event - event name (MDL, SPT, HRP, SDC, PLK, 2MR)
 * @param {number} performance - performance value
 * @returns {number} points earned (0-100)
 */
export function calculateEventPoints(sex, ageGroup, event, performance) {
  try {
    const eventData = scoringTables[sex]?.[ageGroup]?.[event];
    
    if (!eventData) {
      console.warn(`No scoring data found for ${sex}, ${ageGroup}, ${event}`);
      return 0;
    }

    // Find the appropriate point range for the performance
    for (const range of eventData) {
      if (performance >= range.min && performance <= range.max) {
        return range.points;
      }
    }

    // If performance is below minimum, return 0 points
    if (performance < eventData[0].min) {
      return 0;
    }

    // If performance is above maximum, return 100 points
    return 100;
  } catch (error) {
    console.error('Error calculating event points:', error);
    return 0;
  }
}

/**
 * Calculate total ACFT score
 * @param {Object} results - object containing all event results
 * @returns {Object} score breakdown and total
 */
export function calculateTotalScore(results) {
  const { sex, ageGroup, mdl, spt, hrp, sdc, plk, twoMR } = results;
  
  const eventPoints = {
    MDL: calculateEventPoints(sex, ageGroup, 'MDL', mdl),
    SPT: calculateEventPoints(sex, ageGroup, 'SPT', spt),
    HRP: calculateEventPoints(sex, ageGroup, 'HRP', hrp),
    SDC: calculateEventPoints(sex, ageGroup, 'SDC', sdc),
    PLK: calculateEventPoints(sex, ageGroup, 'PLK', plk),
    '2MR': calculateEventPoints(sex, ageGroup, '2MR', twoMR)
  };

  const totalScore = Object.values(eventPoints).reduce((sum, points) => sum + points, 0);

  return {
    eventPoints,
    totalScore,
    maxPossible: 600
  };
}

/**
 * Determine pass/fail status based on MOS category
 * @param {number} totalScore - total ACFT score
 * @param {Object} eventPoints - individual event points
 * @param {string} mosCategory - MOS physical demand category
 * @returns {Object} pass/fail status and details
 */
export function determinePassFail(totalScore, eventPoints, mosCategory = 'Heavy') {
  const category = scoringTables.mosCategories[mosCategory];
  
  if (!category) {
    return {
      passed: false,
      reason: 'Invalid MOS category',
      details: 'Please select a valid MOS category'
    };
  }

  // Check total score requirement
  const totalPassed = totalScore >= category.minimumTotal;
  
  // Check per-event minimum requirements
  const eventFailures = [];
  Object.entries(eventPoints).forEach(([event, points]) => {
    if (points < category.minimumPerEvent) {
      eventFailures.push(event);
    }
  });

  const allEventsPassed = eventFailures.length === 0;

  const passed = totalPassed && allEventsPassed;

  return {
    passed,
    totalPassed,
    allEventsPassed,
    eventFailures,
    totalScore,
    minimumRequired: category.minimumTotal,
    category: mosCategory,
    categoryDescription: category.description
  };
}

/**
 * Convert time string (mm:ss) to seconds for calculations
 * @param {string} timeString - time in format "mm:ss"
 * @returns {number} seconds
 */
export function timeStringToSeconds(timeString) {
  if (!timeString || typeof timeString !== 'string') return 0;
  
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  const minutes = parseInt(parts[0], 10) || 0;
  const seconds = parseInt(parts[1], 10) || 0;
  
  return minutes * 60 + seconds;
}

/**
 * Convert seconds to time string (mm:ss)
 * @param {number} seconds - total seconds
 * @returns {string} time in format "mm:ss"
 */
export function secondsToTimeString(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Validate input values
 * @param {Object} inputs - input values to validate
 * @returns {Object} validation results
 */
export function validateInputs(inputs) {
  const errors = {};
  
  // Validate required fields
  if (!inputs.sex) errors.sex = 'Sex is required';
  if (!inputs.ageGroup) errors.ageGroup = 'Age group is required';
  
  // Validate numeric inputs
  if (!inputs.mdl || inputs.mdl < 0) errors.mdl = 'MDL must be a positive number';
  if (!inputs.spt || inputs.spt < 0) errors.spt = 'SPT must be a positive number';
  if (!inputs.hrp || inputs.hrp < 0 || !Number.isInteger(inputs.hrp)) {
    errors.hrp = 'HRP must be a positive integer';
  }
  
  // Validate time inputs (now in seconds)
  if (!inputs.sdc || inputs.sdc < 0) errors.sdc = 'SDC must be a valid time';
  if (!inputs.plk || inputs.plk < 0) errors.plk = 'PLK must be a valid time';
  if (!inputs.twoMR || inputs.twoMR < 0) errors.twoMR = '2MR must be a valid time';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Get available age groups
 * @returns {Array} array of age group strings
 */
export function getAgeGroups() {
  return ['17-21', '22-26', '27-31', '32-36', '37-41', '42-46', '47-51', '52-56', '57-61'];
}

/**
 * Get available MOS categories
 * @returns {Array} array of MOS category objects
 */
export function getMosCategories() {
  return Object.entries(scoringTables.mosCategories).map(([key, value]) => ({
    key,
    ...value
  }));
}

import officialScoringTables from '../data/officialArmyAFTScoringTables.json';

/**
 * Official Army AFT Scoring Logic
 * Uses direct lookup tables from the official Army AFT scoring tables
 * (approved 15 May 2025, effective 1 June 2025)
 */

/**
 * Calculate points for a specific event based on performance using official Army tables
 * @param {string} sex - 'male' or 'female'
 * @param {string} ageGroup - age group (e.g., '17-21', '22-26')
 * @param {string} event - event name (MDL, SPT, HRP, SDC, PLK, 2MR)
 * @param {number} performance - performance value
 * @returns {Object} points earned and debug info
 */
export function calculateEventPointsOfficial(sex, ageGroup, event, performance) {
  try {
    const eventData = officialScoringTables[sex]?.[ageGroup]?.[event];
    
    if (!eventData) {
      console.warn(`No official scoring data found for ${sex}, ${ageGroup}, ${event}`);
      return {
        points: 0,
        debug: {
          sex,
          ageGroup,
          event,
          performance,
          tableRow: null,
          error: 'No scoring data found'
        }
      };
    }

    // Find the appropriate point range for the performance
    for (const range of eventData) {
      if (performance >= range.min && performance <= range.max) {
        return {
          points: range.points,
          debug: {
            sex,
            ageGroup,
            event,
            performance,
            tableRow: range,
            points: range.points
          }
        };
      }
    }

    // If performance is below minimum, return 0 points
    if (performance < eventData[0].min) {
      return {
        points: 0,
        debug: {
          sex,
          ageGroup,
          event,
          performance,
          tableRow: eventData[0],
          points: 0,
          note: 'Below minimum threshold'
        }
      };
    }

    // If performance is above maximum, return 100 points
    const maxRange = eventData[eventData.length - 1];
    return {
      points: 100,
      debug: {
        sex,
        ageGroup,
        event,
        performance,
        tableRow: maxRange,
        points: 100,
        note: 'Above maximum threshold'
      }
    };
  } catch (error) {
    console.error('Error in official scoring calculation:', error);
    return {
      points: 0,
      debug: {
        sex,
        ageGroup,
        event,
        performance,
        error: error.message
      }
    };
  }
}

/**
 * Calculate total ACFT score using official Army tables
 * @param {Object} results - object containing all event results
 * @returns {Object} score breakdown and total with debug info
 */
export function calculateTotalScoreOfficial(results) {
  const { sex, ageGroup, mdl, spt, hrp, sdc, plk, twoMR } = results;
  
  const eventResults = {
    MDL: calculateEventPointsOfficial(sex, ageGroup, 'MDL', mdl),
    SPT: calculateEventPointsOfficial(sex, ageGroup, 'SPT', spt),
    HRP: calculateEventPointsOfficial(sex, ageGroup, 'HRP', hrp),
    SDC: calculateEventPointsOfficial(sex, ageGroup, 'SDC', sdc),
    PLK: calculateEventPointsOfficial(sex, ageGroup, 'PLK', plk),
    '2MR': calculateEventPointsOfficial(sex, ageGroup, '2MR', twoMR)
  };

  const eventPoints = {};
  const debugInfo = {};
  
  Object.keys(eventResults).forEach(event => {
    eventPoints[event] = eventResults[event].points;
    debugInfo[event] = eventResults[event].debug;
  });

  const totalScore = Object.values(eventPoints).reduce((sum, points) => sum + points, 0);

  return {
    eventPoints,
    totalScore,
    maxPossible: 600,
    debugInfo,
    eventResults
  };
}

/**
 * Determine pass/fail status based on official Army standards
 * @param {number} totalScore - total ACFT score
 * @param {Object} eventPoints - individual event points
 * @param {string} mosCategory - MOS physical demand category
 * @returns {Object} pass/fail status and details
 */
export function determinePassFailOfficial(totalScore, eventPoints, mosCategory = 'Heavy') {
  const minimums = {
    Heavy: { total: 440, perEvent: 60 },
    Significant: { total: 400, perEvent: 60 },
    Moderate: { total: 360, perEvent: 60 }
  };

  const minimum = minimums[mosCategory] || minimums.Heavy;
  
  // Check per-event minimums (60 points per event)
  const eventFailures = [];
  Object.entries(eventPoints).forEach(([event, points]) => {
    if (points < minimum.perEvent) {
      eventFailures.push(event);
    }
  });

  const allEventsPassed = eventFailures.length === 0;
  const totalPassed = totalScore >= minimum.total;
  const passed = allEventsPassed && totalPassed;

  return {
    passed,
    totalPassed,
    allEventsPassed,
    eventFailures,
    minimumRequired: minimum.total,
    perEventMinimum: minimum.perEvent,
    mosCategory
  };
}

/**
 * Get debug information for a specific test case
 * @param {string} sex - 'male' or 'female'
 * @param {string} ageGroup - age group
 * @param {Object} inputs - event inputs
 * @returns {Object} debug information
 */
export function getDebugInfo(sex, ageGroup, inputs) {
  const results = calculateTotalScoreOfficial({
    sex,
    ageGroup,
    ...inputs
  });

  return {
    inputs: {
      sex,
      ageGroup,
      ...inputs
    },
    results: results.eventPoints,
    totalScore: results.totalScore,
    debugInfo: results.debugInfo,
    passFail: determinePassFailOfficial(results.totalScore, results.eventPoints)
  };
}

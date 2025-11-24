import { calculateEventPoints, calculateTotalScore, determinePassFail, timeStringToSeconds, secondsToTimeString } from '../scoringLogic';

describe('Scoring Logic', () => {
  describe('calculateEventPoints', () => {
    test('should return correct points for male 17-21 MDL', () => {
      expect(calculateEventPoints('male', '17-21', 'MDL', 140)).toBe(60);
      expect(calculateEventPoints('male', '17-21', 'MDL', 200)).toBe(90);
      expect(calculateEventPoints('male', '17-21', 'MDL', 250)).toBe(100);
    });

    test('should return correct points for female 17-21 MDL', () => {
      expect(calculateEventPoints('female', '17-21', 'MDL', 84)).toBe(60);
      expect(calculateEventPoints('female', '17-21', 'MDL', 150)).toBe(100);
    });

    test('should return 0 for performance below minimum', () => {
      expect(calculateEventPoints('male', '17-21', 'MDL', 100)).toBe(0);
    });
  });

  describe('calculateTotalScore', () => {
    test('should calculate total score correctly', () => {
      const results = {
        sex: 'male',
        ageGroup: '17-21',
        mdl: 200,
        spt: 8.0,
        hrp: 30,
        sdc: 120, // 2 minutes in seconds
        plk: 180, // 3 minutes in seconds
        twoMR: 1020 // 17 minutes in seconds
      };

      const scoreData = calculateTotalScore(results);
      expect(scoreData.totalScore).toBeGreaterThan(0);
      expect(scoreData.maxPossible).toBe(600);
    });
  });

  describe('determinePassFail', () => {
    test('should pass for Heavy category with sufficient score', () => {
      const eventPoints = { MDL: 80, SPT: 80, HRP: 80, SDC: 80, PLK: 80, '2MR': 80 };
      const result = determinePassFail(480, eventPoints, 'Heavy');
      expect(result.passed).toBe(true);
      expect(result.totalPassed).toBe(true);
      expect(result.allEventsPassed).toBe(true);
    });

    test('should fail for Heavy category with insufficient total score', () => {
      const eventPoints = { MDL: 80, SPT: 80, HRP: 80, SDC: 80, PLK: 80, '2MR': 80 };
      const result = determinePassFail(400, eventPoints, 'Heavy');
      expect(result.passed).toBe(false);
      expect(result.totalPassed).toBe(false);
    });

    test('should fail for Heavy category with event below minimum', () => {
      const eventPoints = { MDL: 50, SPT: 80, HRP: 80, SDC: 80, PLK: 80, '2MR': 80 };
      const result = determinePassFail(450, eventPoints, 'Heavy');
      expect(result.passed).toBe(false);
      expect(result.allEventsPassed).toBe(false);
      expect(result.eventFailures).toContain('MDL');
    });
  });

  describe('timeStringToSeconds', () => {
    test('should convert time string to seconds', () => {
      expect(timeStringToSeconds('2:30')).toBe(150);
      expect(timeStringToSeconds('0:45')).toBe(45);
      expect(timeStringToSeconds('10:00')).toBe(600);
    });

    test('should handle invalid input', () => {
      expect(timeStringToSeconds('invalid')).toBe(0);
      expect(timeStringToSeconds('')).toBe(0);
    });
  });

  describe('secondsToTimeString', () => {
    test('should convert seconds to time string', () => {
      expect(secondsToTimeString(150)).toBe('02:30');
      expect(secondsToTimeString(45)).toBe('00:45');
      expect(secondsToTimeString(600)).toBe('10:00');
    });
  });
});

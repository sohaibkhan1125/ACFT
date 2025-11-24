import { timeStringToSeconds, secondsToTimeString } from '../scoringLogic';

describe('Time Input Functions', () => {
  describe('timeStringToSeconds', () => {
    test('should convert valid time strings to seconds', () => {
      expect(timeStringToSeconds('2:30')).toBe(150);
      expect(timeStringToSeconds('0:45')).toBe(45);
      expect(timeStringToSeconds('10:00')).toBe(600);
      expect(timeStringToSeconds('17:30')).toBe(1050);
    });

    test('should handle edge cases', () => {
      expect(timeStringToSeconds('0:00')).toBe(0);
      expect(timeStringToSeconds('1:00')).toBe(60);
      expect(timeStringToSeconds('59:59')).toBe(3599);
    });

    test('should return 0 for invalid input', () => {
      expect(timeStringToSeconds('invalid')).toBe(0);
      expect(timeStringToSeconds('')).toBe(0);
      expect(timeStringToSeconds('2')).toBe(0);
      expect(timeStringToSeconds('2:')).toBe(0);
      expect(timeStringToSeconds(':30')).toBe(0);
    });
  });

  describe('secondsToTimeString', () => {
    test('should convert seconds to time strings', () => {
      expect(secondsToTimeString(150)).toBe('02:30');
      expect(secondsToTimeString(45)).toBe('00:45');
      expect(secondsToTimeString(600)).toBe('10:00');
      expect(secondsToTimeString(1050)).toBe('17:30');
    });

    test('should handle edge cases', () => {
      expect(secondsToTimeString(0)).toBe('00:00');
      expect(secondsToTimeString(60)).toBe('01:00');
      expect(secondsToTimeString(3599)).toBe('59:59');
    });
  });

  describe('round-trip conversion', () => {
    test('should maintain consistency in round-trip conversions', () => {
      const testTimes = ['2:30', '0:45', '10:00', '17:30', '1:00'];
      
      testTimes.forEach(timeString => {
        const seconds = timeStringToSeconds(timeString);
        const convertedBack = secondsToTimeString(seconds);
        expect(convertedBack).toBe(timeString);
      });
    });
  });
});

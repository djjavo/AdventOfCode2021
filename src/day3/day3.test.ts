import day3, {
  calculateCO2ScrubberRating,
  calculateEpsilonRate,
  calculateGammaRate,
  calculateOxygenGeneratorRating
} from '.';

describe('Day 3', () => {
  it('should correctly calculate the gamma rate', () => {
    debugger;
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = calculateGammaRate(input);
    expect(result).toBe(22);
  });

  it('should correctly calculate the epsilon rate', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = calculateEpsilonRate(input);
    expect(result).toBe(9);
  });

  it('should correctly calculate the power consumption', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = day3.part1(input);
    expect(result).toBe(198);
  });

  it('should correctly calculate the oxygen generator rating', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = calculateOxygenGeneratorRating(input);
    expect(result).toBe(23);
  });

  it('should correctly calculate the CO2 scrubber rating', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = calculateCO2ScrubberRating(input);
    expect(result).toBe(10);
  });

  it('should correctly calculate the life support rating', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ];
    const result = day3.part2(input);
    expect(result).toBe(230);
  });
});

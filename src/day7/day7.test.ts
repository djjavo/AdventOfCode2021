import day7, { calculateAverage, calculateMedian } from '.';

describe('Day 7', () => {
  it('should correctly calculate the median', () => {
    const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const result = calculateMedian(input);
    expect(result).toBe(2);
  });

  it('should correctly calculate the mean', () => {
    const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const result = calculateAverage(input);
    expect(result).toBe(4.9);
  });

  it('should correctly calculate that 37 is the minimum fuel used when fuel burn is constant', () => {
    const input = ['16,1,2,0,4,2,7,1,2,14'];
    const result = day7.part1(input);
    expect(result).toBe(37);
  });

  it('should correctly calculate that 168 is the minimum fuel used when fuel burn increases by 1 with each move', () => {
    const input = ['16,1,2,0,4,2,7,1,2,14'];
    const result = day7.part2(input);
    expect(result).toBe(168);
  });
});

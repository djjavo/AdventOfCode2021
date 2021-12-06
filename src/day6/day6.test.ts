import day6 from '.';

describe('Day 6', () => {
  it('should correctly silmuate the number of laternfish to be 5934 after 80 days', () => {
    const input = ['3,4,3,1,2'];
    const result = day6.part1(input);
    expect(result).toBe(5934);
  });

  it('should correctly silmuate the number of laternfish to be 26984457539 after 256 days', () => {
    const input = ['3,4,3,1,2'];
    const result = day6.part2(input);
    expect(result).toBe(26984457539);
  });
});

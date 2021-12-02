import day1 from '.';

describe('Day 1', () => {
  it('should corrently identify that there are 7 subsequent increases in numbers', () => {
    const input = [
      '199',
      '200',
      '208',
      '210',
      '200',
      '207',
      '240',
      '269',
      '260',
      '263'
    ];
    const result = day1.part1(input);
    expect(result).toBe(7);
  });

  it('should corrently identify that there are 5 subsequent increases in three-measurement sliding windows', () => {
    const input = [
      '199',
      '200',
      '208',
      '210',
      '200',
      '207',
      '240',
      '269',
      '260',
      '263'
    ];
    const result = day1.part2(input);
    expect(result).toBe(5);
  });
});

import day2 from '.';

describe('Day 2', () => {
  it('should correctly navigate horizontal and vertically', () => {
    const input = [
      'forward 5',
      'down 5',
      'forward 8',
      'up 3',
      'down 8',
      'forward 2'
    ];
    const result = day2.part1(input);
    expect(result).toBe(150);
  });

  it('should correctly navigate horizontal and vertically with aim', () => {
    const input = [
      'forward 5',
      'down 5',
      'forward 8',
      'up 3',
      'down 8',
      'forward 2'
    ];
    const result = day2.part2(input);
    expect(result).toBe(900);
  });
});

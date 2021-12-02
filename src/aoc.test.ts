import day1 from './day1';
import day2 from './day2';
import input from './inputs';

describe('Advent of Code 2020 Solutions', () => {
  it.each([
    [1, day1, 0, 1754, 1789],
    [2, day2, 1, 1989265, 2089174012]
  ])('should solve day %i', (_, day, index, part1, part2) => {
    expect(day.part1(input[index])).toBe(part1);
    expect(day.part2(input[index])).toBe(part2);
  });
});

import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import input from './inputs';

describe('Advent of Code 2021 Solutions', () => {
  it.each([
    [1, day1, 0, 1754, 1789],
    [2, day2, 1, 1989265, 2089174012],
    [3, day3, 2, 3309596, 2981085],
    [4, day4, 3, 11536, 1284]
  ])('should solve day %i', (_, day, index, part1, part2) => {
    expect(day.part1(input[index])).toBe(part1);
    expect(day.part2(input[index])).toBe(part2);
  });
});

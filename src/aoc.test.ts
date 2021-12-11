import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import day5 from './day5';
import day6 from './day6';
import day7 from './day7';
import day8 from './day8';
import day9 from './day9';
import day10 from './day10';
import input from './inputs';

describe('Advent of Code 2021 Solutions', () => {
  it.each([
    [1, day1, 0, 1754, 1789],
    [2, day2, 1, 1989265, 2089174012],
    [3, day3, 2, 3309596, 2981085],
    [4, day4, 3, 11536, 1284],
    [5, day5, 4, 3990, 21305],
    [6, day6, 5, 359344, 1629570219571],
    [7, day7, 6, 352254, 99053143],
    [8, day8, 7, 519, 1027483],
    [9, day9, 8, 480, 1045660],
    [10, day10, 9, 387363, 4330777059]
  ])('should solve day %i', (_, day, index, part1, part2) => {
    expect(day.part1(input[index])).toBe(part1);
    expect(day.part2(input[index])).toBe(part2);
  });
});

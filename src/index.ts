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
import day11 from './day11';
import day12 from './day12';
import day13 from './day13';
import day14 from './day14';
import day15 from './day15';
import input from './inputs';

type Challenge = {
  part1: (input: string[]) => any;
  part2: (input: string[]) => any;
};

const completedDays: Challenge[] = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15
];

const cliArgs = process.argv.slice(2);

if (cliArgs.length) {
  const dayArg = parseInt(cliArgs[0]);
  if (dayArg > 0 && dayArg <= completedDays.length)
    Object.values(completedDays[dayArg - 1]).forEach((func, i) => {
      console.log(`Day ${dayArg} - Part ${i + 1}: ${func(input[dayArg - 1])}`);
    });
} else {
  completedDays.forEach((day, i) => {
    Object.values(day).forEach((func, j) => {
      console.log(`Day ${i + 1} - Part ${j + 1}: ${func(input[i])}`);
    });
  });
}

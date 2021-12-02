const navigateSubmarine = (input: string[]) => {
  let horizonalPosition = 0;
  let depth = 0;

  for (const instruction of input) {
    const [direction, amount] = instruction.split(' ');

    if (direction === 'forward') horizonalPosition += parseInt(amount);
    if (direction === 'up') depth -= parseInt(amount);
    if (direction === 'down') depth += parseInt(amount);
  }

  return horizonalPosition * depth;
};

const navigateSubmarineWithAim = (input: string[]) => {
  let horizonalPosition = 0;
  let depth = 0;
  let aim = 0;

  for (const instruction of input) {
    const [direction, amount] = instruction.split(' ');

    if (direction === 'forward') {
      horizonalPosition += parseInt(amount);
      depth += parseInt(amount) * aim;
    }
    if (direction === 'up') aim -= parseInt(amount);
    if (direction === 'down') aim += parseInt(amount);
  }

  return horizonalPosition * depth;
};

const part1 = (input: string[]) => navigateSubmarine(input);

const part2 = (input: string[]) => navigateSubmarineWithAim(input);

export default { part1, part2 };

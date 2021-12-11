export const parseInput = (input: string[]) => {
  const parsedInput = [] as number[][];
  for (const line of input) {
    parsedInput.push(line.split('').map(Number));
  }
  return parsedInput;
};

export const increaseEnergyLevel = (input: number[][]) => {
  return input.map(row => row.map(energyLevel => energyLevel + 1));
};

export const findFlashingOctopuses = (input: number[][]) => {
  const flashingOctopuses = [] as number[][];
  input.forEach((row, yIndex) => {
    row.forEach((energyLevel, xIndex) => {
      energyLevel > 9 ? flashingOctopuses.push([yIndex, xIndex]) : '';
    });
  });

  return flashingOctopuses;
};

export const findAdjacentOctopuses = (
  input: number[][],
  flashingOctopuses: number[][]
) => {
  const yLength = input.length;
  const xLength = input[0].length;

  const neighbours = [] as number[][];

  for (const flashingOctopus of flashingOctopuses) {
    if (flashingOctopus[1] > 0)
      neighbours.push([flashingOctopus[0], flashingOctopus[1] - 1]);
    if (flashingOctopus[1] < xLength - 1)
      neighbours.push([flashingOctopus[0], flashingOctopus[1] + 1]);

    if (flashingOctopus[0] > 0)
      neighbours.push([flashingOctopus[0] - 1, flashingOctopus[1]]);
    if (flashingOctopus[0] < yLength - 1)
      neighbours.push([flashingOctopus[0] + 1, flashingOctopus[1]]);

    if (flashingOctopus[0] > 0 && flashingOctopus[1] > 0)
      neighbours.push([flashingOctopus[0] - 1, flashingOctopus[1] - 1]);
    if (flashingOctopus[0] < yLength - 1 && flashingOctopus[1] > 0)
      neighbours.push([flashingOctopus[0] + 1, flashingOctopus[1] - 1]);
    if (flashingOctopus[0] > 0 && flashingOctopus[1] < xLength - 1)
      neighbours.push([flashingOctopus[0] - 1, flashingOctopus[1] + 1]);
    if (flashingOctopus[0] < yLength - 1 && flashingOctopus[1] < xLength - 1)
      neighbours.push([flashingOctopus[0] + 1, flashingOctopus[1] + 1]);
  }

  return neighbours;
};

export const countFlashesAndReset = (input: number[][]) => {
  let flashes = 0;

  const resetInput = input.map(row =>
    row.map(energyLevel => {
      if (energyLevel > 9) {
        flashes += 1;
        return 0;
      }
      return energyLevel;
    })
  );

  return {
    resetInput,
    flashes
  };
};

export const modelStep = (input: number[][]) => {
  /*
    1. the energy level of each octopus increases by 1.
    2. any octopus with an energy level greater than 9 flashes.
       - this increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
       - if this causes an octopus to have an energy level greater than 9, it also flashes.
       - this process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
    3. any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
  */

  const increasedInput = increaseEnergyLevel(input);
  const flashingOctopuses = findFlashingOctopuses(increasedInput);

  const adjacentToIncrement = findAdjacentOctopuses(
    increasedInput,
    flashingOctopuses
  );

  while (adjacentToIncrement.length > 0) {
    const nextIncrement = adjacentToIncrement.pop()!;
    const [y, x] = nextIncrement;

    if (increasedInput[y][x] === 9) {
      increasedInput[y][x] += 1;
      adjacentToIncrement.push(
        ...findAdjacentOctopuses(increasedInput, [[y, x]])
      );
    } else if (increasedInput[y][x] < 9) {
      increasedInput[y][x] += 1;
    }
  }

  return countFlashesAndReset(increasedInput);
};

export const checkForSyncronisation = (input: number[][]) => {
  for (const row of input) {
    for (const energyLevel of row) {
      if (energyLevel !== 0) return false;
    }
  }

  return true;
};

const part1 = (input: string[]) => {
  let totalFlashes = 0;
  let parsedInput = parseInput(input);

  for (let step = 0; step < 100; step++) {
    const { resetInput, flashes } = modelStep(parsedInput);
    parsedInput = resetInput;
    totalFlashes += flashes;
  }

  return totalFlashes;
};

const part2 = (input: string[]) => {
  let parsedInput = parseInput(input);

  for (let step = 1; step < 2000; step++) {
    const { resetInput } = modelStep(parsedInput);

    if (checkForSyncronisation(resetInput)) {
      return step;
    }
    parsedInput = resetInput;
  }
};

export default { part1, part2 };

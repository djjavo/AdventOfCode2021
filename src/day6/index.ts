/*
  export const processTickInefficient = (lanternfish: number[]) => {
    const fishToAdd = lanternfish.filter(fish => fish === 0).map(_ => 8);

    const updatedLaternFish = lanternfish.map(fish => {
      if (fish === 0) {
        return 6;
      } else {
        return (fish -= 1);
      }
    });

    return updatedLaternFish.concat(fishToAdd);
  };
*/

export const loadInitialState = (input: string[]) => {
  let initialState = input[0].split(',').map(fish => parseInt(fish));

  let lanternfish = new Map<number, number>();

  initialState.forEach(fish => {
    const fishFromMap = lanternfish.get(fish);

    if (fishFromMap) {
      lanternfish.set(fish, fishFromMap + 1);
    } else {
      lanternfish.set(fish, 1);
    }
  });

  return lanternfish;
};

export const processTick = (lanternfish: Map<number, number>) => {
  // A laternfish reproduces every 7 days (modelled 0-6)
  const fishToAdd = lanternfish.get(0);

  const updatedLaternFish = new Map<number, number>();

  let fishToReset;

  for (let [fish, count] of lanternfish.entries()) {
    if (fish === 0) {
      fishToReset = count;
    } else {
      updatedLaternFish.set(fish - 1, count);
    }
  }

  // We need to combine the counts of fish that have just reset with the decrementing fish
  if (fishToReset) {
    updatedLaternFish.set(6, (updatedLaternFish.get(6) || 0) + fishToReset);
  }

  if (fishToAdd) {
    // The new fish need 9 days to reproduce on the first cycle
    updatedLaternFish.set(8, fishToAdd);
  }

  return updatedLaternFish;
};

export const countNumberOfFish = (lanternfish: Map<number, number>) => {
  let numberOfFish = 0;

  for (const count of lanternfish.values()) {
    numberOfFish += count;
  }

  return numberOfFish;
};

export const simulateLanternfishReproduction = (
  input: string[],
  numberOfDays: number
) => {
  let lanternfish = loadInitialState(input);

  for (let day = 0; day < numberOfDays; day++) {
    lanternfish = processTick(lanternfish);
  }

  return countNumberOfFish(lanternfish);
};

const part1 = (input: string[]) => simulateLanternfishReproduction(input, 80);

const part2 = (input: string[]) => simulateLanternfishReproduction(input, 256);

export default { part1, part2 };

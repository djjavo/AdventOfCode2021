const countIncreasesWithWindow = (
  input: string[],
  windowLength: number = 1
) => {
  let windowedInput: number[];

  if (windowLength > 1) {
    windowedInput = input
      .map((_, index) => {
        return input
          .slice(index, index + windowLength)
          .reduce((previous, current) => previous + parseInt(current), 0);
      })
      .slice(0, -windowLength + 1);
  } else {
    windowedInput = input.map(element => parseInt(element));
  }

  const filteredInput = windowedInput.filter((element, index) => {
    return element > windowedInput[index - 1];
  });

  return filteredInput.length;
};

const part1 = (input: string[]) => countIncreasesWithWindow(input);

const part2 = (input: string[]) => countIncreasesWithWindow(input, 3);

export default { part1, part2 };

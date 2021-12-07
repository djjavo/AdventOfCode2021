export const calculateMedian = (positions: number[]) => {
  positions.sort((a, b) => a - b);
  return positions[positions.length / 2];
};

export const calculateAverage = (positions: number[]) => {
  const sum = positions.reduce((a, b) => a + b, 0);
  return sum / positions.length;
};

export const calculateFuel = (positions: number[], alignmentIndex: number) => {
  return positions
    .map(position => Math.abs(position - alignmentIndex))
    .reduce((a, b) => a + b, 0);
};

export const calculateIncreasingFuel = (
  positions: number[],
  alignmentIndex: number
) => {
  // As fuel increases by 1 each time, these form triangular numbers
  // We can use a mathematical formula to calculate these: n(n+1)/2
  return positions
    .map(position => Math.abs(position - alignmentIndex))
    .map(alignmentDelta => (alignmentDelta * (alignmentDelta + 1)) / 2)
    .reduce((a, b) => a + b, 0);
};

const part1 = (input: string[]) => {
  const parsedInput = input[0].split(',').map(value => parseInt(value));

  const median = calculateMedian(parsedInput);
  return calculateFuel(parsedInput, median);
};

const part2 = (input: string[]) => {
  const parsedInput = input[0].split(',').map(value => parseInt(value));

  // When calculating the average, we may end up with a fractional number
  // so we need to take the floor and ceiling, calculate the fuel for both
  // and then take the minimum of the two
  const average = calculateAverage(parsedInput);

  return Math.min(
    calculateIncreasingFuel(parsedInput, Math.floor(average)),
    calculateIncreasingFuel(parsedInput, Math.ceil(average))
  );
};

export default { part1, part2 };

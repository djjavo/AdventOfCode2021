export const mostCommonValueForBit = (input: string[], index: number) => {
  return input.filter(binaryInput => binaryInput[index] === '1').length >=
    input.length / 2
    ? '1'
    : '0';
};

export const leastCommonValueForBit = (input: string[], index: number) => {
  return input.filter(binaryInput => binaryInput[index] === '1').length <
    input.length / 2
    ? '1'
    : '0';
};

export const generateDiagnosticRateByBitCriteria = (
  input: string[],
  filterCriteria: (input: string[], index: number) => '0' | '1'
) => {
  const binaryLength = input[0].length;

  let gamma = '';
  for (let index = 0; index < binaryLength; index++) {
    if (filterCriteria(input, index) === '1') {
      gamma = gamma + '1';
    } else {
      gamma = gamma + '0';
    }
  }

  return gamma;
};

export const calculateGammaRate = (input: string[]) => {
  return parseInt(
    generateDiagnosticRateByBitCriteria(input, mostCommonValueForBit),
    2
  );
};

export const calculateEpsilonRate = (input: string[]) => {
  return parseInt(
    generateDiagnosticRateByBitCriteria(input, leastCommonValueForBit),
    2
  );
};

export const filterDiagnosticsByBitCriteria = (
  input: string[],
  filterCriteria: (input: string[], index: number) => '0' | '1'
) => {
  const binaryLength = input[0].length;

  for (let index = 0; index < binaryLength; index++) {
    input = input.filter(
      binaryInput => binaryInput[index] === filterCriteria(input, index)
    );

    if (input.length === 1) break;
  }

  return input[0];
};

export const calculateOxygenGeneratorRating = (input: string[]) => {
  return parseInt(
    filterDiagnosticsByBitCriteria(input, mostCommonValueForBit),
    2
  );
};

export const calculateCO2ScrubberRating = (input: string[]) => {
  return parseInt(
    filterDiagnosticsByBitCriteria(input, leastCommonValueForBit),
    2
  );
};

const part1 = (input: string[]) =>
  calculateGammaRate(input) * calculateEpsilonRate(input);

const part2 = (input: string[]) =>
  calculateOxygenGeneratorRating(input) * calculateCO2ScrubberRating(input);

export default { part1, part2 };

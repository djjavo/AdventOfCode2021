export const parseSignalNotes = (signalNotes: string[]) => {
  const digitCombinations = [] as string[][];
  const fourDigitOutputs = [] as string[][];

  signalNotes.forEach(note => {
    const [combinations, output] = note.split(' | ');

    digitCombinations.push(combinations.split(' '));
    fourDigitOutputs.push(output.split(' '));
  });

  return { digitCombinations, fourDigitOutputs };
};

const countMatchingSegmentsWithinString = (
  digit: string,
  segments: string[]
) => {
  let numberOfMatchingSegments = 0;

  segments.forEach(segment => {
    if (digit.includes(segment)) {
      numberOfMatchingSegments += 1;
    }
  });

  return numberOfMatchingSegments;
};

const part1 = (input: string[]) => {
  const { fourDigitOutputs } = parseSignalNotes(input);

  // The digits 1, 4, 7, or 8 all use a unique number of segments, 2, 4, 3, or 7, repectively
  let numberOfUniqueSeqmentDigits = 0;

  fourDigitOutputs.forEach(fourDigitOutput => {
    numberOfUniqueSeqmentDigits += fourDigitOutput.filter(digitOutput =>
      [2, 3, 4, 7].includes(digitOutput.length)
    ).length;
  });

  return numberOfUniqueSeqmentDigits;
};

const part2 = (input: string[]) => {
  const { digitCombinations, fourDigitOutputs } = parseSignalNotes(input);

  let totalOutputSum = 0;

  digitCombinations.forEach((digitCombination, index) => {
    // to find the segments for 1, find the digit combination that only has 2 segments
    const segmentsForOne = digitCombination
      .filter(digit => digit.length === 2)[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 4, find the digit combination that only has 4 segments
    const segmentsForFour = digitCombination
      .filter(digit => digit.length === 4)[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 7, find the digit combination that only has 3 segments
    const segmentsForSeven = digitCombination
      .filter(digit => digit.length === 3)[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 8, find the digit combination that only has 7 segments
    const segmentsForEight = digitCombination
      .filter(digit => digit.length === 7)[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 3, find the digit combination that has 5 segments
    // and includes both segments used for 1
    const segmentsForThree = digitCombination
      .filter(
        digit =>
          digit.length === 5 &&
          digit.includes(segmentsForOne[0]) &&
          digit.includes(segmentsForOne[1])
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 6, find the digit combination that has 6 segments
    // and does not include both segments used for 1
    const segmentsForSix = digitCombination
      .filter(
        digit =>
          digit.length === 6 &&
          !(
            digit.includes(segmentsForOne[0]) &&
            digit.includes(segmentsForOne[1])
          )
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 2, find the digit combination that has 5 segments
    // and includes exactly 2 of the segments used for 4
    const segmentsForTwo = digitCombination
      .filter(
        digit =>
          digit.length === 5 &&
          countMatchingSegmentsWithinString(digit, segmentsForFour) === 2
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 5, find the digit combination that has 5 segments
    // and includes exactly 3 of the segments used for 4
    const segmentsForFive = digitCombination
      .filter(
        digit =>
          digit.length === 5 &&
          countMatchingSegmentsWithinString(digit, segmentsForFour) === 3 &&
          !(
            digit.includes(segmentsForOne[0]) &&
            digit.includes(segmentsForOne[1])
          )
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 9, find the digit combination that has 6 segments
    // and includes exactly all of the segments used for 4
    const segmentsForNine = digitCombination
      .filter(
        digit =>
          digit.length === 6 &&
          countMatchingSegmentsWithinString(digit, segmentsForFour) === 4
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    // to find the segments for 0, find the digit combination that has 6 segments
    // and includes both segments used for 1
    const segmentsForZero = digitCombination
      .filter(
        digit =>
          digit.length === 6 &&
          countMatchingSegmentsWithinString(digit, segmentsForFour) === 3 &&
          digit.includes(segmentsForOne[0]) &&
          digit.includes(segmentsForOne[1])
      )[0]
      .split('')
      .sort((a, b) => (a < b ? -1 : 1));

    const decodedNumbers = [
      segmentsForZero.join(''),
      segmentsForOne.join(''),
      segmentsForTwo.join(''),
      segmentsForThree.join(''),
      segmentsForFour.join(''),
      segmentsForFive.join(''),
      segmentsForSix.join(''),
      segmentsForSeven.join(''),
      segmentsForEight.join(''),
      segmentsForNine.join('')
    ];

    // sort each of the outputs alphabetically for comparison
    const sortedOutput = fourDigitOutputs[index].map(fourDigitOutput =>
      fourDigitOutput
        .split('')
        .sort((a, b) => (a < b ? -1 : 1))
        .join('')
    );

    // sort each of the decoded numbers alphabetically for comparison
    // finder the index of each output digit in the decoded numbers
    // and join them to create the 4 digit reading
    const decodedOutput = parseInt(
      sortedOutput
        .map(sorted => decodedNumbers.findIndex(el => el === sorted))
        .join('')
    );

    totalOutputSum += decodedOutput;
  });

  return totalOutputSum;
};

export default { part1, part2 };

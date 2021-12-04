export const processInput = (input: string[]) => {
  // the first line of the input is the random draw order
  const randomDraw = input[0].split(',');

  const bingoCards = [] as string[][][];
  let bingoCard = [] as string[][];

  for (let line = 2; line < input.length; line++) {
    if (input[line].length === 0) {
      bingoCards.push(bingoCard);
      bingoCard = [];
    } else {
      bingoCard.push(input[line].split(' ').filter(Boolean));
    }
  }
  bingoCards.push(bingoCard);

  return { randomDraw, bingoCards };
};

export const getCardColumn = (bingoCard: string[][], columnIndex: number) => {
  return bingoCard.map(value => value[columnIndex]);
};

export const processBingoCards = (bingoCards: string[][][]) => {
  const processedCards = [] as string[][][];

  // for ease, add each column as a new row (add the transpose of the card)
  for (const bingoCard of bingoCards) {
    const combinations = [...bingoCard];
    for (let index = 0; index < 5; index++) {
      combinations.push(getCardColumn(bingoCard, index));
    }
    processedCards.push(combinations);
  }

  return processedCards;
};

export const calculateScore = (
  bingoCard: string[][],
  drawnNumbers: string[]
) => {
  // take the first 5 rows, as this card is combined with columns as rows
  const flatternedCard = ([] as string[]).concat(...bingoCard.slice(0, 5));

  const unmarkedNumbers = flatternedCard
    .filter(value => !drawnNumbers.includes(value))
    .map(value => parseInt(value));

  if (unmarkedNumbers.length !== 0) {
    const unmarkedNumbersSum = unmarkedNumbers.reduce(
      (previous, current) => previous + current
    );

    return unmarkedNumbersSum * parseInt(drawnNumbers.slice(-1)[0]);
  }

  return 0;
};

export const checkForWinningCards = (
  drawnNumbers: string[],
  processedCards: string[][][]
) => {
  const winningCards = [] as string[][][];
  for (const processedCard of processedCards) {
    for (const row of processedCard) {
      if (row.every(value => drawnNumbers.includes(value))) {
        winningCards.push(processedCard);
      }
    }
  }

  if (winningCards.length === 0) return undefined;

  return winningCards;
};

export const processWinningCards = (
  drawnNumbers: string[],
  processedCards: string[][][]
) => {
  for (const processedCard of processedCards) {
    for (const row of processedCard) {
      if (row.every(value => drawnNumbers.includes(value))) {
        return calculateScore(processedCard, drawnNumbers);
      }
    }
  }
};

const part1 = (input: string[]) => {
  const drawnNumbers = [] as string[];

  const { randomDraw, bingoCards } = processInput(input);
  const processedCards = processBingoCards(bingoCards);

  for (const value of randomDraw) {
    drawnNumbers.push(value);

    const winningCards = checkForWinningCards(drawnNumbers, processedCards);

    if (winningCards) {
      return processWinningCards(drawnNumbers, processedCards);
    }
  }
};

const part2 = (input: string[]) => {
  const drawnNumbers = [] as string[];

  const { randomDraw, bingoCards } = processInput(input);
  let processedCards = processBingoCards(bingoCards);

  for (const value of randomDraw) {
    drawnNumbers.push(value);

    const winningCards = checkForWinningCards(drawnNumbers, processedCards);

    if (winningCards) {
      if (processedCards.length === 1) {
        return processWinningCards(drawnNumbers, processedCards);
      } else {
        processedCards = processedCards.filter(
          processedCard => !winningCards.includes(processedCard)
        );
        processWinningCards(drawnNumbers, processedCards);
      }
    }
  }
};

export default { part1, part2 };

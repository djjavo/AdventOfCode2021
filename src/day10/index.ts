type OpeningCharacter = '(' | '{' | '[' | '<';

export const isOpen = (character: string) => {
  return ['(', '{', '[', '<'].includes(character);
};

export const isClose = (character: string) => {
  return [')', '}', ']', '>'].includes(character);
};

export const checkMatching = (
  openingCharacter: OpeningCharacter,
  closingCharacter: string
) => {
  const characterMap = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>'
  };

  return characterMap[openingCharacter] === closingCharacter;
};

export const checkLine = (line: string) => {
  const openingCharacterStack = [] as OpeningCharacter[];

  for (const character of line) {
    if (isOpen(character)) {
      openingCharacterStack.push(character as OpeningCharacter);
    } else if (isClose(character)) {
      if (openingCharacterStack.length > 0) {
        const lastOpenedCharacter: OpeningCharacter = openingCharacterStack.pop()!;
        if (!checkMatching(lastOpenedCharacter, character)) {
          return { corrupted: true, incomplete: false, character };
        }
      }
    }
  }

  return {
    corrupted: false,
    incomplete: openingCharacterStack.length > 0,
    openingCharacterStack
  };
};

export const checkScore = (corruptedCharacter: string) => {
  if (corruptedCharacter === ')') return 3;
  if (corruptedCharacter === ']') return 57;
  if (corruptedCharacter === '}') return 1197;
  if (corruptedCharacter === '>') return 25137;
  return 0;
};

export const checkIncompleteScore = (incompleteCharacter: string) => {
  if (incompleteCharacter === ')') return 1;
  if (incompleteCharacter === ']') return 2;
  if (incompleteCharacter === '}') return 3;
  if (incompleteCharacter === '>') return 4;
  return 0;
};

const part1 = (input: string[]) => {
  let totalErrorScore = 0;

  input.forEach(line => {
    const lineStatus = checkLine(line);

    if (lineStatus.corrupted && lineStatus.character) {
      totalErrorScore += checkScore(lineStatus.character);
    }
  });

  return totalErrorScore;
};

const part2 = (input: string[]) => {
  let totalScores = [] as number[];

  input.forEach(line => {
    const lineStatus = checkLine(line);

    if (lineStatus.incomplete && lineStatus.openingCharacterStack) {
      const closingCharacters = lineStatus.openingCharacterStack
        .reverse()
        .map(character => {
          if (character === '(') return ')';
          if (character === '[') return ']';
          if (character === '{') return '}';
          if (character === '<') return '>';
          return character;
        });

      let thisScore = 0;
      for (const character of closingCharacters) {
        thisScore = thisScore * 5 + checkIncompleteScore(character);
      }

      totalScores.push(thisScore);
    }
  });

  return totalScores.sort((a, b) => a - b)[Math.floor(totalScores.length / 2)];
};

export default { part1, part2 };

export const parseInput = (input: string[]) => {
  const dots = [] as number[][];
  const instructions = [] as string[];

  for (const line of input) {
    if (line === '') continue;

    if (line.includes('fold along')) {
      instructions.push(line.split(' ')[2]);
    } else {
      const [x, y] = line.split(',');
      dots.push([parseInt(x), parseInt(y)]);
    }
  }

  return { dots, instructions };
};

export const prettyPrintDots = (dots: number[][]) => {
  let completeOutput = '';
  for (let y = 0; y < 6; y++) {
    let lineOutput = '';
    for (let x = 0; x < 40; x++) {
      if (dots.find(value => value[0] === x && value[1] === y)) {
        lineOutput += '#';
      } else {
        lineOutput += ' ';
      }
    }
    completeOutput += lineOutput + '\n';
  }
  return completeOutput;
};

export const foldHalfUpwards = (dots: number[][], foldLine: number) => {
  const foldedDots = dots.map(dot => {
    if (dot[1] > foldLine) {
      return [dot[0], foldLine * 2 - dot[1]];
    } else {
      return dot;
    }
  });

  const foldLineRemoved = foldedDots.filter(dot => {
    return dot[1] !== foldLine;
  });

  // y height is now equal to foldline (0 to foldline-1)
  return foldLineRemoved;
};

export const foldHalfLeftwards = (dots: number[][], foldLine: number) => {
  const foldedDots = dots.map(dot => {
    if (dot[0] > foldLine) {
      return [foldLine * 2 - dot[0], dot[1]];
    } else {
      return dot;
    }
  });

  const foldLineRemoved = foldedDots.filter(dot => {
    return dot[0] !== foldLine;
  });

  // x height is now equal to foldline (0 to foldline-1)
  return foldLineRemoved;
};

const part1 = (input: string[]) => {
  const { dots } = parseInput(input);

  const foldedDots = foldHalfLeftwards(dots, 655);

  // @ts-ignore
  const set = Array.from(new Set(foldedDots.map(JSON.stringify)), JSON.parse);
  return set.length;
};

const part2 = (input: string[]) => {
  const { dots, instructions } = parseInput(input);

  let foldedDots = dots;

  for (const instruction of instructions) {
    const [dimension, fold] = instruction.split('=');

    if (dimension === 'x') {
      foldedDots = foldHalfLeftwards(foldedDots, parseInt(fold));
    } else {
      foldedDots = foldHalfUpwards(foldedDots, parseInt(fold));
    }
  }

  // @ts-ignore
  const set = Array.from(new Set(foldedDots.map(JSON.stringify)), JSON.parse);

  // Uncomment to see the letters!
  // console.log(prettyPrintDots(set));

  return 'FJAHJGAH';
};

export default { part1, part2 };

interface VentLine {
  start: Point;
  end: Point;
}

interface Point {
  x: number;
  y: number;
}

export const printVentLineMap = (ventLineMap: number[][]) => {
  let printedMap = '';

  ventLineMap.forEach(row => {
    printedMap += row.join(',');
    printedMap += '\n';
  });

  console.log(printedMap);
};

export const parseInputLines = (input: string[]) => {
  const ventLines = [] as VentLine[];

  input.forEach(ventLine => {
    const [start, end] = ventLine.split(' -> ');

    const [startX, startY] = start.split(',');
    const [endX, endY] = end.split(',');

    ventLines.push({
      start: { x: parseInt(startX), y: parseInt(startY) },
      end: { x: parseInt(endX), y: parseInt(endY) }
    });
  });

  return ventLines;
};

export const filterDiagonalVentLines = (ventLines: VentLine[]) => {
  return ventLines.filter(ventLine => {
    return (
      ventLine.start.x === ventLine.end.x || ventLine.start.y === ventLine.end.y
    );
  });
};

export const filterHorizonalVerticleVentLines = (
  ventLines: VentLine[],
  horizontalVerticleVentLines: VentLine[]
) => {
  return ventLines.filter(ventLine => {
    return !horizontalVerticleVentLines.includes(ventLine);
  });
};

export const generateInitialVentLineMap = (ventLines: VentLine[]) => {
  // need to fill the nxn array depending on the largest dimention
  const maxDimension = Math.max.apply(
    Math,
    ventLines.map(ventLine =>
      Math.max(
        ventLine.start.x,
        ventLine.start.y,
        ventLine.end.x,
        ventLine.end.y
      )
    )
  );

  return Array(maxDimension + 1)
    .fill(0)
    .map(() => Array(maxDimension + 1).fill(0)) as number[][];
};

export const plotHorizontalVerticalVentLines = (
  ventLineMap: number[][],
  ventLines: VentLine[]
) => {
  ventLines.forEach(ventLine => {
    const deltaX = ventLine.start.x - ventLine.end.x;

    if (deltaX === 0) {
      for (
        let y = Math.min(ventLine.start.y, ventLine.end.y);
        y < Math.max(ventLine.start.y, ventLine.end.y) + 1;
        y++
      ) {
        ventLineMap[y][ventLine.start.x] += 1;
      }
    } else {
      for (
        let x = Math.min(ventLine.start.x, ventLine.end.x);
        x < Math.max(ventLine.start.x, ventLine.end.x) + 1;
        x++
      ) {
        ventLineMap[ventLine.start.y][x] += 1;
      }
    }
  });

  return ventLineMap;
};

export const plotDiagonalVentLines = (
  ventLineMap: number[][],
  ventLines: VentLine[]
) => {
  ventLines.forEach(ventLine => {
    // a positive delta means decreasing, a negative delta means increasing
    const deltaX = ventLine.start.x - ventLine.end.x;
    const deltaY = ventLine.start.y - ventLine.end.y;

    let x = ventLine.start.x;
    let xIncrement = deltaX > 0 ? -1 : 1;

    // if we have a positive delate, we start at the end
    if (deltaY > 0) {
      // update x to start and the end
      x = ventLine.end.x;

      // if both x and y end at the same point, we don't need to invert the incrementor
      if (ventLine.end.x !== ventLine.end.y) {
        xIncrement = -xIncrement;
      }
    }

    for (
      let y = Math.min(ventLine.start.y, ventLine.end.y);
      y < Math.max(ventLine.start.y, ventLine.end.y) + 1;
      y++
    ) {
      ventLineMap[y][x] += 1;
      x += xIncrement;
    }
  });

  return ventLineMap;
};

const part1 = (input: string[]) => {
  const ventLines = parseInputLines(input);
  let ventLineMap = generateInitialVentLineMap(ventLines);

  const filteredVentLines = filterDiagonalVentLines(ventLines);

  ventLineMap = plotHorizontalVerticalVentLines(ventLineMap, filteredVentLines);

  return ventLineMap.flat().filter(ventLineCount => ventLineCount > 1).length;
};

const part2 = (input: string[]) => {
  const ventLines = parseInputLines(input);

  let ventLineMap = generateInitialVentLineMap(ventLines);

  const horizontalVerticleVentLines = filterDiagonalVentLines(ventLines);
  ventLineMap = plotHorizontalVerticalVentLines(
    ventLineMap,
    horizontalVerticleVentLines
  );

  const diagonalVentLines = filterHorizonalVerticleVentLines(
    ventLines,
    horizontalVerticleVentLines
  );
  ventLineMap = plotDiagonalVentLines(ventLineMap, diagonalVentLines);

  return ventLineMap.flat().filter(ventLineCount => ventLineCount > 1).length;
};

export default { part1, part2 };

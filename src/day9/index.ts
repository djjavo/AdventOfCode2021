interface Point {
  x: number;
  y: number;
  height: number;
}

export const parseHeightmap = (input: string[]) => {
  const parsedMap = [] as Point[][];

  for (let y = 0; y < input.length; y++) {
    const parsedRow = [] as Point[];
    for (let x = 0; x < input[y].length; x++) {
      parsedRow.push({
        x,
        y,
        height: parseInt(input[y][x])
      });
    }
    parsedMap.push(parsedRow);
  }

  return parsedMap;
};

export const getAdjacentPoints = (heightMap: Point[][], point: Point) => {
  const neighbours = [] as Point[];

  const yLength = heightMap.length;
  const xLength = heightMap[0].length;

  if (point.x > 0) neighbours.push(heightMap[point.y][point.x - 1]);
  if (point.x < xLength - 1) neighbours.push(heightMap[point.y][point.x + 1]);

  if (point.y > 0) neighbours.push(heightMap[point.y - 1][point.x]);
  if (point.y < yLength - 1) neighbours.push(heightMap[point.y + 1][point.x]);

  return neighbours;
};

export const calculateLowPoints = (heightMap: Point[][]) => {
  const lowPoints = [] as Point[];

  for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
      const currentPoint = {
        x,
        y,
        height: heightMap[y][x].height
      };

      const adjacentPoints = getAdjacentPoints(heightMap, currentPoint);

      if (
        adjacentPoints.filter(point => point.height <= currentPoint.height)
          .length === 0
      ) {
        lowPoints.push(currentPoint);
      }
    }
  }

  return lowPoints;
};

export const calculateRiskLevel = (lowPoints: Point[]) => {
  const numberOfLowPoints = lowPoints.length;

  return (
    lowPoints.map(lowPoint => lowPoint.height).reduce((a, b) => a + b, 0) +
    numberOfLowPoints
  );
};

export const exploreBasin = (heightMap: Point[][], lowPoint: Point) => {
  /*
    - every low point has a basin
    - locations of height 9 do not count as being in any basin
    - all other locations will always be part of exactly one basin
  */

  const exploredPoints = [] as string[];
  const pointsToExplore = [lowPoint];
  let sizeOfBasin = 0;

  while (pointsToExplore.length > 0) {
    // we need to use the non-null assertion operator here as we can be sure that .pop() will not return undefined
    const pointToExplore = pointsToExplore.pop()!;

    // only consider a point if:
    //   a) it isn't of height 9
    //   b) it has not yet been explored
    if (
      pointToExplore.height !== 9 &&
      !exploredPoints.includes(`${pointToExplore.x},${pointToExplore.y}`)
    ) {
      // increment the size of the basin
      sizeOfBasin += 1;
      // add the current point to those already explored
      exploredPoints.push(`${pointToExplore.x},${pointToExplore.y}`);
      // add the adjacent point to the list for future exploration
      pointsToExplore.push(...getAdjacentPoints(heightMap, pointToExplore));
    }
  }

  return sizeOfBasin;
};

const part1 = (input: string[]) => {
  const lowPoints = calculateLowPoints(parseHeightmap(input));
  return calculateRiskLevel(lowPoints);
};

const part2 = (input: string[]) => {
  const heightMap = parseHeightmap(input);
  const lowPoints = calculateLowPoints(heightMap);

  const basinSizes = [] as number[];

  lowPoints.forEach(lowPoint => {
    basinSizes.push(exploreBasin(heightMap, lowPoint));
  });

  return basinSizes
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((a, b) => a * b);
};

export default { part1, part2 };

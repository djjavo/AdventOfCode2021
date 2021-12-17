interface QueueElement {
  priority: number;
  x: number;
  y: number;
}

export const parseInput = (input: string[]) => {
  const parsedInput = [] as number[][];
  for (const line of input) {
    parsedInput.push(line.split('').map(Number));
  }
  return parsedInput;
};

export const expandGrid = (
  initialGrid: number[][],
  expansionFactor: number
) => {
  const yLength = initialGrid.length;
  const xLength = initialGrid[0].length;

  const expandedGrid: number[][] = [];

  for (let y = 0; y < yLength * expansionFactor; y++) {
    expandedGrid[y] = [];
    for (let x = 0; x < xLength * expansionFactor; x++) {
      expandedGrid[y][x] =
        ((Math.floor(x / xLength) +
          Math.floor(y / yLength) +
          initialGrid[y % yLength][x % xLength] -
          1) %
          9) +
        1;
    }
  }

  return expandedGrid;
};

export const getNeighbours = (
  parsedInput: number[][],
  x: number,
  y: number
) => {
  const yLength = parsedInput.length;
  const xLength = parsedInput[0].length;

  const neighbours: number[][] = [];

  if (x < xLength - 1) {
    neighbours.push([y, x + 1]);
  }
  if (y < yLength - 1) {
    neighbours.push([y + 1, x]);
  }

  if (x > 0) {
    neighbours.push([y, x - 1]);
  }
  if (y > 0) {
    neighbours.push([y - 1, x]);
  }

  return neighbours;
};

export const queueBasedDijkstrasAlgorithm = (parsedInput: number[][]) => {
  const yLength = parsedInput.length;
  const xLength = parsedInput[0].length;

  const minimumDistanceToStart: number[][] = [];
  const calculatedNode: boolean[][] = [];
  const priorityQueue: QueueElement[] = [];

  for (let y = 0; y < yLength; y++) {
    minimumDistanceToStart[y] = [];
    calculatedNode[y] = [];
    for (let x = 0; x < xLength; x++) {
      minimumDistanceToStart[y][x] = 1000000;
      calculatedNode[y][x] = false;
    }
  }

  priorityQueue.push({ priority: 0, x: 0, y: 0 });

  while (priorityQueue.length > 0) {
    const currentNode = priorityQueue.shift()!;

    calculatedNode[currentNode.y][currentNode.x] = true;

    const neighbours = getNeighbours(parsedInput, currentNode.x, currentNode.y);

    for (const neighbour of neighbours) {
      if (!calculatedNode[neighbour[0]][neighbour[1]]) {
        if (
          currentNode.priority + parsedInput[neighbour[0]][neighbour[1]] <
          minimumDistanceToStart[neighbour[0]][neighbour[1]]
        ) {
          minimumDistanceToStart[neighbour[0]][neighbour[1]] =
            currentNode.priority + parsedInput[neighbour[0]][neighbour[1]];

          priorityQueue.filter(
            element => element.x != neighbour[1] || element.y != neighbour[0]
          );

          priorityQueue.push({
            priority: minimumDistanceToStart[neighbour[0]][neighbour[1]],
            x: neighbour[1],
            y: neighbour[0]
          });
        }
      }
    }

    priorityQueue.sort((a, b) => a.priority - b.priority);
  }

  return minimumDistanceToStart[yLength - 1][xLength - 1];
};

const part1 = (input: string[]) => {
  const parsedInput = parseInput(input);
  return queueBasedDijkstrasAlgorithm(parsedInput);
};

const part2 = (input: string[]) => {
  const parsedInput = expandGrid(parseInput(input), 5);
  return queueBasedDijkstrasAlgorithm(parsedInput);
};

export default { part1, part2 };

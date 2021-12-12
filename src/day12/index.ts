import cloneDeep from 'lodash/cloneDeep';

interface Vertex {
  adjacent: Vertex[];
  index: string;
}

export const parseInput = (input: string[]) => {
  const cave: Record<string, Vertex> = {};

  input.forEach(edge => {
    const [a, b] = edge.split('-');

    if (!cave[a]) {
      cave[a] = { index: a, adjacent: [] };
    }
    if (!cave[b]) {
      cave[b] = { index: b, adjacent: [] };
    }

    cave[a].adjacent.push(cave[b]);
    cave[b].adjacent.push(cave[a]);
  });

  return cave;
};

/*
  This is an inefficient solution, but to solve part 2, we duplicate a small cave and
  it's connections and calculate the paths that use both the original and the duplciate
  of the small cave
*/
export const depthFirstSearchPart2 = (
  totalPaths: string[][],
  vertices: Record<string, Vertex>,
  currentVertex: string,
  visitedVertices: string[],
  smallCave: string,
  seenPaths: string[]
) => {
  const currentPath = [...visitedVertices, currentVertex];
  const adjacentVertices = vertices[currentVertex].adjacent;

  if (currentVertex === 'end') {
    if (
      currentPath.includes(smallCave) &&
      currentPath.includes(`${smallCave}'`)
    ) {
      const preprocessedPath = currentPath.map(vertex =>
        vertex === `${smallCave}'` ? smallCave : vertex
      );

      if (!seenPaths.includes(preprocessedPath.join(','))) {
        seenPaths.push(preprocessedPath.join(','));
        totalPaths.push(preprocessedPath);
      }
    }

    return;
  }

  for (const adjacentVertex of adjacentVertices) {
    if (
      !(
        visitedVertices.includes(adjacentVertex.index) &&
        /[a-z]/.test(adjacentVertex.index)
      )
    ) {
      depthFirstSearchPart2(
        totalPaths,
        vertices,
        adjacentVertex.index,
        currentPath,
        smallCave,
        seenPaths
      );
    }
  }
};

export const depthFirstSearch = (
  totalPaths: string[][],
  vertices: Record<string, Vertex>,
  currentVertex: string,
  visitedVertices: string[]
) => {
  const currentPath = [...visitedVertices, currentVertex];
  const adjacentVertices = vertices[currentVertex].adjacent;

  if (currentVertex === 'end') {
    totalPaths.push(currentPath);
    return;
  }

  for (const adjacentVertex of adjacentVertices) {
    if (
      !(
        visitedVertices.includes(adjacentVertex.index) &&
        /[a-z]/.test(adjacentVertex.index)
      )
    ) {
      depthFirstSearch(totalPaths, vertices, adjacentVertex.index, currentPath);
    }
  }
};

export const getSmallCaves = (cave: Record<string, Vertex>) => {
  return Object.keys(cave).filter(key => {
    if (key === 'start' || key === 'end') return false;
    return /[a-z]/.test(key);
  });
};

const part1 = (input: string[]) => {
  const cave = parseInput(input);

  const totalPaths = [] as string[][];
  depthFirstSearch(totalPaths, cave, 'start', []);

  return totalPaths.length;
};

const part2 = (input: string[]) => {
  const cave = parseInput(input);

  const totalPaths = [] as string[][];
  // calculate the initial number of paths (as per part 1)
  depthFirstSearch(totalPaths, cave, 'start', []);

  const smallCaves = getSmallCaves(cave);

  for (const smallCave of smallCaves) {
    // for each small cave, make a copy of the cave network
    const temporaryCave = cloneDeep(cave);

    // duplicate the small cave
    temporaryCave[`${smallCave}'`] = cloneDeep(temporaryCave[smallCave]);
    temporaryCave[`${smallCave}'`].index = `${smallCave}'`;

    for (const neighbour of temporaryCave[smallCave].adjacent) {
      neighbour.adjacent.push(temporaryCave[`${smallCave}'`]);
    }

    depthFirstSearchPart2(
      totalPaths,
      temporaryCave,
      'start',
      [],
      smallCave,
      []
    );
  }

  return totalPaths.length;
};

export default { part1, part2 };

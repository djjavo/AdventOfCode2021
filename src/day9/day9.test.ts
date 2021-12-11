import day9, { calculateLowPoints, getAdjacentPoints, parseHeightmap } from '.';

describe('Day 9', () => {
  it('should correctly calculate 15 as the sum of the risk levels of all low pointst', () => {
    const input = [
      '2199943210',
      '3987894921',
      '9856789892',
      '8767896789',
      '9899965678'
    ];

    const result = day9.part1(input);
    expect(result).toBe(15);
  });

  it('should correctly calculate 1134 as the product of the three largest basinsq', () => {
    const input = [
      '2199943210',
      '3987894921',
      '9856789892',
      '8767896789',
      '9899965678'
    ];

    const result = day9.part2(input);
    expect(result).toBe(1134);
  });

  it('should correctly parse the height map', () => {
    const input = ['219994', '398789', '985678'];

    const result = parseHeightmap(input);
    expect(result).toStrictEqual([
      [
        { height: 2, x: 0, y: 0 },
        { height: 1, x: 1, y: 0 },
        { height: 9, x: 2, y: 0 },
        { height: 9, x: 3, y: 0 },
        { height: 9, x: 4, y: 0 },
        { height: 4, x: 5, y: 0 }
      ],
      [
        { height: 3, x: 0, y: 1 },
        { height: 9, x: 1, y: 1 },
        { height: 8, x: 2, y: 1 },
        { height: 7, x: 3, y: 1 },
        { height: 8, x: 4, y: 1 },
        { height: 9, x: 5, y: 1 }
      ],
      [
        { height: 9, x: 0, y: 2 },
        { height: 8, x: 1, y: 2 },
        { height: 5, x: 2, y: 2 },
        { height: 6, x: 3, y: 2 },
        { height: 7, x: 4, y: 2 },
        { height: 8, x: 5, y: 2 }
      ]
    ]);
  });

  it('should correctly calculate adjacent points', () => {
    const input = parseHeightmap([
      '2199943210',
      '3987894921',
      '9856789892',
      '8767896789',
      '9899965678'
    ]);

    const result = getAdjacentPoints(input, { x: 4, y: 2, height: 7 });
    expect(result).toStrictEqual([
      { height: 6, x: 3, y: 2 },
      { height: 8, x: 5, y: 2 },
      { height: 8, x: 4, y: 1 },
      { height: 8, x: 4, y: 3 }
    ]);
  });

  it('should correctly calculate the low points', () => {
    const input = parseHeightmap([
      '2199943210',
      '3987894921',
      '9856789892',
      '8767896789',
      '9899965678'
    ]);

    const result = calculateLowPoints(input);
    expect(result).toStrictEqual([
      { height: 1, x: 1, y: 0 },
      { height: 0, x: 9, y: 0 },
      { height: 5, x: 2, y: 2 },
      { height: 5, x: 6, y: 4 }
    ]);
  });
});

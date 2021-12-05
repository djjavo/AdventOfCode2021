import day5, {
  generateInitialVentLineMap,
  parseInputLines,
  plotHorizontalVerticalVentLines
} from '.';

describe('Day 5', () => {
  it('should correctly parse the input', () => {
    const input = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2'
    ];
    const result = parseInputLines(input);
    expect(result).toStrictEqual([
      { end: { x: 5, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 0, y: 8 }, start: { x: 8, y: 0 } },
      { end: { x: 3, y: 4 }, start: { x: 9, y: 4 } },
      { end: { x: 2, y: 1 }, start: { x: 2, y: 2 } },
      { end: { x: 7, y: 4 }, start: { x: 7, y: 0 } },
      { end: { x: 2, y: 0 }, start: { x: 6, y: 4 } },
      { end: { x: 2, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 1, y: 4 }, start: { x: 3, y: 4 } },
      { end: { x: 8, y: 8 }, start: { x: 0, y: 0 } },
      { end: { x: 8, y: 2 }, start: { x: 5, y: 5 } }
    ]);
  });

  it('should correctly generate a initial vent line map', () => {
    const parsedInput = [
      { end: { x: 5, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 3, y: 4 }, start: { x: 9, y: 4 } },
      { end: { x: 2, y: 1 }, start: { x: 2, y: 2 } },
      { end: { x: 7, y: 4 }, start: { x: 7, y: 0 } },
      { end: { x: 2, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 1, y: 4 }, start: { x: 3, y: 4 } }
    ];

    const result = generateInitialVentLineMap(parsedInput);

    expect(result).toStrictEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  });

  it('should correctly generate a filled vent line map', () => {
    const parsedInput = [
      { end: { x: 5, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 3, y: 4 }, start: { x: 9, y: 4 } },
      { end: { x: 2, y: 1 }, start: { x: 2, y: 2 } },
      { end: { x: 7, y: 4 }, start: { x: 7, y: 0 } },
      { end: { x: 2, y: 9 }, start: { x: 0, y: 9 } },
      { end: { x: 1, y: 4 }, start: { x: 3, y: 4 } }
    ];
    const result = plotHorizontalVerticalVentLines(
      generateInitialVentLineMap(parsedInput),
      parsedInput
    );
    expect(result).toStrictEqual([
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 1, 1, 1, 0, 0, 0, 0]
    ]);
  });

  it('should correctly find 5 overlapping vent lines not considering diagonals', () => {
    const input = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2'
    ];
    const result = day5.part1(input);
    expect(result).toBe(5);
  });

  it('should correctly find 12 overlapping vent lines when considering diagonals', () => {
    const input = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2'
    ];
    const result = day5.part2(input);
    expect(result).toBe(12);
  });
});

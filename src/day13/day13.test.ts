import day13, { foldHalfLeftwards, foldHalfUpwards, parseInput } from '.';

describe('Day 13', () => {
  it('should correctly parse the input', () => {
    const input = [
      '6,10',
      '0,14',
      '9,10',
      '0,3',
      '10,4',
      '4,11',
      '6,0',
      '6,12',
      '4,1',
      '0,13',
      '10,12',
      '3,4',
      '3,0',
      '8,4',
      '1,10',
      '2,14',
      '8,10',
      '9,0',
      '',
      'fold along y=7',
      'fold along x=5'
    ];

    const result = parseInput(input);
    expect(result).toStrictEqual({
      dots: [
        [6, 10],
        [0, 14],
        [9, 10],
        [0, 3],
        [10, 4],
        [4, 11],
        [6, 0],
        [6, 12],
        [4, 1],
        [0, 13],
        [10, 12],
        [3, 4],
        [3, 0],
        [8, 4],
        [1, 10],
        [2, 14],
        [8, 10],
        [9, 0]
      ],
      instructions: ['y=7', 'x=5']
    });
  });

  it('should correctly fold half upwards', () => {
    const input = [
      [6, 10],
      [0, 14],
      [9, 10],
      [0, 3],
      [10, 4],
      [4, 11],
      [6, 0],
      [6, 12],
      [4, 1],
      [0, 13],
      [10, 12],
      [3, 4],
      [3, 0],
      [8, 4],
      [1, 10],
      [2, 14],
      [8, 10],
      [9, 0]
    ];

    const result = foldHalfUpwards(input, 7);
    expect(result).toStrictEqual([
      [6, 4],
      [0, 0],
      [9, 4],
      [0, 3],
      [10, 4],
      [4, 3],
      [6, 0],
      [6, 2],
      [4, 1],
      [0, 1],
      [10, 2],
      [3, 4],
      [3, 0],
      [8, 4],
      [1, 4],
      [2, 0],
      [8, 4],
      [9, 0]
    ]);
  });

  it('should correctly fold half leftwards', () => {
    const input = [
      [6, 4],
      [0, 0],
      [9, 4],
      [0, 3],
      [10, 4],
      [4, 3],
      [6, 0],
      [6, 2],
      [4, 1],
      [0, 1],
      [10, 2],
      [3, 4],
      [3, 0],
      [8, 4],
      [1, 4],
      [2, 0],
      [8, 4],
      [9, 0]
    ];

    const result = foldHalfLeftwards(input, 5);
    expect(result).toStrictEqual([
      [4, 4],
      [0, 0],
      [1, 4],
      [0, 3],
      [0, 4],
      [4, 3],
      [4, 0],
      [4, 2],
      [4, 1],
      [0, 1],
      [0, 2],
      [3, 4],
      [3, 0],
      [2, 4],
      [1, 4],
      [2, 0],
      [2, 4],
      [1, 0]
    ]);
  });
});

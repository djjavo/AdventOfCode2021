import day15 from '.';

describe('Day 15', () => {
  it('should correctly calculate the total risk of the shortest path as 40', () => {
    const input = [
      '1163751742',
      '1381373672',
      '2136511328',
      '3694931569',
      '7463417111',
      '1319128137',
      '1359912421',
      '3125421639',
      '1293138521',
      '2311944581'
    ];

    const result = day15.part1(input);
    expect(result).toBe(40);
  });

  it('should correctly calculate the total risk of the shortest path as 315 when using the expanded map', () => {
    const input = [
      '1163751742',
      '1381373672',
      '2136511328',
      '3694931569',
      '7463417111',
      '1319128137',
      '1359912421',
      '3125421639',
      '1293138521',
      '2311944581'
    ];

    const result = day15.part2(input);
    expect(result).toBe(315);
  });
});

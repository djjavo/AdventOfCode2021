import day11, {
  findAdjacentOctopuses,
  findFlashingOctopuses,
  increaseEnergyLevel,
  modelStep
} from '.';

describe('Day 11', () => {
  it('should correctly count 1656 flashes after 100 steps', () => {
    const input = [
      '5483143223',
      '2745854711',
      '5264556173',
      '6141336146',
      '6357385478',
      '4167524645',
      '2176841721',
      '6882881134',
      '4846848554',
      '5283751526'
    ];

    const result = day11.part1(input);
    expect(result).toBe(1656);
  });

  it('should correctly count 195 steps required for syncronisation', () => {
    const input = [
      '5483143223',
      '2745854711',
      '5264556173',
      '6141336146',
      '6357385478',
      '4167524645',
      '2176841721',
      '6882881134',
      '4846848554',
      '5283751526'
    ];

    const result = day11.part2(input);
    expect(result).toBe(195);
  });

  it('should correctly increase the energy level by 1', () => {
    const input = [
      [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
      [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
      [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
      [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
      [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
      [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
      [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
      [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
      [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
      [5, 2, 8, 3, 7, 5, 1, 5, 2, 6]
    ];

    const result = increaseEnergyLevel(input);
    expect(result).toStrictEqual([
      [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
      [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
      [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
      [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
      [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
      [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
      [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
      [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
      [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
      [6, 3, 9, 4, 8, 6, 2, 6, 3, 7]
    ]);
  });

  it('should correctly find the flashing octopuses', () => {
    const input = [
      [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
      [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
      [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
      [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
      [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
      [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
      [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
      [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
      [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
      [6, 3, 9, 4, 8, 6, 2, 6, 3, 7]
    ];

    const result = findFlashingOctopuses(increaseEnergyLevel(input));
    expect(result).toStrictEqual([
      [0, 2],
      [1, 4],
      [4, 5],
      [4, 9],
      [6, 4],
      [7, 1],
      [7, 2],
      [7, 4],
      [7, 5],
      [8, 1],
      [8, 4],
      [8, 6],
      [9, 2]
    ]);
  });

  it('should correctly detirmine adjacent octopuses of the flashing ones', () => {
    const input = [
      [2, 1, 9],
      [1, 8, 3],
      [8, 2, 1]
    ];

    const incrementedInput = increaseEnergyLevel(input);

    const result = findAdjacentOctopuses(
      incrementedInput,
      findFlashingOctopuses(incrementedInput)
    );
    expect(result).toStrictEqual([
      [0, 1],
      [1, 2],
      [1, 1]
    ]);
  });

  it('should correctly model a single step, providing the number of flashing and the updated energy levels', () => {
    const input = [
      [2, 1, 9],
      [1, 8, 3],
      [8, 2, 1]
    ];

    const result = modelStep(input);
    expect(result).toStrictEqual({
      flashes: 3,
      resetInput: [
        [4, 4, 0],
        [4, 0, 6],
        [0, 5, 3]
      ]
    });
  });
});

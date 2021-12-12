import day12 from '.';

describe('Day 12', () => {
  it('should correctly count 10 paths through the cave system', () => {
    const input = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];

    const result = day12.part1(input);
    expect(result).toBe(10);
  });

  it('should correctly count 19 paths through the cave system', () => {
    const input = [
      'dc-end',
      'HN-start',
      'start-kj',
      'dc-start',
      'dc-HN',
      'LN-dc',
      'HN-end',
      'kj-sa',
      'kj-HN',
      'kj-dc'
    ];

    const result = day12.part1(input);
    expect(result).toBe(19);
  });

  it('should correctly count 226 paths through the cave system', () => {
    const input = [
      'fs-end',
      'he-DX',
      'fs-he',
      'start-DX',
      'pj-DX',
      'end-zg',
      'zg-sl',
      'zg-pj',
      'pj-he',
      'RW-he',
      'fs-DX',
      'pj-RW',
      'zg-RW',
      'start-pj',
      'he-WI',
      'zg-he',
      'pj-fs',
      'start-RW'
    ];

    const result = day12.part1(input);
    expect(result).toBe(226);
  });

  it('should correctly count 36 paths through the cave system when you can visit a single small cave twice', () => {
    const input = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];

    const result = day12.part2(input);
    expect(result).toBe(36);
  });
});

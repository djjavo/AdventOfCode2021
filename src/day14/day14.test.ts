import day14 from '.';

describe('Day 14', () => {
  it('should correctly calculate the range of element occurences in the polymer after 10 steps', () => {
    const input = [
      'NNCB',
      '',
      'CH -> B',
      'HH -> N',
      'CB -> H',
      'NH -> C',
      'HB -> C',
      'HC -> B',
      'HN -> C',
      'NN -> C',
      'BH -> H',
      'NC -> B',
      'NB -> B',
      'BN -> B',
      'BB -> N',
      'BC -> B',
      'CC -> N',
      'CN -> C'
    ];

    const result = day14.part1(input);
    expect(result).toBe(1588);
  });

  it('should correctly calculate the range of element occurences in the polymer after 40 steps', () => {
    const input = [
      'NNCB',
      '',
      'CH -> B',
      'HH -> N',
      'CB -> H',
      'NH -> C',
      'HB -> C',
      'HC -> B',
      'HN -> C',
      'NN -> C',
      'BH -> H',
      'NC -> B',
      'NB -> B',
      'BN -> B',
      'BB -> N',
      'BC -> B',
      'CC -> N',
      'CN -> C'
    ];

    const result = day14.part2(input);
    expect(result).toBe(2188189693529);
  });
});

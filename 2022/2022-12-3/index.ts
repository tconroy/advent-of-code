const inputData = await Deno.readTextFile('./input.txt');

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const priorities: Record<string, number> = alpha.split('').reduce((accum, curr, i) => {
  accum[curr] = i + 1;

  return accum;  
}, {} as Record<string, number>);

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .split('')
  .reduce((accum, char, i) => {
    accum[char] = i + 1;
    return accum;
  }, {}
);

const split = (str: string): [Array<string>, Array<string>] => {
  const half = Math.ceil(str.length / 2);    
  const firstHalf = str.slice(0, half);
  const secondHalf = str.slice(half);

  return [firstHalf.split(''), secondHalf.split('')];
}

const splitInto = (arr: Array<string>, count: number): Array<Array<string>> => {
  const out: Array<Array<string>> = [];

  for (let i = 0; i < arr.length; i += count) {
    const chunk = arr.slice(i, i + count);
    out.push(chunk);
  }

  return out;
};

const dedupe = (arr: Array<any>) => [...new Set(arr)];

const getCommonItems = (arr1: Array<string>, arr2: Array<string>) => {
  const commonMap: Record<string, true> = {};
  const deduped1 = dedupe(arr1);
  const deduped2 = dedupe(arr2);

  deduped1.forEach((char) => {
    if (!commonMap[char] && deduped2.includes(char)) {
      commonMap[char] = true;
    }
  });

  return Object.keys(commonMap);
};

const getBadge = (group) => {
  const d1 = dedupe(group[0])
  const d2 = dedupe(group[1])
  const d3 = dedupe(group[2])

  const commonMap: Record<string, number> = {};
  [...d1, ...d2, ...d3].forEach((char) => {
    commonMap[char] = ((commonMap[char] ?? 0) + 1);
  });
  console.log(commonMap);
  const common = Object.keys(commonMap).sort((a, b) => commonMap[b] - commonMap[a])[0];
  console.log('common: ', common);
  return common;
};

function part1(input: string) {
  const rucksacks = input.trim().split('\n');
  let sumPriorities = 0;

  rucksacks.forEach((rucksack) => {
    const [firstHalf, secondHalf] = split(rucksack);

    const commonItems = getCommonItems(firstHalf, secondHalf);

    sumPriorities += commonItems.reduce((sum, item) => {
      return sum + priorities[item];
    }, 0);
  });

  console.log('part 1: ', sumPriorities);
}

function part2(input: string) {
  const rucksacks = input.trim().split('\n');
  const groups = splitInto(rucksacks, 3);
  let sumPriorities = 0;

  groups.forEach((grouping) => {
    const badge = getBadge(grouping);
    sumPriorities += priorities[badge];
  });

  console.log('part 2: ', sumPriorities);
}

part1(inputData);
part2(inputData);


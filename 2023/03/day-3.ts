const data = (await (Deno.readTextFile('./day-3.txt'))).trim();
const symbols: Readonly<string[]> = ['!','@','#','$','%','^','&','*','(',')','_','+','\\','-','=','[',']','{','}',';',':','|',',','<','>','/','?','~'];
const lines = data.split('\n');
const numsRegex = new RegExp('(\\d+)', 'g');

const isAdjacentToSomeSymbol = (
  line: string | undefined,
  lineIndex: number,
  num: number,
  startBounds: number,
  endBounds: number
) => {
  if (line) {
    const possibleSymbolStr = line.substring(startBounds, endBounds);
    const hasGearMatch = possibleSymbolStr.includes('*');

    if (!hasGearMatch) {
      return symbols.some(symbol => possibleSymbolStr.includes(symbol));
    }

    const gearIndex = line.indexOf('*', startBounds);
    const key = `${lineIndex}|${gearIndex}`;
    console.log(key);
    return [key, num];
  }
};

function getNumsAdjacentToSymbols() {
  const numsAdjacentToSymbols: number[] = [];
  // 'lineNum|indexNum'
  const gearAdjacencyMap: Record<string, Array<number>> = {};

  lines.forEach((line, j, lineArr) => {
    const prevLine: string | undefined = lineArr[j - 1];
    const nextLine: string | undefined = lineArr[j + 1];
    const matches = [...line.matchAll(numsRegex)].filter(m => !!m);

    // for each number,
    matches.forEach(match => {
      const startIdx = match.index!;
      const startBounds = Math.max(0, startIdx - 1);
      const endIdx = startIdx + match[0].length;
      const endBounds = Math.min(line.length, endIdx + 1);
      const number = parseInt(match[0], 10);

      const hasAdjacentSymbol = (
        isAdjacentToSomeSymbol(line, j, number, startBounds, endBounds)
        || isAdjacentToSomeSymbol(prevLine, j-1, number, startBounds, endBounds)
        || isAdjacentToSomeSymbol(nextLine, j+1, number, startBounds, endBounds)
      );

      if (hasAdjacentSymbol) {
        numsAdjacentToSymbols.push(number);

        if (typeof hasAdjacentSymbol !== 'boolean') {
          gearAdjacencyMap[hasAdjacentSymbol[0]] = gearAdjacencyMap[hasAdjacentSymbol[0]] || [];
          gearAdjacencyMap[hasAdjacentSymbol[0]].push(number);
        }
      }
    });
  });

  return { numsAdjacentToSymbols, gearAdjacencyMap };
}

function sum(arr: Array<number>) {
  return arr.reduce((partialSum, num) => partialSum + num, 0);
}

function multiply(arr: Array<number>) {
  return arr.reduce((accum, num) => accum * num, 1);
}

// A gear is any * symbol that is adjacent to exactly two part numbers. 
// Its gear ratio is the result of multiplying those two numbers together.
function getGearRatios(gearAdjacencyMap: Record<string, number[]>) {
  return Object.entries(gearAdjacencyMap).filter(([_, nums]) => nums.length === 2).map(([_key, numbers]) => {
    return multiply(numbers);
  });
}

function main() {
  const numsAdjacentToSymbols = getNumsAdjacentToSymbols();
  console.log(numsAdjacentToSymbols.gearAdjacencyMap);
  console.log({
    // expected: 553079
    part1: sum(numsAdjacentToSymbols.numsAdjacentToSymbols),
    // expected: 84363105
    part2: sum(getGearRatios(numsAdjacentToSymbols.gearAdjacencyMap)),
  });
}

main();

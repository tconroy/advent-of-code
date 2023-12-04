const data = (await (Deno.readTextFile('./day-4.txt'))).trim();
const lines = data.split('\n');
const numsRegex = new RegExp('(\\d+)', 'g');

type WinningObj = Record<string, { winningNumbers: Array<number>, myNumbers: Array<number>, myWinningNumbers: Array<number> }>;

function sumPoints(obj: WinningObj) {
  function doubleNumberNTimes(num: number, N: number) {
    for (let i = 0; i < N; i++) {
        num *= 2;
    }
    return num;
  }

  return Object.entries(obj).reduce((partialSum, [gameName, entry]) => {
    if (entry.myWinningNumbers.length) {
      const increment = doubleNumberNTimes(1, entry.myWinningNumbers.length - 1);
      return partialSum + increment;
    }

    return partialSum;
  }, 0);
}

function getWininngNumbers() {
  const cardNameRegex = new RegExp(/Card\s*\d+:\s*/);
  const obj: WinningObj = {};

  lines.forEach(line => {
    const cardName = cardNameRegex.exec(line)?.[0].trim();
    if (!cardName) {
      throw new Error('card name not extracted!');
    }
    const [winningNumbers, myNumbers] = line.substring(cardName.length)
      .split('|')
      .map(s => s.trim())
      .map(s => {
        return s.split(' ').filter(v => !!v).map(n => {
          const num = parseInt(n.trim(), 10);
          if (Number.isNaN(num)) {
            console.warn('failed on ', n);
          }
          return num;
        });
      });

    const myWinningNumbers = myNumbers.filter(n => winningNumbers.includes(n));
    
    obj[cardName] = { winningNumbers, myNumbers, myWinningNumbers, };
  });

  return obj;
}

function main() {
  console.log({
    // expected: 
    part1: sumPoints(getWininngNumbers())
    // expected: 
    // part2: '',
  });
}

main();

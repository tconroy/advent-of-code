const data = (await (Deno.readTextFile('./day-4.txt'))).trim();
const lines = data.split('\n');

type WinningObj = Record<string, { winningNumbers: Array<number>, myNumbers: Array<number>, myWinningNumbers: Array<number> }>;

function doubleNumberNTimes(num: number, N: number) {
  for (let i = 0; i < N; i++) {
      num *= 2;
  }
  return num;
}

function sumPoints(obj: WinningObj) {
  return Object.entries(obj).reduce((partialSum, [_gameName, entry]) => {
    if (entry.myWinningNumbers.length) {
      const increment = doubleNumberNTimes(1, entry.myWinningNumbers.length - 1);
      return partialSum + increment;
    }

    return partialSum;
  }, 0);
}

function sumCards(obj: WinningObj) {
  const cardInstances = new Array(Object.entries(obj).length).fill(1);

  Object.entries(obj).forEach(([_cardName, cardObj], j) => {
    const matchCount = cardObj.myWinningNumbers.length;

    if (matchCount) {
      for (let i = j + 1; i <= j + matchCount; i++) {
        cardInstances[i] += cardInstances[j];
      }
    }
  });

  return cardInstances.reduce((acc, v) => acc + v, 0);
}

function getWininngNumbers(obj: WinningObj = {}) {
  const cardNameRegex = new RegExp(/Card\s*\d+:\s*/);

  lines.forEach((line) => {
    const cardName = cardNameRegex.exec(line)?.[0].trim();
    if (!cardName) throw new Error('card name not extracted!');

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

    obj[cardName] = {
      winningNumbers,
      myNumbers,
      myWinningNumbers: myNumbers.filter(n => winningNumbers.includes(n)),
    };
  });

  return obj;
}

function main() {
  const winningNumbers = getWininngNumbers();
  console.log({
    // expected: 26218
    part1: sumPoints(winningNumbers),
    // expected: 9997537
    part2: sumCards(winningNumbers),
  });
}

main();

const data = await Deno.readTextFile('./day-2-p1-sample-data.txt');

type ColorSet = {
  red?: number;
  green?: number;
  blue?: number;
};

function toRGB(str: string): ColorSet {
  const pairs = str.split(', ');
  const obj: Record<string, number> = {};

  pairs.forEach(pair => {
    const [quantity, color] = pair.split(' ');
    obj[color] = parseInt(quantity, 10);
  });

  return obj;
}

function getSetsOfCubes(line: string): { gameId: number; sets: Array<ColorSet> } {
  const game = line.substring(0, line.indexOf(': '));
  const gameId = parseInt(game.substring(4).trim(), 10);
  const sets = line.substring(game.length + 1)
    .split(';')
    .map(s => toRGB(s.trim()));

  return {
    gameId,
    sets,
  };
}

function isPossibleGame(rules: ColorSet, sets: Array<ColorSet>): boolean {
  let tally = { red: 0, blue: 0, green: 0, ...rules };

  // this resets the score between sets
  for (const set of sets) {
    for (const [color, value] of Object.entries(set)) {
      const c: 'red' | 'blue' | 'green' = color as keyof ColorSet;
      tally[c] -= value;

      if (tally[c] < 0) {
        return false;
      } else {
        tally = { red: 0, blue: 0, green: 0, ...rules };
      }
    }
  }

  return true;
}

function getGames() {
  return data.split('\n').filter(l => !!l).map(line => getSetsOfCubes(line));
}

function getPossibleGames(rules: { red: number; green: number; blue: number; }) {
  const summedIds = getGames().reduce((sum, { gameId, sets }) => {
    let increment = 0;

    if (isPossibleGame(rules, sets)) {
      increment = gameId;
    }

    return sum + increment;
  }, 0)

  return summedIds;
}

// what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
function getMinimumSetsPerGame() {
  return getGames().map(({ sets }) => {
    return sets.reduce((accum, { red, green, blue }) => {
      if (red && red > accum.red!) accum.red = red;
      if (green && green > accum.green!) accum.green = green;
      if (blue && blue > accum.blue!) accum.blue = blue;
      return accum;
    }, { red: 0, green: 0, blue: 0 });
  });
}

console.log({
  part1: getPossibleGames({ red: 12, green: 13, blue: 14 }),
  part2: getMinimumSetsPerGame().reduce((sum, set) => {
    const power = (set.red ?? 1) * (set.green ?? 1) * (set.blue ?? 1);
    return sum + power;
  }, 0),
});

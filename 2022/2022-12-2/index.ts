const inputData = await Deno.readTextFile('./input.txt');

enum Shape {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors'
}

const opponentMap = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
};

const selfMap = {
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS
};

const RPSMap = {
  // left beats right
  [Shape.ROCK]: Shape.SCISSORS,
  [Shape.SCISSORS]: Shape.PAPER,
  [Shape.PAPER]: Shape.ROCK,
};

const points: Record<Shape, number> = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
};

const invert = (obj: Record<any, any>) => Object.fromEntries(
  Object
    .entries(obj)
    .map(([key, value]) => [value, key])
  );

function getPoints(o: Shape, s: Shape): number {
  if (RPSMap[s] === o) {
    // win
    return points[s] + 6;
  } else if (RPSMap[o] === s) {
    // lose
    return points[s] + 0;
  } else {
    // draw
    return points[s] + 3;
  }
}

function getGameTuples(input: string): Array<[Shape, Shape]> {
  return input.trim().split('\n')
    .map((stringRow): [keyof typeof opponentMap, keyof typeof selfMap] => stringRow.split(' ') as [keyof typeof opponentMap, keyof typeof selfMap])
    .map(([opponent, self]) => [opponentMap[opponent], selfMap[self]]);
}

function part1(input: string) {
  // divide the input into tuples
  const games = getGameTuples(input);

  const totalScore = games.reduce((score, [o, s]) => {
    return score + getPoints(o, s);
  }, 0);

  console.log('total score: ', totalScore);
}

// 2nd column = how round needs to end:
// X = self lose
// Y = draw
// Z = self win 
const getBeats = (shapeToBeat: string) => {
  return invert(RPSMap)[shapeToBeat]!;
};


function part2(input: string) {
  // divide the input into tuples
  const games = getGameTuples(input);
  const outcomeMap = {
    X: 'LOSE',
    Y: 'DRAW',
    Z: 'WIN'
  };

  const totalScore = games.reduce((score, [o, s]) => {
    const outcome: undefined | keyof typeof outcomeMap = Object.entries(selfMap)
      .find(([_, shape]) => shape === s)?.[0] as undefined | keyof typeof outcomeMap;
    if (!outcome) throw new Error('whoops');

    switch (outcomeMap[outcome]) {
      case 'WIN': return score + getPoints(o, getBeats(o))
      case 'LOSE': return score + getPoints(o, RPSMap[o])
      case 'DRAW': return score + getPoints(o, o)
    }

    return score;
  }, 0);

  console.log('total score: ', totalScore);
}

part1(inputData);
part2(inputData);


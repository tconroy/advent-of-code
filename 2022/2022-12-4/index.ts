const inputData = await Deno.readTextFile('./input.txt');

const split = (val: string) => val.split('-').map((char: string) => parseInt(char, 10));

const isFullyOverlapped = (assignmentA: string, assignmentB: string): boolean => {
  const [aStart, aEnd] = split(assignmentA);
  const [bStart, bEnd] = split(assignmentB);

  return (aStart >= bStart && aEnd <= bEnd) || (bStart >= aStart && bEnd <= aEnd);
};

const hasAnyOverlap = (assignmentA: string, assignmentB: string): boolean => {
  const [aStart, aEnd] = split(assignmentA);
  const [bStart, bEnd] = split(assignmentB);

  return (aStart <= bEnd && aEnd >= bStart) || (bStart <= aEnd && bEnd >= aStart);
};

// In how many assignment pairs does one range fully contain the other?
function part1(input: string) {
  const assignmentPairs = input.trim().split('\n');
  let numFullyContained = 0;
  
  assignmentPairs.forEach((pair: string) => {
    const [assignmentA, assignmentB] = pair.split(',');

    if (isFullyOverlapped(assignmentA, assignmentB)) {
      numFullyContained += 1;
    }
  });

  console.log('part 1: ', numFullyContained);
}

function part2(input: string) {
  const assignmentPairs = input.trim().split('\n');
  let numAnyOverlap = 0;
  
  assignmentPairs.forEach((pair: string) => {
    const [assignmentA, assignmentB] = pair.split(',');

    if (hasAnyOverlap(assignmentA, assignmentB)) {
      numAnyOverlap += 1;
    }
  });

  console.log('part 1: ', numAnyOverlap);
}

part1(inputData);
part2(inputData);


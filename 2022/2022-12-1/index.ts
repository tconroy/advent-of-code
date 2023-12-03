const inputData = await Deno.readTextFile('./input.txt');

function getSummedArrayFromString(input: string) {
  return input.split('\n').reduce<Array<Array<number>>>((accum, val) => {
    if (val === '') {
      accum.push([]);
    } else {
      const parsedInt = parseInt(val, 10);
      accum[accum.length - 1].push(parsedInt);
    }

    return accum;
  }, [[]]).flatMap((a) => a.reduce((accum: number, val: number) => accum + val, 0));
}

function part1(input: string) {
  // reduce into array of single values
  const arr = getSummedArrayFromString(input).sort((a, b) => a - b);
  
  // find largest value in array
  const largestValue = arr[arr.length - 1];

  // return index
  console.log('Part 1: ', largestValue);
}

function part2(input: string) {
    // reduce into array of single values
    const arr = getSummedArrayFromString(input)
      .sort((a, b) => a - b);

    const sliced = arr.slice(arr.length - 3, arr.length);

  // return sum  
  const sum = sliced.reduce((total, curr) => total + curr, 0);
  console.log('Part 2: ', sum);
}

part1(inputData);
part2(inputData);



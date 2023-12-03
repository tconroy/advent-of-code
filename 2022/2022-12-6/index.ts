const inputData = await Deno.readTextFile('./input.txt');

function run() {
  let example = 
`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`
  parseInput(example);
}

function parseInput(data) {
  let s = new Set();
  let i = 0;
  let charsToCount = 14;
  for (i = 0; i < data.length; i++) {
      s = new Set()
      for (let j = 0; j < charsToCount; j++) {
          s.add(data[i+j]);
      }
      if (s.size === charsToCount) {
          break
      }
  }

  return i+charsToCount;
}

function part1() {
  let done;
  [...inputData.trim()].forEach((x, i) => { 
  const data = inputData.trim().slice(i -3, i) + x 
  var unique = [...data].filter((v, i, s) => s.indexOf(v) === i)

  if (unique.length == 4 && !done) {
    done = i+1 
    console.log(done,"points")}})
    console.log(parseInput(inputData));
  }

// function part2() {}

part1();
// part2();

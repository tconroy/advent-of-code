const file = await Deno.readTextFile('./part1_exampledata.txt');

function getCalibrationValue(line: string) {
  const charToInt = (char: string) => Number.parseInt(char, 10);
  const charArr = Array.from(line);
  const firstNumChar = charArr.find(char => Number.isInteger(charToInt(char))) ?? '0';
  const lastNumChar = charArr.findLast(char => Number.isInteger(charToInt(char))) ?? '0';

  return parseInt(`${firstNumChar}${lastNumChar}`);
}

function main() {
  return file.split('\n').reduce((sum, line) => {
    const val = getCalibrationValue(line);
    console.log('val: ', val);
    return sum + val;
  }, 0);
}

console.log(main());

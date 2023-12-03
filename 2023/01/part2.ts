const file = await Deno.readTextFile('./part2_exampledata.txt');
const lines = file.split('\n');

let part2 = 0;
let part1 = 0;

const wordNumberMap: Record<string, string> = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine"
}
 
function getFirstAndLastNumbers(line) {
    const numbers = line.match(/\d/g)
    return parseInt(`${parseInt(numbers[0], 10)}${parseInt(numbers[numbers.length - 1], 10)}`);
}

function replaceAllWordsWithNumbers(line) {
    for (const num in wordNumberMap) {
        line = line.replaceAll(num, wordNumberMap[num])
    }

    return line;
}

lines.map((line) => {
    part1 += getFirstAndLastNumbers(line)
    part2 += getFirstAndLastNumbers(replaceAllWordsWithNumbers(line))
});

console.log({
    part1,
    part2,
});

import * as fs from 'fs/promises';

export const parseInput = (fileContent: string): number[] => {
  const lines = fileContent.split('\n');

  return lines.map((numAsStr) => parseInt(numAsStr, 10)).filter((num) => !isNaN(num));
};

export async function solve(filePath: string, part: 1 | 2): Promise<number> {
  const fileContentAsBuffer = await fs.readFile(filePath);
  const fileContentAsString = fileContentAsBuffer.toString();

  const parsedContent = parseInput(fileContentAsString);

  switch (part) {
    case 1:
      // The answer for the input is 1502
      return solvePart1(parsedContent);
    case 2:
      // The answer for the input is 1538
      return solvePart2(parsedContent);
  }
}

// How many measurements are larger than the previous measurement?
export function solvePart1(numbers: number[]): number {
  return numbers.reduce((total, num, index) => {
    if (index === 0 || numbers[index - 1] >= num) {
      return total;
    }

    return total + 1;
  }, 0);
}

// How many measurements are larger than the previous measurement?
export function solvePart2(numbers: number[]): number {
  let counter = 0;

  for (let i = 0; i < numbers.length - 3; i++) {
    if (numbers[i] < numbers[i + 3]) {
      counter++;
    }
  }

  return counter;
}

import * as fs from 'fs/promises';

export enum DirectionType {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
  AIM = 'aim',
}

export type ParsedInput = [type: DirectionType, value: number][];

export const parseInput = (fileContent: string): ParsedInput => {
  const lines = fileContent.split('\n');

  return (
    lines
      .map((l) => {
        const [direction, value] = l.split(' ');

        return [direction as DirectionType, parseInt(value, 10)];
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => !isNaN(value as number)) as ParsedInput
  );
};

export async function solve(filePath: string, part: 1 | 2): Promise<number> {
  const fileContentAsBuffer = await fs.readFile(filePath);
  const fileContentAsString = fileContentAsBuffer.toString();

  const parsedContent = parseInput(fileContentAsString);

  switch (part) {
    case 1:
      // The answer for the input is 2,272,262
      return solvePart1(parsedContent);
    case 2:
      // The answer for the input is 2,134,882,034
      return solvePart2(parsedContent);
  }
}

export function solvePart1(parsedInput: ParsedInput): number {
  const result = {
    [DirectionType.FORWARD]: 0,
    [DirectionType.UP]: 0,
    [DirectionType.DOWN]: 0,
  };

  parsedInput.forEach(([direction, value]) => (result[direction] += value));

  return result[DirectionType.FORWARD] * (result[DirectionType.DOWN] - result[DirectionType.UP]);
}

export function solvePart2(parsedInput: ParsedInput): number {
  const result = {
    depth: 0,
    horizontalPosition: 0,
    aim: 0,
  };

  parsedInput.forEach(([direction, value]) => {
    switch (direction) {
      case DirectionType.DOWN:
        // - "down" X **increases** your aim by X units.
        result.aim += value;
        break;

      case DirectionType.UP:
        // - "up" X **decreases** your aim by X units.
        result.aim -= value;
        break;

      case DirectionType.FORWARD:
        // - "forward" X does two things:
        //   - It increases your horizontal position by X units.
        //   - It increases your depth by your aim multiplied by X.
        result.horizontalPosition += value;
        result.depth += result.aim * value;
        break;
    }
  });

  return result.horizontalPosition * result.depth;
}

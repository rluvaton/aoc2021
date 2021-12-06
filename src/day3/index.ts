import * as fs from 'fs/promises';

/**
 * Each number is a bit and each row makes the number in binary
 */
export type ParsedInput = number[][];

export const parseInput = (fileContent: string): ParsedInput => {
  const lines = fileContent.split('\n').filter((l) => l.trim() !== '');

  return lines.map((l) => l.split('').map((c) => parseInt(c, 10)));
};

export async function solve(filePath: string, part: 1 | 2): Promise<number> {
  const fileContentAsBuffer = await fs.readFile(filePath);
  const fileContentAsString = fileContentAsBuffer.toString();

  const parsedContent = parseInput(fileContentAsString);

  switch (part) {
    case 1:
      // The answer for the input is 3,320,834
      return solvePart1(parsedContent);
    case 2:
      // The answer for the input is 4,481,199
      return solvePart2(parsedContent);
  }
}

export function solvePart1(parsedInput: ParsedInput): number {
  const numberOfBitsInNumber = parsedInput[0].length;

  const countArr = Array.from({ length: numberOfBitsInNumber }, () => [0, 0]);

  for (let bitIndex = 0; bitIndex < numberOfBitsInNumber; bitIndex++) {
    for (let numberIndex = 0; numberIndex < parsedInput.length; numberIndex++) {
      const bit = parsedInput[numberIndex][bitIndex];
      countArr[bitIndex][bit]++;
    }
  }

  const { gamma: gammaBinStr, eps: epsBinStr } = countArr.reduce(
    (gammaAndEps, [bit0, bit1]) => {
      // Can do if else bit it make this fn too long
      gammaAndEps.gamma += bit0 > bit1 ? '0' : '1';
      gammaAndEps.eps += bit0 > bit1 ? '1' : '0';

      return gammaAndEps;
    },
    { gamma: '', eps: '' },
  );

  const gamma = parseInt(gammaBinStr, 2);
  const eps = parseInt(epsBinStr, 2);

  return gamma * eps;
}

// --------------- Part 2 ---------------
type NextNode = Node | number;

interface Node {
  0?: NextNode;
  1?: NextNode;
  count?: number;
}

/**
 * Create object that each key is a bit and the depth is the position of that bit, the value of the last bit is the total number,
 * along that key there is a count property saying how many numbers having the same sequence
 * e.g. the value of object[0][1][1].count will equal the number of numbers that start with 011
 *
 * Consider it a tree that the path to a leaf is a number in the input
 */
function createTreeFromInput(parsedInput: ParsedInput): Node {
  return parsedInput.reduce((tree, bitsInSingleNumber) => {
    let treeInstance = tree;

    const numberSize = bitsInSingleNumber.length - 1;

    // Adding the nodes to the tree until the last one
    for (let bitIndex = 0; bitIndex < numberSize; bitIndex++) {
      const bit = bitsInSingleNumber[bitIndex];

      treeInstance[bit] = treeInstance[bit] || { count: 0 };
      treeInstance[bit].count++;
      treeInstance = treeInstance[bit];
    }

    // Setting the value of the last bit (leaf) to be the value of the number in decimal
    const lastBit = bitsInSingleNumber[numberSize];
    treeInstance[lastBit] = parseInt(bitsInSingleNumber.join(''), 2);

    return tree;
  }, {});
}

function travelTreeAndGetLeafValue(
  treeMaxDepth: number,
  node: Node,
  decideWhichNode: (node: Node) => NextNode,
): number {
  // The returned value must be a number as the tree have max depth of the number of bits in each input's line
  return new Array(treeMaxDepth).fill(0).reduce((node) => {
    if (node[0] === undefined) {
      return node[1];
    }

    if (node[1] === undefined) {
      return node[0];
    }

    return decideWhichNode(node);
  }, node) as number;
}

export function solvePart2(parsedInput: ParsedInput): number {
  const numTree = createTreeFromInput(parsedInput);

  const singleNumberLength = parsedInput[0].length;

  // The returned value must be a number as the tree have max depth of the number of bits in each input's line
  const ogr = travelTreeAndGetLeafValue(singleNumberLength, numTree, (node) => {
    // most common value or 1 if they equal
    if ((node[0] as Node).count > (node[1] as Node).count) {
      return node[0];
    }

    return node[1];
  });

  const co2 = travelTreeAndGetLeafValue(singleNumberLength, numTree, (node) => {
    // least common value or 0 if they equal
    if ((node[1] as Node).count >= (node[0] as Node).count) {
      return node[0];
    }

    return node[1];
  });

  return ogr * co2;
}

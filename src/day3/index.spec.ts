import { parseInput, solve, solvePart1, solvePart2 } from './';
import * as path from 'path';

describe('Day3', () => {
  describe('solveParts', () => {
    const exampleFileContent = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

    describe('solvePart1', () => {
      it('should return 198', () => {
        // Arrange
        const text = parseInput(exampleFileContent);

        // Act
        const result = solvePart1(text);

        // Assert
        expect(result).toEqual(198);
      });
    });

    describe('solvePart2', () => {
      it('should return 230', () => {
        // Arrange
        const text = parseInput(exampleFileContent);

        // Act
        const result = solvePart2(text);

        // Assert
        expect(result).toEqual(230);
      });
    });
  });

  describe('solve', () => {
    it('should solve the part 1 of the puzzle with the input', async () => {
      // Arrange
      const filePath = path.join(__dirname, './input.txt');

      // Act
      const result = await solve(filePath, 1);

      // Assert
      expect(result).not.toBeNaN();
      expect(typeof result).toEqual('number');

      console.log(result);
    });

    it('should solve the part 2 of the puzzle with the input', async () => {
      // Arrange
      const filePath = path.join(__dirname, './input.txt');

      // Act
      const result = await solve(filePath, 2);

      // Assert
      expect(result).not.toBeNaN();
      expect(typeof result).toEqual('number');

      console.log(result);
    });
  });
});

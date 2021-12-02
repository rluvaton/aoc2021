import { parseInput, solve, solvePart1, solvePart2 } from './';
import * as path from 'path';

describe('Day2', () => {
  describe('solveParts', () => {
    const exampleFileContent = `forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

    describe('solvePart1', () => {
      it('should return 150', () => {
        // Arrange
        const text = parseInput(exampleFileContent);

        // Act
        const result = solvePart1(text);

        // Assert
        expect(result).toEqual(150);
      });
    });

    describe('solvePart2', () => {
      it('should return 900', () => {
        // Arrange
        const text = parseInput(exampleFileContent);

        // Act
        const result = solvePart2(text);

        // Assert
        expect(result).toEqual(900);
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
      console.log(result);
    });

    it('should solve the part 2 of the puzzle with the input', async () => {
      // Arrange
      const filePath = path.join(__dirname, './input.txt');

      // Act
      const result = await solve(filePath, 2);

      // Assert
      console.log(result);
    });
  });
});

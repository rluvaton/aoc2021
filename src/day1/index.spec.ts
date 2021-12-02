import { parseInput, solve, solvePart1, solvePart2 } from './';
import * as path from 'path';

describe('Day1', () => {
  describe('solvePart1', () => {
    it('should return 7 measurements are larger than the previous measurement', () => {
      // Arrange
      const text = parseInput(`199
200
208
210
200
207
240
269
260
263`);

      // Act
      const numberOfLargerMeasurementsFromPrev = solvePart1(text);

      // Assert
      expect(numberOfLargerMeasurementsFromPrev).toEqual(7);
    });
  });

  describe('solvePart2', () => {
    it('should return 5 sums of a three-measurement sliding window are larger than the previous ones', () => {
      // Arrange
      const text = parseInput(`199
200
208
210
200
207
240
269
260
263`);

      // Act
      const result = solvePart2(text);

      // Assert
      expect(result).toEqual(5);
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

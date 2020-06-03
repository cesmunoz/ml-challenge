import {
  VALID_DNA_LETTERS,
  MAX_LENGTH_ARRAY,
  INCREASE,
  NO_INCREMENT,
  DECREASE,
  MUTANT_MIN_SEQ,
  MUTANT_AMOUNT_CHARACTERS,
} from '../constants';

const isValidLetter = letter => VALID_DNA_LETTERS.some(x => x === letter);

const analyzeRowRightSample = (fn, sample, letter, rowIndex, columnIndex) =>
  rowIndex + MAX_LENGTH_ARRAY < sample.length &&
  fn(sample, letter, rowIndex, columnIndex, INCREASE, NO_INCREMENT);

const analyzeRowLeftSample = (fn, sample, letter, rowIndex, columnIndex) =>
  rowIndex - MAX_LENGTH_ARRAY > 0 &&
  fn(sample, letter, rowIndex, columnIndex, DECREASE, NO_INCREMENT);

const analyzeColumnTopSample = (fn, sample, letter, rowIndex, columnIndex) =>
  columnIndex - MAX_LENGTH_ARRAY > 0 &&
  fn(sample, letter, rowIndex, columnIndex, NO_INCREMENT, DECREASE);

const analyzeColumnBottomSample = (fn, sample, letter, rowIndex, columnIndex) =>
  columnIndex + MAX_LENGTH_ARRAY < sample.length &&
  fn(sample, letter, rowIndex, columnIndex, NO_INCREMENT, INCREASE);

const analyzeOverlapTopLeftSample = (fn, sample, letter, rowIndex, columnIndex) =>
  rowIndex - MAX_LENGTH_ARRAY > 0 &&
  columnIndex - MAX_LENGTH_ARRAY > 0 &&
  fn(sample, letter, rowIndex, columnIndex, DECREASE, DECREASE);

const analyzeOverlapTopRightSample = (fn, sample, letter, rowIndex, columnIndex) =>
  columnIndex - MAX_LENGTH_ARRAY > 0 &&
  rowIndex + MAX_LENGTH_ARRAY < sample.length &&
  fn(sample, letter, rowIndex, columnIndex, INCREASE, DECREASE);

const analyzeOverlapBottomLeftSample = (fn, sample, letter, rowIndex, columnIndex) =>
  columnIndex + MAX_LENGTH_ARRAY < sample.length &&
  rowIndex - MAX_LENGTH_ARRAY > 0 &&
  fn(sample, letter, rowIndex, columnIndex, DECREASE, INCREASE);

const analyzeOverlapBottomRightSample = (fn, sample, letter, rowIndex, columnIndex) =>
  columnIndex + MAX_LENGTH_ARRAY < sample.length &&
  rowIndex + MAX_LENGTH_ARRAY < sample.length &&
  fn(sample, letter, rowIndex, columnIndex, INCREASE, INCREASE);

let amountSequences = 0;

export const analyzeMutant = sample => {
  amountSequences = 0;
  const rowsAmount = sample.length;
  for (let i = 0; i < sample.length; i++) {
    if (rowsAmount !== sample[i].length) {
      return { error: true, message: 'Invalid DNA. Not NxN matrix' };
    }

    for (let j = 0; j < sample[i].length; j++) {
      const letter = sample[i][j];
      if (!isValidLetter(letter)) {
        return { error: true, message: 'Invalid DNA. Invalid character' };
      }

      const mapChecks = [
        analyzeRowRightSample,
        analyzeRowLeftSample,
        analyzeColumnTopSample,
        analyzeColumnBottomSample,
        analyzeOverlapTopLeftSample,
        analyzeOverlapTopRightSample,
        analyzeOverlapBottomLeftSample,
        analyzeOverlapBottomRightSample,
      ];

      for (const fn of mapChecks) {
        fn(analyzeSample, sample, letter, i, j);
        if (amountSequences === MUTANT_MIN_SEQ) {
          return { error: false, mutant: true };
        }
      }
    }
  }

  return { error: false, mutant: false };
};

const analyzeSample = (
  sample,
  letter,
  rowStart,
  columnStart,
  rowDirection,
  columnDirection,
  sequence = 0,
) => {
  if (letter === sample[rowStart][columnStart]) {
    sequence++;

    if (sequence === MUTANT_AMOUNT_CHARACTERS) {
      amountSequences++;
      return;
    }

    analyzeSample(
      sample,
      letter,
      rowStart + rowDirection,
      columnStart + columnDirection,
      rowDirection,
      columnDirection,
      sequence,
    );
  }
};

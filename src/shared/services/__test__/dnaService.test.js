import * as DnaService from '../dnaService';

const badSizeMatrix = ['ATGCGA'];
const badCharactersMatrix = ['ATGCGA', 'CAGTGC', 'XXXXXX', 'AGAAGG', 'CCCCTA', 'TCACTG'];
const mutantMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
const humanMatrix = ['ATGCGA', 'ACCTGC', 'TAATGT', 'AGAAGG', 'TCCTTA', 'TCACTG'];

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Services DNA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send an error if it is not an NxN matrix', async () => {
    const response = DnaService.analyzeMutant(badSizeMatrix);
    expect(response.error).toBe(true);
  });

  test('should send an error if it has an invalid character', async () => {
    const response = DnaService.analyzeMutant(badCharactersMatrix);
    expect(response.error).toBe(true);
  });

  test('should send response with mutant in false if it is a human', async () => {
    const response = DnaService.analyzeMutant(humanMatrix);
    expect(response.mutant).toBe(false);
  });

  test('should send response with mutant in true if it is a mutant', async () => {
    const response = DnaService.analyzeMutant(mutantMatrix);
    expect(response.mutant).toBe(true);
  });
});

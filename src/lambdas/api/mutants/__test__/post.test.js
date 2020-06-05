import { handler } from '../post';
import HumanService from '../../../../shared/services/humanService';
import { FORBIDDEN, SUCCESS, BAD_REQUEST, ERROR } from '../../../../libs/HttpStatusCodes';

const badSizeMatrix = ['ATGCGA'];
const badCharactersMatrix = ['ATGCGA', 'CAGTGC', 'XXXXXX', 'AGAAGG', 'CCCCTA', 'TCACTG'];
const mutantMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
const humanMatrix = ['ATGCGA', 'ACCTGC', 'TAATGT', 'AGAAGG', 'TCCTTA', 'TCACTG'];

const buildEventRequest = dna => {
  const request = { dna };
  return {
    body: JSON.stringify(request),
  };
};

afterAll(() => {
  jest.restoreAllMocks();
});

describe('API Mutants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send a 400 if it is not an NxN matrix', async () => {
    const event = buildEventRequest(badSizeMatrix);
    const response = await handler(event);
    expect(response.statusCode).toBe(BAD_REQUEST);
  });

  test('should send a 400 if it has an invalid character', async () => {
    const event = buildEventRequest(badCharactersMatrix);
    const response = await handler(event);
    expect(response.statusCode).toBe(BAD_REQUEST);
  });

  test('should send a 403 if it is a human', async () => {
    jest.spyOn(HumanService, 'save').mockImplementation(() => ({ mutant: false }));

    const event = buildEventRequest(humanMatrix);
    const response = await handler(event);
    expect(response.statusCode).toBe(FORBIDDEN);
  });

  test('should send a 200 if it is a mutant', async () => {
    jest.spyOn(HumanService, 'save').mockImplementation(() => ({ mutant: true }));

    const event = buildEventRequest(mutantMatrix);
    const response = await handler(event);
    expect(response.statusCode).toBe(SUCCESS);
  });

  test('should send a 500 if there is an error', async () => {
    jest.spyOn(HumanService, 'save').mockImplementation(() => {
      throw new Error('ERROR');
    });

    const event = buildEventRequest(mutantMatrix);
    const response = await handler(event);
    expect(response.statusCode).toBe(ERROR);
  });
});

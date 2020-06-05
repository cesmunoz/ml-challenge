import { handler } from '../get';
import HumanService from '../../../../shared/services/humanService';
import { SUCCESS, ERROR } from '../../../../libs/HttpStatusCodes';

afterAll(() => {
  jest.restoreAllMocks();
});

describe('API Stats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send a 200 with a response', async () => {
    jest.spyOn(HumanService, 'getStats').mockImplementation(() => ({ humans: 0, mutants: 10 }));

    const response = await handler();
    expect(response.statusCode).toBe(SUCCESS);
  });

  test('should send a 500 if there is an error', async () => {
    jest.spyOn(HumanService, 'getStats').mockImplementation(() => {
      throw new Error('ERROR');
    });

    const response = await handler();
    expect(response.statusCode).toBe(ERROR);
  });
});

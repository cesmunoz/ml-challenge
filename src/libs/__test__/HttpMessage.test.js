import { success, forbidden, badRequest, error } from '../HttpMessage';

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Lib HttMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully send a success', async () => {
    const response = success('message', {});
    expect(response.statusCode).toBe(200);
  });

  test('should successfully send a error', async () => {
    const response = error('message', {});
    expect(response.statusCode).toBe(500);
  });

  test('should successfully send a forbidden', async () => {
    const response = forbidden('message', {});
    expect(response.statusCode).toBe(403);
  });

  test('should successfully send a bad request', async () => {
    const response = badRequest('message', {});
    expect(response.statusCode).toBe(400);
  });
});

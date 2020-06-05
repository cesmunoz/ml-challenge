import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { query, insert } from '../DynamoIO';

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Lib DynamoDb', () => {
  beforeEach(() => {
    // eslint-disable-next-line
    process.env = Object.assign(process.env, { ENV: 'test' });
    jest.clearAllMocks();
  });

  test('should successfully query into database', async () => {
    jest.spyOn(DocumentClient.prototype, 'query').mockImplementation(() => {
      return {
        promise: () => ({ Items: [], Count: 0 }),
      };
    });

    const response = await query('THE_TABLE', {});
    expect(response.Items).not.toBeNull();
  });

  test('should successfully save into database', async () => {
    jest.spyOn(DocumentClient.prototype, 'put').mockImplementation(() => {
      return {
        promise: () => ({}),
      };
    });

    const response = await insert('THE_TABLE', {});
    expect(response).not.toBeNull();
  });
});

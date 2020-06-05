import * as DynamoIO from '../../../libs/DynamoIO';
import HumanService from '../humanService';

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Services HumanService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully save', async () => {
    jest.spyOn(DynamoIO, 'insert').mockImplementation(() => ({}));

    const response = await HumanService.save({});
    expect(response).not.toBeNull();
  });

  test('should successfully get stats', async () => {
    jest.spyOn(DynamoIO, 'query').mockImplementation(() => ({ Items: [], Count: 0 }));

    const response = await HumanService.getStats({});
    expect(response).not.toBeNull();
  });
});

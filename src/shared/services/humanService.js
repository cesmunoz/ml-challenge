import * as DynamoIO from '../../libs/DynamoIO';
import { REVERSE_INDEX, HUMANS } from '../constants';

const TableName = 'HUMANS';

class HumanService {
  static async getStats() {
    const filterHumans = {
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'SK = :sk and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `metadata#`,
        ':sk': `#${HUMANS}`,
      },
    };

    const filterMutants = {
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'SK = :sk and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `metadata#`,
        ':sk': `#${HUMANS}`,
      },
    };

    const humans = await DynamoIO.query(TableName, filterHumans);
    const mutants = await DynamoIO.query(TableName, filterMutants);

    return {
      humans: humans.Count,
      mutants: mutants.Count,
    };
  }

  static save(model) {
    model.PK = `metadata#${model.id}`;
    model.SK = `#${model.dna_type}#`;
    model.createdDate = Date.now();

    DynamoIO.insert(TableName, model);
  }
}

export default HumanService;

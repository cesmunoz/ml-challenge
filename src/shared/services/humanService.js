import * as DynamoIO from '../../libs/DynamoIO';
import { REVERSE_INDEX, HUMAN, MUTANT, METADATA } from '../constants';

const TableName = 'HUMANS';

class HumanService {
  static async getStats() {
    const filterHumans = {
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'SK = :sk and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `${METADATA}#`,
        ':sk': `#${HUMAN}#`,
      },
    };

    const filterMutants = {
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'SK = :sk and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `${METADATA}#`,
        ':sk': `#${MUTANT}#`,
      },
    };

    const humans = await DynamoIO.query(TableName, filterHumans);
    const mutants = await DynamoIO.query(TableName, filterMutants);

    return {
      humans: humans.Count,
      mutants: mutants.Count,
    };
  }

  static async save(model) {
    model.PK = `metadata#${model.id}`;
    model.SK = `#${model.dna_type}#`;
    model.createdDate = Date.now();

    await DynamoIO.insert(TableName, model);

    delete model.PK;
    delete model.SK;
  }
}

export default HumanService;

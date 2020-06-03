import { DocumentClient } from 'aws-sdk/clients/dynamodb';

let dynamo = new DocumentClient({ apiVersion: '2012-08-10' });
// eslint-disable-next-line
if (process.env.ENV === 'dev') {
  console.log('Accessing Dynamo Local');

  dynamo = new DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
  });
}

const getQueryResult = async params => dynamo.query(params).promise();
export const query = async (tableName, filter) => {
  const params = {
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)',
    ReturnValues: 'ALL_OLD',
  };
  const result = await getQueryResult(params);
  return result ? result.Items : [];
};

const getPutResult = async params => dynamo.put(params).promise();
export const insert = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)',
    ReturnValues: 'ALL_OLD',
  };

  await getPutResult(params);
  return params ? params.Item : {};
};

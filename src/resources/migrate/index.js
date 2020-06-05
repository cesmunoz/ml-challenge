const DocumentClient = require('aws-sdk/clients/dynamodb');

console.log('Accessing Dynamo Local');
const dynamo = new DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET',
});

const params = {
  TableName: 'HUMANS',
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S',
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'reverseIndex',
      KeySchema: [
        {
          AttributeName: 'SK',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'PK',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

// Call DynamoDB to create the table
dynamo.createTable(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Table Created', data);
  }
});

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import 'dotenv/config';

//creates dynamo db client to be used to do database operations
export const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});
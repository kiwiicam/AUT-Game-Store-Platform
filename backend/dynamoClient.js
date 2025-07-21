import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import 'dotenv/config';

console.log("accessKeyId:", process.env.AWS_ACCESS_KEY_ID);
console.log("secretAccessKey:", process.env.AWS_SECRET_ACCESS_KEY ? "✓ (loaded)" : "✗ MISSING");
console.log("region:", process.env.AWS_REGION);


export const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});
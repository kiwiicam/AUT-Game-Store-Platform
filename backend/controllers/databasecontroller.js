import { client } from '../dynamoClient.js';
import { PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export async function addUser(req, res) {
    const { uid, username } = req.body;
    const params = {
        TableName: "userTable",
        Item: {
            uid: { S: uid },
            username: { S: username }
        }
    };
    try {
        const data = await client.send(new PutItemCommand(params));
        res.status(200).json({ message: "Item inserted successfully", data });
    } catch (err) {
        console.log("Error inserting item:", err);
        res.status(500).json({ error: "Failed to insert item" });
    }

}

export async function getUserInfo(req, res) {
    const { uid } = req.body;
    try {
        const params = {
            TableName: "userTable",
            Key: {
                uid: { S: uid },
            },
        };
        const response = await client.send(new GetItemCommand(params));
        const plainItem = unmarshall(response.Item);
        res.status(200).json({
            message: "User info fetched successfully",
            item: plainItem.username || "No username found"
        });

    }
    catch (err) {
        console.log("Error fetching user info:", err);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
}


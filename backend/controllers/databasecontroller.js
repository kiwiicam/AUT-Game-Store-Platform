import { client } from '../dynamoClient.js';
import { PutItemCommand, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export async function addUser(req, res) {
    const { uid, username, accountType, email } = req.body;
    const params = {
        TableName: "userTable",
        Item: {
            uid: { S: uid },
            username: { S: username },
            accountType: { S: accountType },
            email: { S: email },
            firstname: { S: "" },
            lastname: { S: "" },
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
            item: plainItem.accountType,
            username: plainItem.username,
            firstname: plainItem.firstname,
            lastname: plainItem.lastname,
        });
        console.log(plainItem.username, plainItem.firstname, plainItem.lastname);

    }
    catch (err) {
        console.log("Error fetching user info:", err);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
}

export async function changeName(req, res) {
    try {
        const { uid, newName, type } = req.body;
        const params = {
            TableName: "userTable",
            Key: {
                uid: { S: uid },
            },
            UpdateExpression: `SET ${type} = :newValue`,
            ExpressionAttributeValues: {
                ":newValue": { S: newName },
            },
            ReturnValues: "UPDATED_NEW",
        };
        const response = await client.send(new UpdateItemCommand(params));
        res.status(200).json({ message: "User info fetched successfully" });
        console.log("successfully changed name:");

    }
    catch (err) {
        res.status(500).json({ error: "Failed to change name" });
        console.log("Error changing name:", err.message);

    }

}

export async function uploadGameInformation(req, res) {
    const { gameName, description, developers } = req.body;
    const params = {
        TableName: "gameInformation",
        Item: {
            gameName: { S: gameName },
            description: { S: description },
            developers: { S: developers },
        }
    };
    try {
        const data = await client.send(new PutItemCommand(params));
        res.status(200).json({ message: "Game information uploaded successfully", data });
        console.log("Game information uploaded successfully:", data);
    } catch (err) {
        console.log("Error uploading game information:", err);
        res.status(500).json({ error: "Failed to upload game information" });
    }
}


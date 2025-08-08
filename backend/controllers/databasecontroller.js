import { client } from '../dynamoClient.js';
import { PutItemCommand, GetItemCommand, UpdateItemCommand, ScanCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { retrieveGameImages } from './storagecontroller.js';
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
    const { gameName, teamName, projectType, projectTimeframe, gameDesc, selectedGenres, groupMembers, fileSize } = req.body;
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const params = {
        TableName: "gameInformation",
        Item: {
            gameName: { S: gameName },
            gameDesc: { S: gameDesc },
            teamName: { S: teamName },
            projectTimeframe: { S: projectTimeframe },
            projectType: { S: projectType },
            selectedGenres: { SS: selectedGenres },
            likes: { N: "0" },
            releaseDate: { S: formattedDate },
            fileSize: { N: fileSize },
        }
    };
    if (projectType === "Group Game Project") {
        params.Item.groupMembers = {
            SS: groupMembers.map(member => member.name)
        };
    }
    try {
        const data = await client.send(new PutItemCommand(params));
        res.status(200).json({ message: "Game information uploaded successfully", data });
        console.log("Game information uploaded successfully:", data);
    } catch (err) {
        console.log("Error uploading game information:", err);
        res.status(500).json({ error: "Failed to upload game information" });
    }
}

export async function retrieveFeaturedGames(req, res) {
    try {
        const params = {
            TableName: "gameInformation",
        };
        const data = await client.send(new ScanCommand(params));
        const games = data.Items.map(item => unmarshall(item));

        const topThree = games.reduce((acc, game) => {
            acc.push(game);
            acc.sort((a, b) => b.likes - a.likes);

            if (acc.length > 3) acc.pop();
            return acc;
        }, []);

        const gameNameArray = [topThree[0].gameName, topThree[1].gameName, topThree[2].gameName];
        const gameImages = await retrieveGameImages(gameNameArray);

        const featuredGames = []
        gameImages.forEach(element => {
            const name = element.gameName;
            topThree.forEach(game => {
                if (game.gameName === name) {
                    featuredGames.push({
                        src: element.imageUrl,
                        title: game.gameName,
                        desc: game.gameDesc,
                        creator: game.teamName,
                        likes: game.likes
                    });
                }
            });
        });

        console.log(featuredGames);

        res.status(200).json({ message: "Featured games retrieved successfully", featuredGames });
    } catch (err) {
        console.log("Error retrieving featured games:", err);
        res.status(500).json({ error: "Failed to retrieve featured games" });
    }
}

export async function getUserSearch(req, res) {
    const { searchQuery } = req.body;

    const params = {
        TableName: "userTable"
    }
    try {
        const result = await client.send(new ScanCommand(params))
        const response = result.Items.map(item => unmarshall(item));
        const regex = new RegExp(`^${searchQuery}`, 'i')
        const searchResult = response.filter(item => regex.test(item.username));

        const namelist = []
        for (var person of searchResult) {
            namelist.push({
                name: person.username,
                src: "https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg"
            })
        }
        console.log(namelist)
        res.status(200).json({ namelist });
    } catch (err) {
        console.log("Error retrieving featured games:", err);
        res.status(500).json({ error: err.message });
    }

}

export async function getGameInformation(req, res) {
    const { gameName } = req.body;
    try {
        const params = {
            TableName: "gameInformation",
            Key: {
                gameName: { S: gameName }
            }
        }

        const response = await client.send(new GetItemCommand(params))
        const data = unmarshall(response.Item)
        const genreArray = Array.from(data.selectedGenres);
        res.status(200).json({
            gameData: data,
            genreArray
        });
    } catch (err) {
        console.log("Error retrieving featured games:", err);
        res.status(500).json({ error: err.message });
    }


}

export async function getDeveloperInformation(req, res) {

}

export async function uploadComment(req, res) {
    try {
        const { gameName, userName, comment, timestamp } = req.body
        const params = {
            TableName: "gameComments",
            Item: {
                gameName: { S: gameName },
                timestamp: { N: timestamp.toString() },
                userName: { S: userName },
                comment: { S: comment }
            }
        }
        const data = await client.send(new PutItemCommand(params));
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export async function retrieveComments(req, res) {
    try {
        const { gameName } = req.body;

        const params = {
            TableName: "gameComments",
            KeyConditionExpression: "gameName = :g",
            ExpressionAttributeValues: {
                ":g": { S: gameName }
            }
        };

        const response = await client.send(new QueryCommand(params));
        const items = response.Items.map(item => unmarshall(item));
        console.log(items)
        res.status(200).json({ commentData: items });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export async function retrieveGameNameSearch(req, res) {
    try {
        const { search } = req.body
        const params = {
            TableName: "gameInformation",
            KeyConditionExpression: "gameName = :g",
            ExpressionAttributeValues: {
                ":g": { S: search }
            }
        }

        const response = await client.send(new QueryCommand(params));

        res.status(200).json({})

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}


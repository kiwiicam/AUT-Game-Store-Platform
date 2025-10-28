import { client } from '../dynamoClient.js';
import { PutItemCommand, GetItemCommand, UpdateItemCommand, ScanCommand, QueryCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { retrieveGameImages, moveToPendingDeletion, moveBackFromPendingDeletion } from './storagecontroller.js';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { deleteFromS3 } from './storagecontroller.js';
import fetch from 'node-fetch';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import { group } from 'console';

const backend_url = process.env.BACKEND_URL || 'http://localhost:8000/api';

export async function getuid(req, res) {
    const username = req.body.username;
    try {
        const data = await client.send(new ScanCommand({ TableName: "userTable" }));
        const realData = data.Items.map(item => unmarshall(item));
        const user = realData.find(u => u.username === username);
        res.status(200).json({
            //  message: "User info fetched successfully",
            uid: user.uid,

        });

    }
    catch (err) {
        console.log("Error fetching user info:", err);
        res.status(500).json({ error: "Failed to fetch user info" });
    }


}

export async function addUser(req, res) {
    const { uid, username, email } = req.body;
    const unixMillis = Date.now();
    const params = {
        TableName: "userTable",
        Item: {
            uid: { S: uid },
            username: { S: username },
            accountType: { S: "user" },
            email: { S: email },
            firstname: { S: "" },
            lastname: { S: "" },
            dateJoined: { N: unixMillis.toString() }
        }
    };
    try {
        const data = await client.send(new PutItemCommand(params));
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('image', fs.createReadStream('./default-pfp.png'), 'pfp.png');
        const response = await axios.post(
            `${backend_url}/storage/setpfp`,
            formData,
            { headers: formData.getHeaders() }
        );
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
        //    console.log(plainItem.username, plainItem.firstname, plainItem.lastname);

    }
    catch (err) {
        console.log("Error fetching user info:", err);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
}

export async function changeName(req, res) {
    //cambell ive added a password parameter so u can do the auth verification for changing details securely
    try {
        const { uid, newName, type, password } = req.body;//password works
        if (password === password) {
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
        else {
            res.status(500).json({ error: "Invaild password, potiental session timeout" });
        }

    }
    catch (err) {
        res.status(500).json({ error: "Failed to change name" });
        console.log("Error changing name:", err.message);

    }

}

export async function uploadGameInformation(req, res) {
    const { gameName, teamName, projectType, projectTimeframe, gameDesc, selectedGenres, groupMembers, fileSize, uid } = req.body;
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const uname = {
        TableName: "userTable",
        Key: {
            uid: { S: uid },
        }
    }

    const user = await client.send(new GetItemCommand(uname));
    const plainUser = unmarshall(user.Item);

    const formattedDate = date.toLocaleDateString('en-US', options);
    const params = {
        TableName: "AwaitingGames",
        Item: {
            gameName: { S: gameName },
            gameDesc: { S: gameDesc },
            teamName: { S: teamName },
            projectTimeframe: { S: projectTimeframe },
            projectType: { S: projectType },
            selectedGenres: { SS: selectedGenres },
            likes: { N: "0" },
            downloads: { N: "0" },
            releaseDate: { S: formattedDate },
            fileSize: { N: fileSize },
            username: { S: plainUser.username },
            uid: { S: uid }
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
        console.log("----------------------------------------------");
        console.log(groupMembers)
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

        // Sort all games by likes in descending order and take the top 8
        const topEight = games
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 8);

        // Get the game names for image retrieval
        const gameNameArray = topEight.map(game => game.gameName);
        const gameImages = await retrieveGameImages(gameNameArray);

        console.log(gameImages + " this is game images!!!!!!!!!!!!!!!!!!!!!!");

        // Combine game info with image URLs
        const featuredGames = topEight.map(game => {
            const image = gameImages.find(img => img.gameName === game.gameName);
            return {
                src: image.imageUrl,
                title: game.gameName,
                desc: game.gameDesc,
                creator: game.teamName,
                likes: game.likes
            };
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
        const result = await client.send(new ScanCommand(params));
        const response = result.Items.map(item => unmarshall(item));
        const regex = new RegExp(`^${searchQuery}`, 'i');

        const searchResult = response.filter(item => regex.test(item.username) && item.accountType === 'student');

        const namelist = [];
        for (var person of searchResult) {
            namelist.push({
                name: person.username,
                src: "https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg",
                accountType: person.accountType
            });
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
        const groupMembers = Array.from(data.groupMembers || []);
        res.status(200).json({
            gameData: data,
            genreArray,
            groupMembers
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
        const { gameName, uid, comment, timestamp } = req.body

        const userParams = {
            TableName: "userTable",
            Key: {
                uid: { S: uid }
            }
        };
        const userResponse = await client.send(new GetItemCommand(userParams));
        const userData = unmarshall(userResponse.Item);
        const userName = userData.username;

        const params = {
            TableName: "gameComments",
            Item: {
                gameName: { S: gameName },
                timestamp: { N: timestamp.toString() },
                uid: { S: uid },
                userName: { S: userName },
                comment: { S: comment }
            }
        }
        const data = await client.send(new PutItemCommand(params));
        res.status(200).json({ userName });
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
        if (req.body.searchBy === "mostRecent") {
            res.status(200).json({ commentData: items });

        }
        else if (req.body.searchBy === "leastRecent") {
            items.sort((a, b) => a.timestamp - b.timestamp);
            res.status(200).json({ commentData: items });
        }

        //  items.sort(a,b) => a.timestamp.compare  b.timestamp 
        //  console.log(items)
        //   res.status(200).json({ commentData: items });
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

export async function mergeImageUrlWithGameName(array) {
    const gameNames = []
    for (const names of array) {
        gameNames.push(names.gameName);
    }

    const imageArray = await retrieveGameImages(gameNames);

    return (array.map(item => ({
        ...item,
        imageUrl: (imageArray.find(img => img.gameName === item.gameName) || {}).imageUrl || null
    })))

}

export async function browseGames(req, res) {
    try {
        let allItems = [];
        let lastKey = undefined;

        do {
            const params = {
                TableName: "gameInformation",
                ExclusiveStartKey: lastKey
            };

            const result = await client.send(new ScanCommand(params));
            const items = result.Items.map(item => unmarshall(item));
            allItems = allItems.concat(items);
            lastKey = result.LastEvaluatedKey;

        } while (lastKey);

        const converted = allItems.map(game => ({
            ...game,
            selectedGenres: Array.from(game.selectedGenres)
        }));
        console.log("----------------------------------------------");
        console.log("----------------------------------------------");
        console.log("----------------------------------------------");
        console.log("Total items retrieved from DynamoDB:", allItems.length);
        const mergedItems = await mergeImageUrlWithGameName(converted);

        res.status(200).json({ gameInfo: mergedItems });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

export async function retrieveGamesForAdmin(req, res) {
    try {
        const data = await client.send(new ScanCommand({ TableName: "AwaitingGames" }));
        const realData = data.Items.map(item => unmarshall(item));
        res.status(200).json({ games: realData });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });

    }
}

export async function addGameToUser(userList, gameName) {
    try {
        console.log("adding game to users", userList, " ", gameName);
        for (const user of userList) {
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: user },
                }
            }
            const response = await client.send(new GetItemCommand(params));
            const plainItem = unmarshall(response.Item);
            let userGames = Array.from(plainItem.games || []);
            userGames.push(gameName);
            const updateParams = {
                TableName: "userTable",
                Key: {
                    uid: { S: user },
                },
                UpdateExpression: `SET games = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { SS: userGames },
                },
            };
            await client.send(new UpdateItemCommand(updateParams));
            console.log("added game to user:", user.uid, " ", gameName);
        }
    }
    catch (err) {
        console.log(err.message, "error adding game to user");
        throw new Error("Failed to add game to user");
    }
}

export async function approveGames(req, res) {
    try {
        const approveList = req.body
        if (approveList.length < 1) {
            res.status(200).json({ message: "No items" });
            return;
        }
        for (const gameName of approveList) {

            const getPararms = {
                TableName: "AwaitingGames",
                Key: {
                    gameName: { S: gameName }

                }
            }

            const items = await client.send(new GetItemCommand(getPararms))


            const plainItems = unmarshall(items.Item);
            const groupMembers = plainItems.groupMembers ? Array.from(plainItems.groupMembers) : [];

            const putParams = {
                TableName: "gameInformation",
                Item: {
                    username: { S: plainItems.username },
                    uid: { S: plainItems.uid },
                    gameName: { S: plainItems.gameName },
                    gameDesc: { S: plainItems.gameDesc },
                    teamName: { S: plainItems.teamName },
                    projectTimeframe: { S: plainItems.projectTimeframe },
                    projectType: { S: plainItems.projectType },
                    selectedGenres: { SS: Array.from(plainItems.selectedGenres) },
                    likes: { N: "0" },
                    releaseDate: { S: plainItems.releaseDate },
                    fileSize: { N: plainItems.fileSize.toString() },
                }
            }
            if (plainItems.projectType === "Group Game Project" && groupMembers.length > 0) {
                putParams.Item.groupMembers = { SS: groupMembers };
            }



            if (groupMembers.length > 0) {
                let list = []
                for (const member of groupMembers) {
                    const response = await axios.post(`${backend_url}/database/getuid`, {
                        username: member
                    })
                    list.push(response.data.uid)
                }
                list.push(plainItems.uid)
                await addGameToUser(list, plainItems.gameName);
            }


            await client.send(new PutItemCommand(putParams))

            const delParams = {
                TableName: "AwaitingGames",
                Key: {
                    gameName: { S: gameName }

                }
            }
            await client.send(new DeleteItemCommand(delParams))
        }
        res.status(200).json({ message: "Success" });
    }
    catch (error) {
        console.log(error.message)
        console.log("error")
        res.status(500).json({ error: error.message });
    }

}


export async function denyGames(req, res) {
    try {
        const denyList = req.body
        if (denyList.length < 1) {
            res.status(200).json({ message: "No items" });
            return;
        }
        for (const gameName of denyList) {
            const params = {
                TableName: "AwaitingGames",
                Key: {
                    gameName: { S: gameName }

                }
            }
            const game = await client.send(new GetItemCommand(params));
            const plainItems = unmarshall(game.Item);

            const nowMs = Date.now();
            const thirtyDaysLater = nowMs + 30 * 24 * 60 * 60 * 1000;

            const epochtime = thirtyDaysLater / 1000;

            const groupMembers = plainItems.groupMembers ? Array.from(plainItems.groupMembers) : [];

            const putParams = {
                TableName: "PendingDeletion",
                Item: {
                    gameName: { S: plainItems.gameName },
                    gameDesc: { S: plainItems.gameDesc },
                    teamName: { S: plainItems.teamName },
                    projectTimeframe: { S: plainItems.projectTimeframe },
                    projectType: { S: plainItems.projectType },
                    selectedGenres: { SS: Array.from(plainItems.selectedGenres) },
                    likes: { N: "0" },
                    releaseDate: { S: plainItems.releaseDate },
                    fileSize: { N: plainItems.fileSize.toString() },
                    username: { S: plainItems.username },
                    uid: { S: plainItems.uid },
                    expires: { N: epochtime.toString() },
                }
            }
            if (plainItems.projectType === "Group Game Project" && groupMembers.length > 0) {
                putParams.Item.groupMembers = { SS: groupMembers };
            }

            await client.send(new PutItemCommand(putParams))

            const delParams = {
                TableName: "AwaitingGames",
                Key: {
                    gameName: { S: gameName }

                }
            }
            await client.send(new DeleteItemCommand(delParams))

            //copy to a special s3 prefix where it has a life cycle rule to delete after 30 days

            moveToPendingDeletion(gameName);


            //await s3.send(new CopyObjectCommand({}))
            // DO IT IN THE STORAGE CONTROLLER THO
            //await s3.send(new DeleteObjectCommand({}));



            // deleteFromS3(gameName);
        }
        console.log("success")
        res.status(200).json({ message: "Success" });
    }
    catch (error) {
        console.log(error.message, "error denying game")
        res.status(500).json({ error: error.message });
    }

}

export async function getAdminGameInfo(req, res) {
    try {
        const { gameName } = req.body;
        const params = {
            TableName: "AwaitingGames",
            Key: {
                gameName: { S: gameName }
            }
        }

        const response = await client.send(new GetItemCommand(params))
        const data = unmarshall(response.Item)
        const genreArray = Array.from(data.selectedGenres);
        console.log(data)
        console.log(genreArray)
        res.status(200).json({
            gameData: data,
            genreArray: genreArray,
        });
    } catch (err) {
        console.log("Error retrieving featured games:", err);
        res.status(500).json({ error: err.message });
    }
}

export async function getAdminAllUsers(req, res) {
    try {
        const data = await client.send(new ScanCommand({ TableName: "userTable" }));
        const realData = data.Items.map(item => unmarshall(item));
        console.log(realData)
        res.status(200).json({ realData })
    }
    catch (error) {
        res.status(500).json({})
        console.log(error.message)
    }
}

export async function adminUpdateRole(req, res) {
    const payload = req.body

    try {
        if ("name" in payload) {
            console.log(payload.name)
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: payload.uid },
                },
                UpdateExpression: `SET username = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { S: payload.name },
                },
            };
            await client.send(new UpdateItemCommand(params));

        }

        if ("email" in payload) {
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: payload.uid },
                },
                UpdateExpression: `SET email = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { S: payload.email },
                },
            };
            await client.send(new UpdateItemCommand(params));

        }

        if ("firstn" in payload) {
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: payload.uid },
                },
                UpdateExpression: `SET firstname = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { S: payload.firstn },
                },
            };
            await client.send(new UpdateItemCommand(params));

        }

        if ("lastn" in payload) {
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: payload.uid },
                },
                UpdateExpression: `SET lastname = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { S: payload.lastn },
                },
            };
            await client.send(new UpdateItemCommand(params));

        }

        if ("role" in payload) {
            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: payload.uid },
                },
                UpdateExpression: `SET accountType = :newValue`,
                ExpressionAttributeValues: {
                    ":newValue": { S: payload.role },
                },
            };
            await client.send(new UpdateItemCommand(params));

        }
        res.status(200).json({ message: "Success" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to change name" });
        console.log("Error changing name:", err.message);

    }
}

export async function checkAccessByUID(req, res) {
    try {
        const { uid, gameName } = req.body;
        const params = {
            TableName: "userTable",
            Key: {
                uid: { S: uid },
            },
        };
        const response = await client.send(new GetItemCommand(params));
        const plainItem = unmarshall(response.Item);
        console.log(gameName)
        console.log(gameName === true)
        if (gameName) {
            const commentParams = {
                TableName: "gameComments",
                KeyConditionExpression: "gameName = :g",
                ExpressionAttributeValues: {
                    ":g": { S: gameName }
                }
            };
            const response = await client.send(new QueryCommand(commentParams));
            const items = response.Items.map(item => unmarshall(item));
            const commentUploaded = items.some(c => c.uid === uid);
            res.status(200).json({ role: plainItem.accountType, commentUploaded });
            return;
        }

        res.status(200).json({ role: plainItem.accountType });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
}

export async function likeGame(req, res) {

    try {
        const { uid, gameName } = req.body;

        const likeCountParams = {
            TableName: "gameInformation",
            Key: {
                gameName: { S: gameName }
            }
        };

        const likeCount = await client.send(new GetItemCommand(likeCountParams));
        const plainLikeCount = unmarshall(likeCount.Item);

        const newLikeCount = Number(plainLikeCount.likes) + 1;

        const updateLikeParams = {
            TableName: "gameInformation",
            Key: {
                gameName: { S: gameName }
            },
            UpdateExpression: `SET likes = :newValue`,
            ExpressionAttributeValues: {
                ":newValue": { N: newLikeCount.toString() }
            }
        };
        await client.send(new UpdateItemCommand(updateLikeParams));

        const userLikes = {
            TableName: "gameLikes",
            Item: {
                gameName: { S: gameName },
                uid: { S: uid },
            }
        };
        await client.send(new PutItemCommand(userLikes));
        console.log("success", newLikeCount)
        res.status(200).json({ message: "Game liked successfully" });
    } catch (error) {
        console.log(error.message);
    }
}

export async function hasLiked(req, res) {
    try {
        const { uid, gameName } = req.body;

        const params = {
            TableName: "gameLikes",
            Key: {
                uid: { S: uid },
                gameName: { S: gameName },
            }
        };

        const response = await client.send(new GetItemCommand(params));
        const hasLiked = response.Item ? true : false;

        console.log(hasLiked)

        res.status(200).json({ hasLiked });
    } catch (error) {
        console.log(error.message, " likes failed");
        res.status(500).json({ error: "Failed to check like status" });
    }
}

export async function removeLike(req, res) {

    const { uid, gameName } = req.body;

    try {
        const params = {
            TableName: "gameLikes",
            Key: {
                uid: { S: uid },
                gameName: { S: gameName },
            }
        };
        await client.send(new DeleteItemCommand(params));

        const likeCountParams = {
            TableName: "gameInformation",
            Key: {
                gameName: { S: gameName }
            }
        };

        const likeCount = await client.send(new GetItemCommand(likeCountParams));
        const plainLikeCount = unmarshall(likeCount.Item);

        const newLikeCount = Number(plainLikeCount.likes) - 1;

        const updateLikeParams = {
            TableName: "gameInformation",
            Key: {
                gameName: { S: gameName }
            },
            UpdateExpression: `SET likes = :newValue`,
            ExpressionAttributeValues: {
                ":newValue": { N: newLikeCount.toString() }
            }
        };
        await client.send(new UpdateItemCommand(updateLikeParams));

        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to remove like" });
    }
}

export async function getPendingDeletionGames(req, res) {
    try {
        const data = await client.send(new ScanCommand({ TableName: "PendingDeletion" }));
        const realData = data.Items.map(item => unmarshall(item));
        res.status(200).json({ games: realData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to restore game" });
    }
}

export async function restoreGame(req, res) {
    try {
        const { gameName } = req.body;

        const getParams = {
            TableName: "PendingDeletion",
            Key: {
                gameName: { S: gameName }
            }
        };

        const gameItem = await client.send(new GetItemCommand(getParams));

        const plainItems = unmarshall(gameItem.Item);

        const groupMembers = plainItems.groupMembers ? Array.from(plainItems.groupMembers) : [];

        const putParams = {
            TableName: "AwaitingGames",
            Item: {
                username: { S: plainItems.username },
                uid: { S: plainItems.uid },
                gameName: { S: plainItems.gameName },
                gameDesc: { S: plainItems.gameDesc },
                teamName: { S: plainItems.teamName },
                projectTimeframe: { S: plainItems.projectTimeframe },
                projectType: { S: plainItems.projectType },
                selectedGenres: { SS: Array.from(plainItems.selectedGenres) },
                likes: { N: "0" },
                releaseDate: { S: plainItems.releaseDate },
                fileSize: { N: plainItems.fileSize.toString() },
                username: { S: plainItems.username },
                uid: { S: plainItems.uid }
            }

        }
        if (plainItems.projectType === "Group Game Project" && groupMembers.length > 0) {
            putParams.Item.groupMembers = { SS: groupMembers };
        }

        const data = await client.send(new PutItemCommand(putParams));

        const deleteParams = {
            TableName: "PendingDeletion",
            Key: {
                gameName: { S: gameName }
            }
        }
        await client.send(new DeleteItemCommand(deleteParams))

        moveBackFromPendingDeletion(gameName);

        res.status(200).json({ message: "Restore game endpoint hit", gameName });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to restore game" });
    }
}

export async function recentReleases(req, res) {
    try {
        const result = await client.send(new ScanCommand({ TableName: "gameInformation" }));
        const items = result.Items.map(item => unmarshall(item));

        // Get the 8 most recent games
        const getMostRecentGames = (gamesArray, count = 8) => {
            return [...gamesArray]
                .filter(game => game.releaseDate)
                .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
                .slice(0, count);
        };

        const recentGames = getMostRecentGames(items);

        const gameNameArray = recentGames.map(game => game.gameName);


        const gameImages = await retrieveGameImages(gameNameArray);
        const recentGamesArr = [];

        gameImages.forEach(image => {
            const matchedGame = recentGames.find(game => game.gameName === image.gameName);
            const genreArr = [...matchedGame.selectedGenres]
            if (matchedGame) {
                recentGamesArr.push({
                    src: image.imageUrl,
                    title: matchedGame.gameName,
                    desc: matchedGame.gameDesc,
                    creator: matchedGame.teamName,
                    likes: matchedGame.likes,
                    releaseDate: matchedGame.releaseDate,
                    fileSize: matchedGame.fileSize,
                    genres: genreArr
                });
            }
        });

        console.log(recentGamesArr);

        res.status(200).json({ recentGames: recentGamesArr });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to retrieve recent releases" });
    }
}

export async function randomGames(req, res) {
    try {
        const result = await client.send(new ScanCommand({ TableName: "gameInformation" }));
        const items = result.Items.map(item => unmarshall(item));

        // Get 8 random games
        const getRandomGames = (gamesArray, count = 8) => {
            const shuffled = [...gamesArray];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled.slice(0, count);
        };

        const randomGames = getRandomGames(items);

        const gameNameArray = randomGames.map(game => game.gameName);

        const gameImages = await retrieveGameImages(gameNameArray);
        const randomGamesArr = [];

        gameImages.forEach(image => {
            const matchedGame = randomGames.find(game => game.gameName === image.gameName);
            const genreArr = [...matchedGame.selectedGenres]
            if (matchedGame) {
                randomGamesArr.push({
                    src: image.imageUrl,
                    title: matchedGame.gameName,
                    desc: matchedGame.gameDesc,
                    creator: matchedGame.teamName,
                    likes: matchedGame.likes,
                    releaseDate: matchedGame.releaseDate,
                    fileSize: matchedGame.fileSize,
                    genres: genreArr
                });
            }
        });
        console.log("this is random games arr");
        console.log("this is random games arr");
        console.log("this is random games arr");

        console.log(randomGamesArr);

        res.status(200).json({ randomGames: randomGamesArr });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to retrieve classic games" });
    }
}

export async function classicGames(req, res) {
    try {
        const result = await client.send(new ScanCommand({ TableName: "gameInformation" }));
        const items = result.Items.map(item => unmarshall(item));

        // Get the 8 oldest games
        const getOldestGames = (gamesArray, count = 8) => {
            return [...gamesArray]
                .filter(game => game.releaseDate)
                .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
                .slice(0, count);
        };

        const oldestGames = getOldestGames(items);
        const gameNameArray = oldestGames.map(game => game.gameName);

        const gameImages = await retrieveGameImages(gameNameArray);
        const oldestGamesArr = [];

        gameImages.forEach(image => {
            const matchedGame = oldestGames.find(game => game.gameName === image.gameName);
            const genreArr = [...matchedGame.selectedGenres]
            if (matchedGame) {
                oldestGamesArr.push({
                    src: image.imageUrl,
                    title: matchedGame.gameName,
                    desc: matchedGame.gameDesc,
                    creator: matchedGame.teamName,
                    likes: matchedGame.likes,
                    releaseDate: matchedGame.releaseDate,
                    fileSize: matchedGame.fileSize,
                    genre: genreArr
                });
            }
        });

        console.log(oldestGamesArr);

        res.status(200).json({ oldestGames: oldestGamesArr });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to retrieve oldest releases" });
    }
}

export async function updateStudentInfo(req, res) {
    try {
        const { uid, aboutMe, skills, contactEmail, contactPhone, portfolioLink, studentName, studentAge } = req.body;

        const params = {
            TableName: "userTable",
            Key: {
                uid: { S: uid },
            },
            UpdateExpression: "SET aboutMe = :aboutMe, skills = :skills, contactEmail = :contactEmail, contactPhone = :contactPhone, portfolioLink = :portfolioLink, studentName = :studentName, studentAge = :studentAge",
            ExpressionAttributeValues: {
                ":aboutMe": { S: aboutMe },
                ":skills": { L: skills.map(skill => ({ S: skill })) },
                ":contactEmail": { S: contactEmail },
                ":contactPhone": { S: contactPhone },
                ":portfolioLink": { S: portfolioLink },
                ":studentName": { S: studentName },
                ":studentAge": { N: studentAge.toString() },
            },
            ReturnValues: "ALL_NEW"
        };

        const command = new UpdateItemCommand(params);

        await client.send(command);

        res.status(200).json({ message: "Student info updated successfully" });
    }
    catch (error) {
        console.log(error.message + " Student info update failed");
        res.status(500).json({ error: "Failed to update student info" });
    }
}

export async function getStudentInfo(req, res) {
    try {

        const { uid } = req.body;

        const params = {
            TableName: "userTable",
            Key: {
                uid: { S: uid },
            },
        };
        const response = await client.send(new GetItemCommand(params));
        const data = unmarshall(response.Item);

        const correctData = {
            aboutMe: data.aboutMe || "",
            skills: data.skills ? data.skills.map(skill => skill) : [],
            contactEmail: data.contactEmail || "",
            contactPhone: data.contactPhone || "",
            portfolioLink: data.portfolioLink || "",
            studentName: data.studentName || "",
            studentAge: data.studentAge || null,
        }

        res.status(200).json({ message: "Student info retrieved successfully", correctData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to retrieve student info" });
    }
}

export async function getDevInfoGamePage(req, res) {
    try {
        let devarray = []
        console.log("getting dev info")
        console.log(req.body.groupArray);
        const groupList = req.body.groupArray;
        for (const member of groupList) {
            const respo = await axios.post(`${backend_url}/database/getuid`, {
                username: member
            })



            const params = {
                TableName: "userTable",
                Key: {
                    uid: { S: respo.data.uid },
                },
            };
            const response = await client.send(new GetItemCommand(params));
            const data = unmarshall(response.Item);

            const correctData = {
                aboutMe: data.aboutMe || "",
                skills: data.skills ? data.skills.map(skill => skill) : [],
                contactEmail: data.contactEmail || "",
                contactPhone: data.contactPhone || "",
                portfolioLink: data.portfolioLink || "",
                studentName: data.studentName || "",
                studentAge: data.studentAge || null,
            }

            console.log("retrieving game images for dev info")

            correctData.gameImg = await retrieveGameImages(Array.from(data.games) || []);


            devarray.push(correctData);
        }
        res.status(200).json({ developerInfo: devarray });


    }
    catch (error) {
        console.log(error.message, "error --------------------------------");
        res.status(500).json({ error: "Failed to retrieve developer info" });
    }
}
import { client } from '../dynamoClient.js';
import { PutItemCommand, GetItemCommand, UpdateItemCommand, ScanCommand, QueryCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { retrieveGameImages } from './storagecontroller.js';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { deleteFromS3 } from './storagecontroller.js';

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
        const result = await client.send(new ScanCommand({ TableName: "gameInformation" }));
        const plainItems = result.Items.map(item => unmarshall(item));
        const converted = plainItems.map(game => ({
            ...game,
            selectedGenres: Array.from(game.selectedGenres)
        }));
        const mergedItems = await mergeImageUrlWithGameName(converted)
        console.log(mergedItems)
        res.status(200).json({
            gameInfo: mergedItems
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
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

            console.log(plainItems)
            const putParams = {
                TableName: "gameInformation",
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
                }
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
                    expires: { N: thirtyDaysLater.toString() }
                }
            }

            await client.send(new PutItemCommand(putParams))
            
            const delParams = {
                TableName: "AwaitingGames",
                Key: {
                    gameName: { S: gameName }

                }
            }
            await client.send(new DeleteItemCommand(delParams))
            // deleteFromS3(gameName);
        }
        console.log("success")
        res.status(200).json({ message: "Success" });
    }
    catch (error) {
        console.log(error.message)
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

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to restore game" });
    }
}

export async function restoreGame(req, res) {
    try {
        const { gameName } = req.body;

        const getParams = {}

        const putParams = {}

        const deleteParams = {}

        res.status(200).json({ message: "Restore game endpoint hit", gameName });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to restore game" });
    }
}

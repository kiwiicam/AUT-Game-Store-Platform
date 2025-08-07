import express from 'express';
import { S3 } from '../s3Client.js';
import fs from 'fs';
import { PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import stream from 'stream';


export async function uploadGame(req, res) {
    try {
        const { gameName } = req.body;
        const { file } = req;
        console.log(file.originalname);
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Games/${gameName}/GameFiles/${file.originalname}`,
            Body: fileStream,
            ContentType: file.mimetype,
        };

        const result = await S3.send(new PutObjectCommand(uploadParams));
        res.status(200).json({
            message: "file recieved successful",
            result: result.ETag
        });
        console.log("success");
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to upload",
            message: err.message
        });
        console.log(err.message);
    }
}


export async function uploadGameImages(req, res) {
    try {
        const { gameName } = req.body;
        const files = req.files;
        const uploadResults = [];
        for (const file of files) {
            console.log(file.originalname)
            const fileStream = fs.createReadStream(file.path);
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `Games/${gameName}/Images/${file.originalname}`,
                Body: fileStream,
                ContentType: file.mimetype,
            };

            const result = await S3.send(new PutObjectCommand(uploadParams));
            uploadResults.push({ filename: file.originalname, etag: result.ETag });
        }
        res.status(200).json({
            message: "file recieved successful",
            result: uploadResults
        });
        console.log("successfuly uploaded images");

    } catch (err) {
        res.status(500).json({
            error: "Failed to upload",
            message: err.message
        });
        console.log(err.message);
    }
}

export async function retrieveGameImages(gameNameArray) {
    try {
        const gameImages = [];
        for (const gameName of gameNameArray) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: `Games/${gameName}/Images/`
            };
            const data = await S3.send(new ListObjectsV2Command(params));

            if (data.Contents && data.Contents.length > 0) {
                const item = data.Contents[0];
                const command = new GetObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: item.Key
                });
                const imageUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
                gameImages.push({ gameName, imageUrl });
            }
        }
        return gameImages;
    } catch (err) {
        console.error("Error retrieving game images:", err);
        throw err;
    }

}

export async function retrieveGameImagesGame(req, res) {
    const { gameName } = req.body
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `Games/${gameName}/Images/`
        };
        const data = await S3.send(new ListObjectsV2Command(params));
        const gameImages = []
        for (const item of data.Contents) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: item.Key
            });
            const imageUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
            gameImages.push({ imageUrl });

        }
        console.log(gameImages);
        res.status(200).json({
            message: "file retrieved successful",
            gameImages
        });

    } catch (err) {
        res.status(500).json({
            error: "Failed to upload",
            message: err.message
        });
        console.log(err.message);
    }
}

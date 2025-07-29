import express from 'express';
import { S3 } from '../s3Client.js';
import fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import stream from 'stream';


export async function uploadGame(req, res) {
    try {
        const { gamename } = req.body;
        const { file } = req;
        console.log(file.originalname);
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Games/${gamename}/GameFiles/${file.originalname}`,
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
        const { gamename } = req.body;
        const files = req.files;
        const uploadResults = [];
        for (const file of files) {
            const fileStream = fs.createReadStream(file.path);
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `Games/${gamename}/Images/${file.originalname}`,
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
        console.log("success");

    } catch (err) {
        res.status(500).json({
            error: "Failed to upload",
            message: err.message
        });
        console.log(err.message);
    }
}

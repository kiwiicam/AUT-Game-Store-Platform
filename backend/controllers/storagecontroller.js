import express from 'express';
import { S3 } from '../s3Client.js';
import fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadGame(req, res) {
    try {
        const { file } = req;
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Games/${file.originalname}`,
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
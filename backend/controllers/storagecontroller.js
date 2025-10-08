import express from 'express';
import { S3 } from '../s3Client.js';
import fs from 'fs';
import { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import stream from 'stream';
import { get } from 'http';
import { getuid } from './databasecontroller.js';
import axios from 'axios';
export async function getpfp(req,res){
const type = req.body.type;
var uid = req.body.id;

            uid = uid + '.png';
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME_PFP,
                Key: uid,
            });
          //  const s3response = await S3.send(command);

        const imageUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
        res.status(200).json({
            message: "file retrieved successful",
            imageUrl
        });


}
export async function setpfp(req,res)
{
       try {
        const  uid  = req.body.uid;
        const  file  = req.file;
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME_PFP,
            Key: `${uid}.png`,
            Body: fileStream,
            ContentType: file.mimetype,
        };

        const result = await S3.send(new PutObjectCommand(uploadParams));
        res.status(200).json({
            message: "file recieved successful",
            result: result.ETag
        });
       // console.log("success");
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to upload",
            message: err.message
        });
        console.log(err.message);
    }
}



export async function downloadGame(req,res)
{
   

        const { gamename } = req.params || null;
        const prefix  =`Games/${gamename}/GameFiles/`;
        const { game } = '';
        try
        {
            //gets the end of the folder name eg gold/gamefile/gold , to find/get gold
            const getname = new ListObjectsV2Command({
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: prefix,
                Delimiter:"/",
            });
            const getfullprefix = await S3.send(getname);
            const fullprefix  =  getfullprefix.Contents[0].Key;
            const  lastname  = fullprefix.replace(prefix,'');            
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fullprefix,
            });
            const s3response = await S3.send(command);
            res.setHeader("Content-Disposition", `attachment; filename="${lastname}"`);
            res.setHeader("Content-Type", "application/zip");

            res.setHeader("Content-Type", /*s3response.ContentType ||*/ "application/octet-stream");

            s3response.Body.pipe(res);
           
        }
        catch (err)
        {
            console.error(err);
            res.status(500).send("File not downloadable at the moment");
        }

}


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
    //alot more efficent to store the url in the database and costs less money as aws chargres per request and signed url
    //plus its valid for a set amount of time changes
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

export async function deleteFromS3(gameName) {
    try {
        const prefix = `Games/${gameName}/`;
        const listedObjects = await S3.send(
            new ListObjectsV2Command({
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: prefix,
            })
        );
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete: {
                Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
            },
        };
        await S3.send(new DeleteObjectsCommand(deleteParams));
    }
    catch (error) {
        console.log("s3 delete error")
    }

}

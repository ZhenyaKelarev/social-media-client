import dotenv from "dotenv"
import S3 from "aws-sdk/clients/s3.js"
import fs from "fs"
// const S3 = require("aws-sdk/clients/s3")
// const fs = require("fs")
dotenv.config()
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

// uploads a file to s3
const uploadFile = (file) => {
  // const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: `${Date.now()}-${file.originalname}`,
  }

  return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  }

  return s3.getObject(downloadParams).createReadStream()
}

const getFileNameFromUrl = (url) => {
  // Parse the URL
  const urlParts = url.split("/")
  // Get the last part of the path, which represents the filename
  const fileName = urlParts[urlParts.length - 1]
  return fileName
}

const deleteFile = (fileKey) => {
  console.log("fileKey", fileKey)

  const deleteParams = {
    Bucket: bucketName,
    Key: getFileNameFromUrl(fileKey),
  }

  s3.deleteObject(deleteParams, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log("deleted")
  })
}

export { uploadFile, getFileStream, deleteFile }

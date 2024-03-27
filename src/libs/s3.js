import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function getObjectUrl(fileName) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
  })

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: process.env.AWS_S3_SIGNED_URL_EXPIRE_TIME,
  })
  return url

  // not signed URL example
  // return `${process.env.AWS_S3_OBJECT_URL}/${fileName}`
}

export async function uploadFile(file, fileName, fileType) {
  const key = fileName
  const body = file
  const contentType = fileType

  const parmas = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ACL: process.env.AWS_S3_ACL,
    ContentType: contentType,
    Body: body,
  }
  const command = new PutObjectCommand(parmas)
  await s3Client.send(command)
}

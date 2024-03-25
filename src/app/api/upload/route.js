import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

async function uploadFileToS3(file, fileName, fileType) {
  const key = fileName
  const body = file
  const contentType = fileType

  const parmas = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: contentType,
    Body: body,
  }
  const command = new PutObjectCommand(parmas)
  await s3Client.send(command)
}

async function getImageUrl(fileName) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
  })
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 })
  return url
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 })
    }

    const fileExtension = file.name.split('.').slice(-1)[0]
    const newFileName = `${uuidv4()}.${fileExtension}`
    const fileType = file.type
    const buffer = Buffer.from(await file.arrayBuffer())

    await uploadFileToS3(buffer, newFileName, fileType)

    // const imageUrl = `${process.env.AWS_S3_OBJECT_URL}/${newFileName}`
    const imageUrl = await getImageUrl(newFileName)

    return NextResponse.json(imageUrl)
  } catch (error) {
    return NextResponse.json({ error })
  }
}

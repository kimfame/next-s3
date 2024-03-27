import { getObjectUrl, uploadFile } from '@/libs/s3'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json({ error: 'File is required.' }, { status: 400 })
  }

  const fileExtension = file.name.split('.').slice(-1)[0]
  const newFileName = `${uuidv4()}.${fileExtension}`
  const fileType = file.type
  const buffer = Buffer.from(await file.arrayBuffer())

  await uploadFile(buffer, newFileName, fileType)

  const imageUrl = await getObjectUrl(newFileName)
  return NextResponse.json(imageUrl)
}

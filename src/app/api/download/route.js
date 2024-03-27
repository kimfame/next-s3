import { getObjectUrl } from '@/libs/s3'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const url = new URL(req.url)
  const fileName = url.searchParams.get('fileName')

  if (fileName) {
    const imageUrl = await getObjectUrl(fileName)
    return NextResponse.json(imageUrl)
  }

  return NextResponse.json(
    { error: 'fileName is required in a query string' },
    { status: 400 },
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setImageUrl(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <>
      <h1>Upload Images to AWS S3</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {imageUrl && (
        <Image src={imageUrl} width="300" height="300" alt="Image" />
      )}
      {!imageUrl && <h2>No image</h2>}
    </>
  )
}

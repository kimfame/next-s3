'use client'

import { useState } from 'react'
import UrlImage from './UrlImage'

export default function UploadForm() {
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
    } catch (err) {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1>Upload images to AWS S3</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <UrlImage url={imageUrl} />
    </div>
  )
}

'use client'

import { useState } from 'react'
import UrlImage from './UrlImage'

export default function DownloadForm() {
  const [fileName, setFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch(`/api/download?fileName=${fileName}`)
    const data = await response.json()
    setImageUrl(data)
  }

  return (
    <div>
      <h1>Download images from AWS S3</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="image.png"
          value={fileName}
          onChange={(ev) => setFileName(ev.target.value)}
        />
        <button type="submit" disabled={!fileName}>
          Load
        </button>
      </form>

      <UrlImage url={imageUrl} />
    </div>
  )
}

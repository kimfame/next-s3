import Image from 'next/image'
import XMark from '../icons/XMark'

export default function UrlImage({ url = '' }) {
  return (
    <div className="flex flex-col m-4">
      <p className="mb-6">Image URL : {url || '-'}</p>
      <div className="mx-auto border">
        {url ? (
          <Image
            className="rounded-lg"
            src={url}
            width="320"
            height="320"
            alt="Image"
          />
        ) : (
          <XMark className="w-80 h-80" />
        )}
      </div>
    </div>
  )
}

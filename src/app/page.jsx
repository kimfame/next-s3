import DownloadForm from '@/components/layout/DownloadForm'
import UploadForm from '@/components/layout/UploadForm'

export default function Home() {
  return (
    <>
      <section className="mt-3">
        <UploadForm />
      </section>

      <hr className="w-96 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

      <section className="mt-3">
        <DownloadForm />
      </section>
    </>
  )
}

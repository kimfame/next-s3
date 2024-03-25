/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_S3_OBJECT_URL: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
}

export default nextConfig

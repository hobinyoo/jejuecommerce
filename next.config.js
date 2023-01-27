/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos', 'image.thenorthfacekorea.co.kr'],
  },
}

module.exports = nextConfig

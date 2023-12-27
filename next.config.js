/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],

    domains: ['t3.ftcdn.net', 'media.istockphoto.com', 'img.global.news.samsung.com', 'www.shutterstock.com', 'fdn2.gsmarena.com', 'cdn.discordapp.com'],
    },
    modularizeImports: {
      "react-bootstrap": {
        transform: "react-bootstrap/{{member}}",
      },
      lodash: {
        transform: "lodash/{{member}}",
      },
      
    },
    

    
    // ...
  }

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
      "react-bootstrap": {
        transform: "react-bootstrap/{{member}}",
      },
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
    images: {
      domains: ['t3.ftcdn.net', 'media.istockphoto.com', 'img.global.news.samsung.com', 'www.shutterstock.com', 'fdn2.gsmarena.com'],
    },
    // ...
  }

module.exports = nextConfig

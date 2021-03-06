/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bilder.vinmonopolet.no",
      "scontent.fosl4-1.fna.fbcdn.net",
      "www.google.com",
    ],
  },
};

module.exports = nextConfig;

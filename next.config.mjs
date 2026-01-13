/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // PBS Kids
      {
        protocol: 'https',
        hostname: 'pbskids.org',
      },
      {
        protocol: 'https',
        hostname: '**.pbskids.org',
      },
      // CBeebies / BBC
      {
        protocol: 'https',
        hostname: '**.bbc.co.uk',
      },
      // Sesame Street
      {
        protocol: 'https',
        hostname: '**.sesamestreet.org',
      },
      // Nick Jr
      {
        protocol: 'https',
        hostname: '**.nickjr.com',
      },
      // Disney
      {
        protocol: 'https',
        hostname: '**.disney.com',
      },
      {
        protocol: 'https',
        hostname: '**.disneynow.com',
      },
      // ABCya
      {
        protocol: 'https',
        hostname: '**.abcya.com',
      },
      // Starfall
      {
        protocol: 'https',
        hostname: '**.starfall.com',
      },
      // National Geographic Kids
      {
        protocol: 'https',
        hostname: '**.nationalgeographic.com',
      },
      // Fun Brain
      {
        protocol: 'https',
        hostname: '**.funbrain.com',
      },
      // Allow all for flexibility during development
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

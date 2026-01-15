import type { NextConfig } from 'next';

const remoteHostnames = [
  'lh3.googleusercontent.com',
  'img.ltwebstatic.com',
  'm.media-amazon.com',
  'www.victoriassecret.com',
  'www.bathandbodyworks.com',
  'artescooficial.com',
  's3.amazonaws.com',
  'alvapapeleria.com',
  'www.activeeprofessional.com',
  'makemore.cl',
];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: remoteHostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
      pathname: '/**',
    })),
  },
};

export default nextConfig;

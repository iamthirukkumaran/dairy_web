/**
 * The site is fully static, so it exports to plain files.
 * `NEXT_PUBLIC_BASE_PATH` is set by the Pages workflow (`/dairy_web`) and is
 * empty everywhere else, so local dev and a root-domain host both stay correct.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		// !! WARN !!
		// Ignoring TypeScript errors during build
		ignoreBuildErrors: true,
	},
	eslint: {
		// !! WARN !!
		// Ignoring ESLint errors during build
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;

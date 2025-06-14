/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: false,
	experimental: {
		typedRoutes: true,
	},
	images: {
		    domains: ['randomuser.me'],

		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'www.gstatic.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig

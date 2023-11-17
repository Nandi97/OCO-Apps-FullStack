/** @type {import('next').NextConfig} */
const { pluginoptions } = require('@mightymeld/runtime');
const nextConfig = {
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'firebasestorage.googleapis.com',
			'orarocoke-my.sharepoint.com',
			'www.dropbox.com',
			'www.oraro.co.ke',
			'openweathermap.org',
		],
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	experimental: {
		swcPlugins: [['@mightymeld/runtime/swc-plugin-mightymeld', pluginoptions()]],
	},
};

module.exports = process.env.MIGHTYMELD ? nextConfig : {};

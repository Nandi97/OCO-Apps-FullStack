import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				ocobrown: {
					50: '#fbf7ef',
					100: '#f4e8d1',
					200: '#e8ce9f',
					300: '#dcb26d',
					400: '#d3994c',
					500: '#ca7d36',
					600: '#a65a2a',
					700: '#944729',
					800: '#7a3a26',
					900: '#653022',
					950: '#39180f',
				},
				ocoblue: {
					50: '#f5f7fa',
					100: '#e9eef5',
					200: '#cfdbe8',
					300: '#a5bdd4',
					400: '#7499bc',
					500: '#527ca5',
					600: '#3f638a',
					700: '#385678',
					800: '#2e455e',
					900: '#2b3c4f',
					950: '#1c2735',
				},
			},
		},
	},
	plugins: [],
};
export default config;

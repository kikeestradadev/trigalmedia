/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,js,pug}",
		"./public/**/*.html"
	],
	darkMode: 'class',
	theme: {
		screens: {
			's': '0px',
			'sm': '480px',
			'm': '640px',
			'l': '960px',
			'lg': '1280px',
			'xl': '1600px',
			'xxl': '1920px',
		},
		extend: {},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
} 

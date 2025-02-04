const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [typography, daisyui],

	daisyui: {
		themes: ['light']
	}
};

module.exports = config;

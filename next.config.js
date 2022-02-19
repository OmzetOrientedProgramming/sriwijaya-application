const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
		fallbacks: {
			// image: '/icon-192x192.png',
			// document: '/other-offline',  // if you want to fallback to a custom    page other than /_offline
			// font: '/static/font/fallback.woff2',
			// audio: ...,
			// video: ...,
		},
		disable: process.env.NODE_ENV === "development",
	}
});
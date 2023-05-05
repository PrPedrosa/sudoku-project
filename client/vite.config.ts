import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			/* devOptions: { enabled: true }, */
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
			},
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
			strategies: "generateSW",
			manifest: {
				name: "Sudoku Game",
				short_name: "Sudoku",
				description: "Simple Sudoku Game",
				theme_color: "#1e2124",
				background_color: "#1e2124",
				orientation: "portrait",
				icons: [
					/* FOR PROD UNCOMMENT BELOW AND COMMENT THESE */
					/* {
						src: "/icons/maskable_icon_192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/icons/maskable_icon_192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any"
					},
					{
						src: "/icons/maskable_icon_512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/icons/maskable_icon_512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any"
					} */
					{
						src: "/assets/maskable_icon_192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/assets/maskable_icon_192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any"
					},
					{
						src: "/assets/maskable_icon_512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/assets/maskable_icon_512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any"
					}
				]
			}
		})
	]
})

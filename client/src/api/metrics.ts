import Axios from "axios"

export async function addVisit() {
	try {
		await Axios.post(`${import.meta.env.VITE_API_URL}/metrics/visit`)
	} catch (error) {
		console.log("error posting visit", error)
	}
}

export async function addDownload() {
	try {
		await Axios.post(`${import.meta.env.VITE_API_URL}/metrics/download`)
	} catch (error) {
		console.log("error posting download", error)
	}
}

export async function getDownloads() {
	try {
		const res = await Axios.get<number>(
			`${import.meta.env.VITE_API_URL}/metrics/download`
		)
		return res.data
	} catch (error) {
		console.log("error getting downloads", error)
	}
}

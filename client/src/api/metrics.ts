import Axios from "axios"
import { apiUrl } from "./api-config.js"

export async function addVisit() {
	try {
		await Axios.post(`${apiUrl}/metrics/visit`)
	} catch (error) {
		console.log("error posting visit", error)
	}
}

export async function addDownload() {
	try {
		await Axios.post(`${apiUrl}/metrics/download`)
	} catch (error) {
		console.log("error posting download", error)
	}
}

export async function getDownloads() {
	try {
		const res = await Axios.get<number>(`${apiUrl}/metrics/download`)
		return res.data
	} catch (error) {
		console.log("error getting downloads", error)
	}
}

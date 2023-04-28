import Axios from "axios"

export async function addVisit() {
	try {
		const res = await Axios.post("http://localhost:3000/metrics/visit")
		console.log("visit", res)
	} catch (error) {
		console.log("error posting visit", error)
	}
}

export async function addDownload() {
	try {
		const res = await Axios.post("http://localhost:3000/metrics/download")
		console.log("download", res)
	} catch (error) {
		console.log("error posting download", error)
	}
}

export async function getDownloads() {
	try {
		const res = await Axios.get<number>(
			"http://localhost:3000/metrics/download"
		)
		return res.data
	} catch (error) {
		console.log("error getting downloads", error)
	}
}

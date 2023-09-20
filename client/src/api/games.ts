import Axios from "axios"
import { apiUrl } from "./api-config.js"

export async function addGame(game: GameData) {
	try {
		const res = await Axios.post<"too slow" | "added">(`${apiUrl}/games/game`, {
			game
		})
		return res.data
	} catch (error) {
		console.log("ERROR posting game => ", error)
	}
}

export async function getGames() {
	try {
		const res = await Axios.get<GameData[][]>(`${apiUrl}/games/all`)
		return res.data
	} catch (error) {
		console.log("ERROR fetching all games => ", error)
		return null
	}
}

export type GameData = { user: string; time: number; difficulty: string }

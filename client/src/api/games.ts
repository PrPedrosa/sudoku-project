import Axios from "axios"

export async function addGame(game: GameData) {
	try {
		const res = await Axios.post<"too slow" | "added">(
			`${import.meta.env.VITE_API_URL}/games/game`,
			{
				game
			}
		)
		return res.data
	} catch (error) {
		console.log("ERROR posting game => ", error)
	}
}

export async function getGames() {
	try {
		const res = await Axios.get<GameData[][]>(
			`${import.meta.env.VITE_API_URL}/games/all`
		)
		return res.data
	} catch (error) {
		console.log("ERROR fetching all games => ", error)
		return null
	}
}

export type GameData = { user: string; time: number; difficulty: string }

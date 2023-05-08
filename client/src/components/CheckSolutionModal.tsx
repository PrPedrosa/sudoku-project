import { useEffect, useState } from "react"
import { buildClock } from "./Timer"
import { addGame } from "../api/games"
import SVG from "./SVG"
import { cx } from "../utils"

export function CheckSolutionModal({
	solution,
	retry,
	checkSolution,
	time,
	mode,
	goBack
}: {
	solution: boolean
	retry: boolean
	checkSolution: (time: number) => void
	time: number
	mode?: "easy" | "medium" | "hard"
	goBack: () => void
}) {
	const [finalTime, setFinalTime] = useState(0)
	const [name, setName] = useState("")
	const [added, setAdded] = useState<boolean | "error" | "too slow">(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setFinalTime(time)
	}, [solution])

	if (solution) {
		return (
			<>
				{/* opacity */}
				<div className='fixed bg-c-dark1 z-20 top-0 left-0 opacity-[70%] w-[100%] h-[100%]' />
				{/* element */}
				<div className='absolute text-white z-[100] top-0 left-0 flex items-center justify-center h-full w-full'>
					<div className='flex flex-col bg-c-dark1 text-white items-center justify-center py-[20px] px-[10px] rounded-[10px] border-2 border-c-purple gap-[5px]'>
						<div className='text-green-700 font-semibold border border-green-700 p-[2px] rounded-[5px] mb-[5px]'>
							PERFECT!
						</div>
						<div className='flex gap-[25px]'>
							<div className='flex flex-col items-center mb-[5px]'>
								<div className='text-[14px] leading-[100%] mb-[5px]'>
									Player:
								</div>
								<input
									type='text'
									value={name}
									placeholder='You'
									className='w-[70px] rounded-[5px] bg-transparent border border-c-dark4 text-center'
									autoFocus
									maxLength={4}
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className='flex flex-col items-center'>
								<div className='text-[14px] leading-[100%] mb-[5px]'>
									Solved in:
								</div>
								<div className='font-semibold'>{buildClock(finalTime)}</div>
							</div>
						</div>
						<div className='flex gap-[10px]'>
							<div
								onClick={() => setTimeout(() => goBack(), 100)}
								className='text-[14px] bg-c-dark3 p-[4px] rounded-[5px] shadow-button-back active:bg-red-700 mt-[5px]'
							>
								Home Menu
							</div>
							<div
								onClick={() => {
									if (added || !mode) return
									setLoading(true)
									addGame({
										user: name ? name : "Anon",
										time: finalTime,
										difficulty: mode
									}).then(res => {
										if (res === undefined) {
											setAdded("error")
										} else if (res === "too slow") {
											setAdded("too slow")
										} else {
											setAdded(true)
										}
										setLoading(false)
									})
								}}
								className={cx(
									"text-[14px] bg-c-dark3 p-[4px] rounded-[5px] active:bg-green-700 mt-[5px] text-center w-[114px] flex justify-center",
									{
										"active:bg-red-700 shadow-button-back":
											typeof added === "string",
										"shadow-button-easy": typeof added === "boolean"
									}
								)}
							>
								{!loading && added === false ? (
									"Add to HiScores!"
								) : loading ? (
									<SVG
										path='spinner'
										fill='#ffffff'
										w={25}
										h={25}
										className='animate-spin text-center'
									/>
								) : added === "error" ? (
									"Error adding :("
								) : added === "too slow" ? (
									"Too slow :("
								) : (
									"Added! :)"
								)}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	if (retry) {
		return (
			<div className='absolute text-red-700 z-[100] bottom-[50px] bg-c-dark2 p-[5px] font-semibold rounded-[10px] shadow-button-back'>
				Solution is WRONG
			</div>
		)
	}

	/* button */
	return (
		<div
			className='absolute text-white z-[100] bottom-[50px] border border-c-purple p-[5px] rounded-[10px] bg-c-dark2 active:bg-c-purple cursor-pointer'
			onClick={() =>
				setTimeout(() => {
					checkSolution(time)
				}, 100)
			}
		>
			Check Solution
		</div>
	)
}

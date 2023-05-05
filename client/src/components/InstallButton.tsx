import { useEffect, useState } from "react"
import SVG from "./SVG"
import { addDownload, getDownloads } from "../api/metrics"
import { cx } from "../utils"

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState<null | any>(null)
	const [numOfDownloads, setNumOfDownloads] = useState<number>()

	type BIPEventResult = {
		outcome: "accepted" | "dismissed"
		platform: string
	}

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault()
			setSupportsPWA(true)
			setPromptInstall(e)
			console.log("before install prompt triggers")
			e.userChoice.then((result: BIPEventResult) => {
				if (result.outcome !== "accepted") return
				addDownload()
			})
		}
		window.addEventListener("beforeinstallprompt", handler)
		getDownloads().then(num => {
			setNumOfDownloads(num)
		})
		//why need this?
		return () => window.removeEventListener("transitionend", handler)
	}, [])

	const onClick = (evt: any) => {
		evt.preventDefault()
		if (!promptInstall) return
		promptInstall.prompt()
	}

	//if (!supportsPWA) return null

	return (
		<div className='flex flex-col gap-[5px] fixed top-[20px] left-[20px] z-40'>
			<button
				className={cx(
					"flex items-center gap-[5px] ",
					"text-[14px] bg-[#f8f8f8] border border-c-purple text-c-purple rounded-[5px] p-[2px]",
					{ "opacity-[0.5]": !supportsPWA }
				)}
				aria-label='Install app'
				title='Install app'
				onClick={onClick}
			>
				<SVG path='download' fill='#7289da' w={20} h={20} className='p-[3px]' />
				<div>Download!</div>
			</button>
			{numOfDownloads && numOfDownloads > 9 && (
				<div className='text-white text-[12px]'>
					downloads: {numOfDownloads}
				</div>
			)}
		</div>
	)
}

export default InstallPWA

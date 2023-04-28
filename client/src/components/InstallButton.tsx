import { useEffect, useState } from "react"
import SVG from "./SVG"
import { addDownload, getDownloads } from "../api/metrics"
import { cx } from "../utils"

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState<null | any>(null)
	const [numOfDownloads, setNumOfDownloads] = useState<number>()

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault()
			setSupportsPWA(true)
			setPromptInstall(e)
			e.userChoice.then((result: string) => {
				console.log("user accepted download")
				if (result !== "accepted") return
				addDownload()
			})
		}
		window.addEventListener("beforeinstallprompt", handler)
		getDownloads().then(num => {
			console.log("num of downloassd", num)
			setNumOfDownloads(num)
		})
		return () => window.removeEventListener("transitionend", handler)
	}, [])

	const onClick = (evt: any) => {
		evt.preventDefault()
		if (!promptInstall) return
		promptInstall.prompt()
	}

	//if (!supportsPWA) return null

	return (
		<button
			className={cx(
				"flex items-center gap-[5px] fixed top-[20px] left-[20px] z-40",
				"text-[14px] bg-[#f8f8f8] border border-c-purple text-c-purple rounded-[5px] p-[2px]",
				{ "opacity-[0.5]": !supportsPWA }
			)}
			aria-label='Install app'
			title='Install app'
			onClick={onClick}
		>
			<SVG path='download' fill='#7289da' w={20} h={20} className='p-[3px]' />
			<div>Download! {numOfDownloads}</div>
		</button>
	)
}

export default InstallPWA

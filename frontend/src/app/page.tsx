"use client";
import Pong  from "@/components/pong";
import { Canvas, canvasContext } from "../components/interface";

export default function Home() {

	const canvas :Canvas ={
		width: 600,
		height: 400,
	}
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[#393f4d]">
			<canvasContext.Provider value={canvas}>
				<Pong/>
			</canvasContext.Provider>
		</div>
	)
}


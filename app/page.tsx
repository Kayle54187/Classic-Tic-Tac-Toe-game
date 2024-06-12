"use client";

import { boxesNumber, winingStates } from "@/constants";
import { TBoxesNumberType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "./_components/Box";
import { useGetRandomXOrO } from "./_hooks/useGetRandomSumbol";

export default function Home() {
	const randomSymbol = useGetRandomXOrO();

	const [boxes, setBoxes] = useState<TBoxesNumberType[]>(boxesNumber);
	const [currentChance, setCurrentChance] = useState(randomSymbol);
	const [xChances, setXChances] = useState<number[]>([]);
	const [ZeroChances, setZeroChances] = useState<number[]>([]);
	const [win, setWin] = useState<"X" | "O" | "Draw" | null>(null);

	const checkWinningCondition = (array: number[]) => {
		for (const winState of winingStates) {
			// Check if every element in winState is present in the array
			if (winState.every((num) => array.includes(num))) {
				sendMessageToTelegram();
				return true; // If found, return true
			}
		}
		return false; // If no winning state is found, return false
	};

	const handleReset = () => {
		setCurrentChance(randomSymbol);
		setXChances([]);
		setZeroChances([]);
		setWin(null);
		setBoxes(boxesNumber);
	};

	const handleOnClickBox = (boxNumber: number) => {
		// x chnace
		if (currentChance === "X") {
			const updatedBoxes: TBoxesNumberType[] = boxes.map((d) =>
				d.boxNo == boxNumber ? { boxNo: boxNumber, chance: "X" } : d
			);
			setBoxes(updatedBoxes);

			setXChances([...xChances, boxNumber]);
			setCurrentChance("O");
		}

		// zero chnace
		if (currentChance === "O") {
			const updatedBoxes: TBoxesNumberType[] = boxes.map((d) =>
				d.boxNo == boxNumber ? { boxNo: boxNumber, chance: "0" } : d
			);
			setBoxes(updatedBoxes);

			setZeroChances([...ZeroChances, boxNumber]);
			setCurrentChance("X");
		}
	};

	const { mutate: sendMessageToTelegram, isPending: loading } = useMutation({
		onSuccess: (res) => {},
		onError: (error) => {},
		mutationFn: (message) =>
			axios.post(`/api`, {
				message: "Test successful",
			}),
	});

	useEffect(() => {
		const xWin = checkWinningCondition(xChances);
		const ZeroWin = checkWinningCondition(ZeroChances);
		const allBoxesFill = boxes.every((d) => typeof d.chance == "string");

		if (xWin) {
			setWin("X");
		}
		if (ZeroWin) {
			setWin("O");
		}
		if (!xWin && !ZeroWin && allBoxesFill) {
			setWin("Draw");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [xChances, ZeroChances]);

	return (
		<div className="min-h-screen flex items-center justify-center w-full bg-black text-white flex-col">
			<main className="w-full  max-w-[400px] flex flex-col gap-4">
				{/* chance */}
				<section className="flex justify-between  ">
					<p className="text-2xl">
						<span>Chance : </span>
						<span className="font-bold text-3xl text-blue-400">
							{currentChance}
						</span>
					</p>
					<button
						onClick={handleReset}
						className="bg-white text-black px-4 rounded font-semibold"
					>
						Rematch
					</button>
				</section>

				{/* boxes */}
				<section className=" gap-2 grid grid-cols-3 w-full  max-w-[400px] h-[400px]  ">
					{boxes.map((d, i) => (
						<Box
							win={win}
							xChances={xChances}
							ZeroChances={ZeroChances}
							chance={d.chance}
							boxNumber={d.boxNo}
							handleOnClickBox={handleOnClickBox}
							key={i}
						/>
					))}
				</section>
				{/* winners */}
				<section className="text-3xl">
					{win === "O" && <p> 0 Win </p>}
					{win === "X" && <p> X Win </p>}
					{win === "Draw" && <p> Draw </p>}
				</section>
			</main>
		</div>
	);
}

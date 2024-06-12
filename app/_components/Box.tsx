import { cn } from "@/utils";

interface IBoxProps {
	boxNumber: number;
	chance: "X" | "0" | null;
	win: "X" | "O" | "Draw" | null;
	xChances: number[];
	ZeroChances: number[];
	handleOnClickBox: (boxNumber: number) => void;
}

const Box: React.FC<IBoxProps> = ({
	boxNumber,
	handleOnClickBox,
	xChances,
	ZeroChances,
	chance,
	win,
}) => {
	const handleClick = () => {
		handleOnClickBox(boxNumber);
	};

	const btnDisabled =
		xChances.includes(boxNumber) ||
		ZeroChances.includes(boxNumber) ||
		win !== null;

	return (
		<button
			disabled={btnDisabled}
			onClick={handleClick}
			className={cn(
				"min-w-32 min-h-32  rounded-md bg-white text-black  flex items-center justify-center text-4xl font-bold  border-4 border-transparent",
				btnDisabled && "cursor-not-allowed",
				chance == "X" && "text-blue-400  border-blue-400 "
			)}
		>
			{chance}
		</button>
	);
};

export default Box;

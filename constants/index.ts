import { TBoxesNumberType } from "@/types";

const winingStates = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	//
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	//
	[1, 5, 9],
	[3, 5, 7],
];

const boxesNumber: TBoxesNumberType[] = [
	{ boxNo: 1, chance: null },
	{ boxNo: 2, chance: null },
	{ boxNo: 3, chance: null },
	{ boxNo: 4, chance: null },
	{ boxNo: 5, chance: null },
	{ boxNo: 6, chance: null },
	{ boxNo: 7, chance: null },
	{ boxNo: 8, chance: null },
	{ boxNo: 9, chance: null },
];

export { winingStates, boxesNumber };

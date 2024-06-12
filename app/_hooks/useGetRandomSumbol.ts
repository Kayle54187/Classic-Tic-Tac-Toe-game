const useGetRandomXOrO = () => {
	// Generate a random number (0 or 1)
	const randomNum = Math.floor(Math.random() * 2);
	// Return 'X' if randomNum is 0, otherwise return 'O'
	return randomNum === 0 ? "X" : "O";
};

export { useGetRandomXOrO };

interface CountNumberOfNeighboursProps {
	grid: boolean[][];
	centreCoordinates: number[];
	gridDimensions: number[];
}

export const countNumberOfNeighbours = ({
	grid,
	centreCoordinates,
	gridDimensions,
}: CountNumberOfNeighboursProps): number => {
	const neighbourCoordinates = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	return neighbourCoordinates.reduce((neighbourCount, neighbourCoords) => {
		const rowLocation =
			(centreCoordinates[0] + neighbourCoords[0] + gridDimensions[0]) %
			gridDimensions[0];
		const colLocation =
			(centreCoordinates[1] + neighbourCoords[1] + gridDimensions[1]) %
			gridDimensions[1];
		return grid[rowLocation][colLocation] ? neighbourCount + 1 : neighbourCount;
	}, 0);
};

import { Cell } from "./cell";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { countNumberOfNeighbours } from "../utils/grid_helper";

const CellRow = styled.div`
  display: flex;
  `;

const ROW_COUNT = 50;
const COL_COUNT = 50;

const EMPTY_ROW = new Array(COL_COUNT).fill(false);
let EMPTY_GRID: boolean[][] = [];
for (let i = 0; i < ROW_COUNT; i++) {
	EMPTY_GRID.push([...EMPTY_ROW]);
}

// TODO: delete this, need to create a file of different patters for quick loading
EMPTY_GRID[0][3] = true;
EMPTY_GRID[1][4] = true;
EMPTY_GRID[2][2] = true;
EMPTY_GRID[2][3] = true;
EMPTY_GRID[2][4] = true;

export const Grid = () => {
	const [currentGrid, setCurrentGrid] = useState(EMPTY_GRID);

	const newCreateNextGrid = useCallback(
		(existingGrid: boolean[][]) =>
			existingGrid.map((row, rowCoord) =>
				row.map((cellValue, colCoord) => {
					const neighbourCount = countNumberOfNeighbours({
						grid: existingGrid,
						centreCoordinates: [rowCoord, colCoord],
						gridDimensions: [ROW_COUNT, COL_COUNT],
					});

					// Death conditions (a dead cell with 2 neighbours remains dead)
					if (
						neighbourCount >= 4 ||
						neighbourCount <= 1 ||
						(neighbourCount === 2 && !cellValue)
					) {
						return false;
					} else {
						return true;
					}
				}),
			),
		[],
	);

	const setNextStep = () => {
		setCurrentGrid(newCreateNextGrid);
	};

	// TODO: This isn't great, ideally would have an interval being set (with a custom hook)
	const runSim = () => {
		setNextStep();
		setTimeout(runSim, 100);
	};

	const onDrawGrid = (
		isActive: boolean,
		rowCoord: number,
		colCoord: number,
	) => {
		const clonedGrid = currentGrid.map((row) => [...row]);
		clonedGrid[rowCoord][colCoord] = isActive;
		setCurrentGrid(clonedGrid);
	};

	return (
		<div>
			{currentGrid.map((row, rowCoord) => (
				<CellRow key={`row-${rowCoord}`}>
					{row.map((cellIsActive, colCoord) => (
						<Cell
							key={`cell-${rowCoord}-${colCoord}`}
							isActive={cellIsActive}
							toggleIsActive={(isActive) => {
								onDrawGrid(isActive, rowCoord, colCoord);
							}}
						/>
					))}
				</CellRow>
			))}
			<button onClick={setNextStep}>Next Step</button>
			<button onClick={() => runSim()}>START</button>
		</div>
	);
};

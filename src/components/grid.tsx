import { Cell } from "./cell"
import styled from "styled-components";
import { DumbCell } from "./dumb_cell";
import { useCallback, useState } from "react";

const CellRow = styled.div`
  display: flex;
  `

const ROW_COUNT = 8;
const COL_COUNT = 8;

const EMPTY_ROW = new Array(COL_COUNT).fill(false)
let EMPTY_GRID: boolean[][] = []
for (let i = 0; i < ROW_COUNT; i++) {
  EMPTY_GRID.push([...EMPTY_ROW])
}

let CLONED_GRID = EMPTY_GRID.map(row => {
  return [...row]
})


CLONED_GRID[0][3] = true;
CLONED_GRID[1][4] = true;
CLONED_GRID[2][2] = true;
CLONED_GRID[2][3] = true;
CLONED_GRID[2][4] = true;


const countNumberOfNeighbours = (grid: boolean[][], centreCoordinates: number[]): number => {
  const neighbourCoordinates = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]

  return neighbourCoordinates.reduce(
    (neighbourCount, neighbourCoords) => {
      const rowLocation = (centreCoordinates[0] + neighbourCoords[0] + ROW_COUNT) % ROW_COUNT;
      const colLocation = (centreCoordinates[1] + neighbourCoords[1] + COL_COUNT) % COL_COUNT;
      return grid[rowLocation][colLocation] ? neighbourCount + 1 : neighbourCount
    },
    0
  )
}

export const Grid = () => {

  const [currentGrid, setCurrentGrid] = useState(CLONED_GRID)
  const newCreateNextGrid = useCallback(
    (existingGrid: boolean[][]) => existingGrid.map(
      (row, rowCoord) =>
        row.map((cellValue, colCoord) => {
          const neighbourCount = countNumberOfNeighbours(existingGrid, [rowCoord, colCoord])
          // Death conditions (a dead cell with 2 neighbours remains dead)
          if (neighbourCount >= 4 || neighbourCount <= 1 || neighbourCount == 2 && !cellValue) {
            return false
          } else {
            return true
          }
        }
        )
    ), [])

  const setNextStep = () => {
    setCurrentGrid(newCreateNextGrid)
  }

  const startSimulation = () => {
    setNextStep()
    setTimeout(startSimulation, 500)
  }

  return (
    <div>
      {currentGrid.map(
        row => (
          <CellRow>
            {row.map(cellValue => (
              <DumbCell isActive={cellValue} />
            ))}
          </CellRow>
        )
      )
      }
      <button onClick={setNextStep}>Next</button>
      <button onClick={startSimulation}>Start</button>

    </div>
  )
}

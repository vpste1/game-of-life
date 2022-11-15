import styled from "styled-components";

interface CellProps {
	isActive: boolean;
	toggleIsActive: (isActive: boolean) => void;
}

interface CellSpanProps {
	isActive: boolean;
}

const StyledCell = styled.span<CellSpanProps>`
  display: block;
  height: 4px;
  width: 4px;
  border: 2px solid white;
  background-color: ${(props) => (props.isActive ? "blue" : "white")}
`;

export const Cell = ({ isActive, toggleIsActive }: CellProps) => {
	return (
		<StyledCell
			isActive={isActive}
			draggable={false}
			onMouseEnter={(event) => {
				event.buttons === 1 && toggleIsActive(!isActive);
			}}
			onMouseDown={() => toggleIsActive(!isActive)}
		/>
	);
};

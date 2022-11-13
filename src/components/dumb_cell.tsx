import styled from "styled-components"

interface CellProps {
  readonly isActive: boolean;
}

const StyledCell = styled.span<CellProps>`
  display: block;
  height: 20px;
  width: 20px;
  background-color: ${props => props.isActive ? 'blue' : 'red'}
`

export const DumbCell = ({ isActive }: CellProps) => (
  <StyledCell isActive={isActive} />
)

import styled from "styled-components";
import { Game } from "./components/game";

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: centre;
`;

function App() {
	return (
		<AppContainer>
			<Game />
		</AppContainer>
	);
}

export default App;

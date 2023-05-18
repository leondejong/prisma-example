import styled from "styled-components";

import List from "./List";

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: Avenir, Lato, sans-serif;
`;

function App() {
  return (
    <Main>
      <List />
    </Main>
  );
}

export default App;

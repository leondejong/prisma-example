import styled from "styled-components";

import List from "./List";

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Lato, sans-serif;
`;

const Heading = styled.h1`
  margin: 1rem;
  font-family: Avenir, Lato, sans-serif;
  font-size: 3rem;
`;

function App() {
  return (
    <Main>
      <Heading>Item List</Heading>
      <List />
    </Main>
  );
}

export default App;

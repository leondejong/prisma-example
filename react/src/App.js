import styled from 'styled-components'
import List from './List'

const Main = styled.main`
  position: absolute;
  left: 50%;
  width: 60rem;
  min-height: 100%;
  transform: translateX(-50%);
`

function App () {
  return (
    <Main>
      <List />
    </Main>
  )
}

export default App

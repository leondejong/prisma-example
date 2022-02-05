import { gql, useQuery, useMutation } from '@apollo/client'
import styled from 'styled-components'

import Item from './Item'
import { Button } from './Elements'

const GET_LIST = gql`
  query GetList {
    getList {
      id
      name
      content
      active
    }
  }
`

const ADD_ITEM = gql`
  mutation AddItem($name: String, $content: String, $active: Boolean) {
    addItem(name: $name, content: $content, active: $active) {
      id
      name
      content
      active
    }
  }
`

const Table = styled.table`
  width: 100%;
  padding: 1rem;
  border-spacing: 0.125rem;
`

const Body = styled.tbody`
  background: rgba(47, 47, 47, 1);
`

const Info = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Options = styled.section`
  margin: 0 1rem;
  text-align: right;
`

function List () {
  const { loading, error, data } = useQuery(GET_LIST)
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: ['GetList']
  })

  if (loading) return <Info>Loading...</Info>
  if (error) return <Info>{String(error)}</Info>

  return (
    <>
      <Table>
        <Body>
          {data.getList.map(({ id, name, content, active }) => (
            <Item
              key={id}
              id={id}
              name={name}
              content={content}
              active={active}
            />
          ))}
        </Body>
      </Table>
      <Options>
        <Button
          onClick={() =>
            addItem({
              variables: { name: '...', content: '...', active: false }
            })
          }
        >
          Add Item
        </Button>
      </Options>
    </>
  )
}

export default List

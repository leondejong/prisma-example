import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";

import type { Item } from "./types";

import ItemComponent from "./Item";
import { AddButton } from "./Elements";

const item = { name: "Name", content: "Content", active: false };

const GET_LIST = gql`
  query GetList {
    getList {
      id
      name
      content
      active
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($name: String, $content: String, $active: Boolean) {
    addItem(name: $name, content: $content, active: $active) {
      id
      name
      content
      active
    }
  }
`;

const Table = styled.table`
  width: 67%;
  margin: 1rem;
  border-spacing: 0.125rem;
`;

const Body = styled.tbody`
  background: rgba(31, 39, 47, 1);
`;

const Options = styled.section`
  margin: 1rem;
  width: 67%;
  text-align: left;
`;

const Info = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function ListComponent() {
  const { loading, error, data } = useQuery(GET_LIST);
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: ["GetList"],
  });

  if (loading) return <Info>Loading...</Info>;
  if (error) return <Info>{String(error)}</Info>;

  return (
    <>
      <Table>
        <Body>
          {data.getList.map((item: Item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </Body>
      </Table>
      <Options>
        <AddButton
          onClick={() =>
            addItem({
              variables: item,
            })
          }
        >
          Add Item
        </AddButton>
      </Options>
    </>
  );
}

export default ListComponent;

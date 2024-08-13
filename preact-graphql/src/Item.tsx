import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

import type { Item } from "./types";

import { DeleteButton, InputText } from "./Elements";

type ItemProps = {
  item: Item;
};

const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: ID
    $name: String
    $content: String
    $active: Boolean
  ) {
    updateItem(id: $id, name: $name, content: $content, active: $active) {
      id
      name
      content
      active
    }
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItem($id: ID) {
    removeItem(id: $id) {
      id
      name
      content
      active
    }
  }
`;

const Row = styled.tr`
  text-align: center;
`;

const Data = styled.td`
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-weight: 700;
`;

function ItemComponent(props: ItemProps) {
  const { item } = props;
  const { id, name, content, active } = item;

  const [updateItem] = useMutation<Item>(UPDATE_ITEM, {
    refetchQueries: ["GetList"],
  });

  const [removeItem] = useMutation<Item>(REMOVE_ITEM, {
    refetchQueries: ["GetList"],
  });

  return (
    <Row>
      <Data>{id}</Data>
      <Data>
        <input
          type="checkbox"
          checked={active}
          onChange={(event) =>
            updateItem({ variables: { id, active: event.target.checked } })
          }
        />
      </Data>
      <Data>
        <InputText
          type="text"
          value={name}
          onChange={(event) =>
            updateItem({ variables: { id, name: event.target.value } })
          }
        />
      </Data>
      <Data>
        <InputText
          type="text"
          value={content}
          onChange={(event) =>
            updateItem({ variables: { id, content: event.target.value } })
          }
        />
      </Data>
      <Data>
        <DeleteButton onClick={() => removeItem({ variables: { id } })}>
          Remove
        </DeleteButton>
      </Data>
    </Row>
  );
}

export default ItemComponent;

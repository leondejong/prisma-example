import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

import { Button, InputText } from "./Elements";

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

const Delete = styled(Button)`
  padding: 0.125rem 0.25rem;
  background: rgba(255, 0, 0, 1);
  border-radius: 0.25rem;
  &:hover,
  &:focus,
  &:active {
    background: rgba(255, 63, 63, 1);
  }
  &::after {
    content: "✕";
  }
`;

function Item(props) {
  const { id, name, content, active } = props;

  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: ["GetList"],
  });

  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: ["GetList"],
  });

  const onChange = (variables) => {
    updateItem({ variables });
  };

  const onClick = (variables) => {
    removeItem({ variables });
  };

  return (
    <Row>
      <Data>{id}</Data>
      <Data>
        <InputText
          type="text"
          value={name}
          onChange={(event) => onChange({ id, name: event.target.value })}
        />
      </Data>
      <Data>
        <InputText
          type="text"
          value={content}
          onChange={(event) => onChange({ id, content: event.target.value })}
        />
      </Data>
      <Data>
        <input
          type="checkbox"
          checked={active}
          onChange={(event) => onChange({ id, active: event.target.checked })}
        />
      </Data>
      <Data>
        <Delete onClick={() => onClick({ id })}></Delete>
      </Data>
    </Row>
  );
}

export default Item;

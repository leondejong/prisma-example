import { useState } from "preact/hooks";

import styled from "styled-components";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Item } from "./types";

type ItemProps = {
  item: Item;
};

import { DeleteButton, InputText } from "./Elements";

const api = "http://127.0.0.1:3333";

const init = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Row = styled.tr`
  text-align: center;
`;

const Data = styled.td`
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-weight: 700;
`;

function ItemComponent(props: ItemProps) {
  const [item, setItem] = useState(props.item);

  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: (item: Item) =>
      fetch(`${api}/item/${item.id}`, {
        ...init,
        method: "PUT",
        body: JSON.stringify(item),
      }).then((response) => response.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  const remove = useMutation({
    mutationFn: (item: Item) =>
      fetch(`${api}/item/${item.id}`, {
        ...init,
        method: "DELETE",
      }).then((response) => response.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  function updateItem(item: Item) {
    setItem((i) => ({ ...i, ...item }));
    update.mutate(item);
  }

  function removeItem(item: Item) {
    remove.mutate(item);
  }

  return (
    <Row>
      <Data>{item.id}</Data>
      <Data>
        <input
          type="checkbox"
          checked={item.active}
          onChange={(event) =>
            updateItem({ id: item.id, active: event.target.checked })
          }
        />
      </Data>
      <Data>
        <InputText
          type="text"
          value={item.name}
          onChange={(event) =>
            updateItem({ id: item.id, name: event.target.value })
          }
        />
      </Data>
      <Data>
        <InputText
          type="text"
          value={item.content}
          onChange={(event) =>
            updateItem({ id: item.id, content: event.target.value })
          }
        />
      </Data>
      <Data>
        <DeleteButton onClick={() => removeItem({ id: item.id })}>
          Remove
        </DeleteButton>
      </Data>
    </Row>
  );
}

export default ItemComponent;

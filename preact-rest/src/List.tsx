import styled from "styled-components";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { Item } from "./types";

import ItemComponent from "./Item";
import { AddButton } from "./Elements";

const api = "http://127.0.0.1:3333";

const init = {
  headers: {
    "Content-Type": "application/json",
  },
};

const item = { name: "Name", content: "Content", active: false };

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
  const queryClient = useQueryClient();

  const {
    isPending: loading,
    error,
    data,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`${api}/list`, {
        ...init,
      }).then((res) => res.json()),
  });

  const add = useMutation({
    mutationFn: (item: Item) =>
      fetch(`${api}/item`, {
        ...init,
        method: "POST",
        body: JSON.stringify(item),
      }).then((response) => response.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  function addItem(item: Item) {
    add.mutate(item);
  }

  if (loading) return <Info>Loading...</Info>;
  if (error) return <Info>{String(error)}</Info>;

  return (
    <>
      <Table>
        <Body>
          {data.list.map((item: Item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </Body>
      </Table>
      <Options>
        <AddButton onClick={() => addItem(item)}>Add Item</AddButton>
      </Options>
    </>
  );
}

export default ListComponent;

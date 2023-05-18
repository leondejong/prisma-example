import styled, { css } from "styled-components";

const input = css`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: rgba(47, 51, 55, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
  border: none;
  outline: none;
  &:hover,
  &:focus,
  &:active {
    background: rgba(63, 67, 71, 1);
  }
`;

const Button = styled.button`
  ${input}
  background: rgba(0, 127, 255, 1);
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    background: rgba(0, 191, 255, 1);
  }
`;

const InputText = styled.input`
  ${input}
  width: calc(100% - 2rem);
`;

export { input, Button, InputText };

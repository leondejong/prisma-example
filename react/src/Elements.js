import styled, { css } from 'styled-components'

const input = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(63, 63, 63, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
    background: rgba(95, 95, 95, 1);
  }
`

const Button = styled.button`
  ${input}
  background: rgba(0, 127, 255, 1);
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    background: rgba(0, 191, 255, 1);
  }
`

const InputText = styled.input`
  ${input}
  width: calc(100% - 2rem);
`

export { input, Button, InputText }

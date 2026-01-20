import styled from "styled-components";

export const DeleteButton = styled.button`
  opacity: 0;
  pointer-events: none;

  width: 32px;
  height: 32px;

  background: #fee2e2;
  border-radius: 8px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  tr:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  &:hover {
    background: #fecaca;
  }

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s ease;
  }

  svg {
    fill: #b91c1c;
    transition: fill 0.2s ease, transform 0.1s ease;
  }

  &:hover svg {
    fill: #991b1b;
  }

  &:active svg {
    transform: scale(0.9);
  }
`;

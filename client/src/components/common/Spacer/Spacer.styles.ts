import styled from "styled-components";

interface ISpacerProps {
  height?: number;
  width?: number;
}

export const Spacer = styled.div<ISpacerProps>`
  padding-top: ${({ height }) => height}rem;
`;

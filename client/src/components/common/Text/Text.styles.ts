import styled from "styled-components";
import { STextProps } from "./types.ts";

export const SProfileHeader = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const SText = styled.div<STextProps>`
  grid-area: ${({ gridArea }) => gridArea};
  height: 10vh;
  color: white;
  font-size: 20px;
  word-wrap: break-word;
  word-break: break-all;
`;

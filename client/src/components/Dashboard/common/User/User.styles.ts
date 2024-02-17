import styled from "styled-components";
import { SButton } from "../../../common/Button/Button.styles.ts";

``;
export const SNourishmentCard = styled.div`
  display: grid;
  height: 250px;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;

  @media (max-width: 1200px) {
    height: 250px;
    width: 400px;
  }

  @media (max-width: 768px) {
    height: 250px;
    width: 400px;
  }

  grid-template-areas:
    "image description description"
    "image price price";

  @media (max-width: 768px) {
    grid-template-areas:
      "image"
      "description"
      "price price"
      "button button";
  }
`;

export const SImage = styled.img`
  grid-area: image;
  width: 200px;
  border-radius: 4px;
`;

export const SDescription = styled.p`
  grid-area: description;
  width: 150px;
  background-color: white;
  color: black;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 16px;
`;

export const SDetailsContainer = styled.div`
  grid-area: price;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: end;
`;

export const SDetailsRow = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SDetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 1rem;
  padding-right: 1rem;
  color: white;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 16px;
  text-align: end;
`;

export const SDetails = styled.span`
  grid-area: price;
  padding-left: 1rem;
  font-size: 16px;
  font-weight: bold;
  word-wrap: break-word;
  word-break: break-all;
  color: white;
  text-align: end;
`;

export const SItemButton = styled(SButton)`
  width: 100%;
`;

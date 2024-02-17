import styled from 'styled-components';
import { SButton } from '../../../common/Button';

``;
export const SUserCard = styled.div`
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
    "image details details"
    "image details details";

    @media (max-width: 768px) {
        grid-template-areas:
      "image"
      "details"
      "button button";
    }
`;

export const SImage = styled.img`
    grid-area: image;
    width: 200px;
    border-radius: 4px;
`;

export const SEmail = styled.div`
    color: white
`;

export const SDescription = styled.p`
    grid-area: details;
    width: 150px;
    height: 50px;
    background-color: white;
    color: black;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 16px;
`;

export const SItemButton = styled(SButton)`
    width: 100%;
`;

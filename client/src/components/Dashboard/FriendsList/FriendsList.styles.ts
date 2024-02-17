import styled from 'styled-components';
import { SButton } from '../../common/Button/Button.styles.ts';

export const FriendsListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
    padding: 2rem;
    justify-content: flex-start;
    height: 100vh;

    @media (max-width: 1200px) {
        justify-content: center;
    }
`;

export const SCheckOutContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
export const SCheckoutColumnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
`;

export const SFriendsListButton = styled(SButton)`
    width: 100px;
    height: 50px;
`;

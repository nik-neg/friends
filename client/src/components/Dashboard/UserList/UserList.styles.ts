import styled from 'styled-components';

export const UserListContainer = styled.div`
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

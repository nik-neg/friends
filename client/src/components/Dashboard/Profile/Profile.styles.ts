import styled from "styled-components";
import { SButton } from "../../common/Button/Button.styles.ts";
import { SInputWrapperProps } from "./types.ts";

export const SProfileContainer = styled.div`
  display: grid;
  grid-template-areas: "image firstName lastName email";
  @media (max-width: 768px) {
    grid-template-areas:
      "image"
      "firstName"
      "lastName"
      "email";
  }
  gap: 1rem;
  padding: 2rem;
  height: 50vh;
`;

export const SAvatarGridArea = styled.div`
  grid-area: image;
`;
export const SProfileWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
export const SAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const SInputWrapper = styled.div<SInputWrapperProps>`
  grid-area: ${({ gridArea }) => gridArea};
  padding: 1rem;
`;

export const SUpdateButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SUpdateButtonWrapper = styled.div`
  display: flex;
  padding: 1rem;
`;
export const SUserUpdateButton = styled(SButton)`
  width: 100px;
  height: 50px;
`;

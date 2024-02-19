import { IUser } from "../../../context";

export interface SInputWrapperProps {
  gridArea: string;
}

export type IProfile = Partial<Pick<IUser, "first_name" | "last_name">>;

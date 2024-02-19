import { IFriend } from "../../FriendsList/types.ts";

export interface UserProps {
  name: string;
  friendImage: string;
  isFriend?: boolean;
  userId: number;
  email?: string;
  onHandleRemoveFriend?: (id: number) => void;
  onHandleAddFriend?: (friend: IFriend) => void;
}

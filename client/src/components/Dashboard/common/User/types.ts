export interface UserProps {
  name: string;
  friendImage: string;
  isFriend?: boolean;
  userId: number;
  email?: string;
  onHandleFriend?: (id: number) => void;
}

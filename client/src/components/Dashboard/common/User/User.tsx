import {
  SDescription,
  SEmail,
  SImage,
  SItemButton,
  SUserCard,
} from "./User.styles.ts";
import { UserProps } from "./types.ts";
import { useUser } from "../../../../context";
import queryString from "query-string";
import { IFriend } from "../../FriendsList/types.ts";

export const User = ({
  userId,
  friendImage,
  name,
  email,
  isFriend,
  onHandleRemoveFriend,
  onHandleAddFriend,
}: UserProps) => {
  const { userData } = useUser();

  const query = queryString.stringify({
    friendId: userId,
    userId: userData?.id,
  });
  const handleUser = async () => {
    if (isFriend) {
      // optimistic update
      onHandleRemoveFriend?.(userId);

      // remove
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL_FRIEND}?${query}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );

      if (res.status === 200) {
        onHandleRemoveFriend?.(userId);
      }
    } else {
      // add
      const friend = await fetch(`${import.meta.env.VITE_SERVER_URL_FRIEND}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.access_token}`,
        },
        body: JSON.stringify({
          userId: userData?.id,
          friendImage,
          name,
          email,
        }),
      });
      onHandleAddFriend?.(friend as unknown as IFriend);
    }
  };

  return (
    <SUserCard>
      <SImage
        src={
          friendImage ??
          "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1600"
        }
      />
      <SDescription>{name}</SDescription>
      <SEmail>{email}</SEmail>

      <SItemButton onClick={handleUser}>
        {!isFriend ? "Add to list" : "Remove from list"}
      </SItemButton>
    </SUserCard>
  );
};

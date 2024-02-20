import { useEffect, useState } from "react";
import { User } from "../common/User";
import { FriendsListContainer } from "./FriendsList.styles.ts";
import { useUser } from "../../../context";
import { IFriend } from "./types.ts";

export const FriendsList = () => {
  const { userData } = useUser();
  const [friendsList, setFriendsList] = useState<IFriend[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { friends } = data;
        setFriendsList(friends);
      });
  }, []);

  const removeFriend = async (id: number) => {
    setFriendsList((prev) => prev.filter((friend) => friend.id !== id));
  };

  const addFriend = async (friend: IFriend) => {
    setFriendsList((prev) => [...prev, friend]);
  };

  return (
    <>
      <FriendsListContainer>
        {friendsList?.map((friend, index) => {
          return (
            <User
              key={index}
              userId={friend.id}
              friendImage={friend.friendImage}
              name={friend.name}
              email={friend.email}
              onHandleRemoveFriend={removeFriend}
              onHandleAddFriend={addFriend}
              isFriend
            />
          );
        })}
      </FriendsListContainer>
    </>
  );
};

import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import { FriendsListContainer } from './FriendsList.styles.ts';
import { useUser } from '../../../context';

export const FriendsList = () => {
  const { userData } = useUser();
  const [friendsList, setFriendsList] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${userData?.access_token}`,
      },
    }).then((res) => res.json())
      .then(({ data }) => {
        console.log({ data });
        if (data?.length) {
          setFriendsList(data);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <>
      <AppBar />
      <FriendsListContainer>
        {friendsList.map((user, index) => {
          return (
            <User
              key={index}
              userId={user.userId}
              friendImage={user.avatar}
              name={user.first_name + ' ' + user.last_name}
              email={user.email}
              isFriend
            />
          );
        })}
      </FriendsListContainer>
    </>
  );
};

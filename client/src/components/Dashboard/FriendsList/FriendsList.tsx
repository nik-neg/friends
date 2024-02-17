import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import { FriendsListContainer } from './FriendsList.styles.ts';

export const FriendsList = () => {
  const [friendsList, setFriendsList] = useState<[]>([]);

  useEffect(() => {
  }, []);

  return (
    <>
      <AppBar />
      <FriendsListContainer>
        {[1, 2, 3].map((user, index) => {
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

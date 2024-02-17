import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import { FriendsListContainer } from './FriendsList.styles.ts';

export const FriendsList = () => {
  const [userList, setUserList] = useState<[]>([]);

  useEffect(() => {
  }, []);


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
              description={user.description}
            />
          );
        })}
      </FriendsListContainer>
    </>
  );
};

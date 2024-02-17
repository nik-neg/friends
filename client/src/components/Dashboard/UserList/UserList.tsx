import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import { UserListContainer } from './UserList.styles.ts';

export const UserList = () => {
  const [userList, setUserList] = useState<[]>([]);

  useEffect(() => {
  }, []);


  useEffect(() => {

  }, []);

  return (
    <>
      <AppBar />
      <UserListContainer>
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
      </UserListContainer>
    </>
  );
};

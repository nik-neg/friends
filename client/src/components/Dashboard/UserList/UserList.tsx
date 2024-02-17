import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User/User.tsx';

export const UserList = () => {
  const [userList, setMenuList] = useState<[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  }, []);


  useEffect(() => {

  }, []);

  return (
    <>
      <AppBar />
      <MenuContainer>
        {userList.map((item, index) => {
          return (
            <User
              key={index}
              userId={item.userId}
              catalogImage={item.catalogImage}
              description={item.description}
              price={item.price}
              isMenuItem
            />
          );
        })}
      </MenuContainer>
    </>
  );
};

import { User } from '../common/User/User.tsx';
import { AppBar } from '../../AppBar/AppBar.tsx';
import { useEffect, useState } from 'react';

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

import { FriendsListContainer, SCheckoutColumnWrapper, SCheckOutContainer } from './FriendsList.styles.ts';
import { User } from '../common/User/User.tsx';
import { AppBar } from '../../AppBar/AppBar.tsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  }, []);


  useEffect(() => {

  }, []);

  const [friendsList, setCartList] = useState<[]>([]);


  const handleCheckout = async () => {

  };

  return (
    <>
      <AppBar />
      <FriendsListContainer>
        {[1, 2, 3].map(
          (item: any, index: number) => {
            return (
              <User
                key={index}
                _id={item._id}
                userId={item.userId}
                catalogImage={item.catalogImage}
                description={item.description}
                price={item.price}
                quantity={item.volume}
              />
            );
          },
        )}
      </FriendsListContainer>
      <SCheckOutContainer>
        <SCheckoutColumnWrapper>
          <SCartButton onClick={handleCheckout}>Checkout</SCartButton>
        </SCheckoutColumnWrapper>
      </SCheckOutContainer>
    </>
  );
};

import {
  FriendsListContainer,
  SCheckoutColumnWrapper,
  SCheckOutContainer,
  SFriendsListButton,
} from './FriendsList.styles.ts';
import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';

export const FriendsList = () => {
  useEffect(() => {
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
          (friend: any, index: number) => {
            return (
              <User
                key={index}
                userId={friend.userId}
                friendImage={friend.avatar}
                description={friend.description}
              />
            );
          },
        )}
      </FriendsListContainer>
      <SCheckOutContainer>
        <SCheckoutColumnWrapper>
          <SFriendsListButton onClick={handleCheckout}>Checkout</SFriendsListButton>
        </SCheckoutColumnWrapper>
      </SCheckOutContainer>
    </>
  );
};

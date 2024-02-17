import {
  FriendsListContainer,
  SCheckoutColumnWrapper,
  SCheckOutContainer,
  SFriendsListButton,
} from './FriendsList.styles.ts';
import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import queryString from 'query-string';
import { useUser } from '../../../context';

export const FriendsList = () => {
  const { userData, updateUser } = useUser();
  const [friendsList, setCartList] = useState<[]>([]);

  useEffect(() => {
    if (!userData) {
      updateUser(localStorage.getItem('userData'));
    }
  }, []);

  const queryParams = {
    take: 10,
    skip: 5,
    shouldFetchUsersFromApi: true,
    page: 1,
  };

  const queryStr = queryString.stringify(queryParams);

  useEffect(() => {
    console.log({ token: userData?.access_token });
    fetch(`${import.meta.env.VITE_SERVER_URL_USER}?${queryStr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${userData?.access_token}`,
      },
    }).then((res) => res.json())
      .then((data) => {
        console.log({ data });
      });
  }, []);


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
                isFriend

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

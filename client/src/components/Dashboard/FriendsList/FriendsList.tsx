import { FriendsListContainer, SFriendsListButton } from './FriendsList.styles.ts';
import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import queryString from 'query-string';
import { useUser } from '../../../context';

export const FriendsList = () => {
  const { userData, updateUser } = useUser();
  const [friendsList, setFriendsList] = useState<[]>(null);

  useEffect(() => {
    if (!userData) {
      updateUser(localStorage.getItem('userData'));
    }
  }, []);

  const [page, setPage] = useState(1);

  const queryParams = {
    take: 10,
    skip: 5,
    shouldFetchUsersFromApi: true,
    page,
  };

  const queryStr = queryString.stringify(queryParams);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL_USER}?${queryStr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${userData?.access_token}`,
      },
    }).then((res) => res.json())
      .then(({ data }) => {
        if (data.length) {
          setFriendsList(data);
        }
      });
  }, [page]);

  const handlePrevious = async () => {
    setPage(page - 1 > 0 ? page - 1 : 1);
  };
  const handleNext = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <AppBar />
      <FriendsListContainer>
        {friendsList?.map(
          (friend: any, index: number) => {
            return (
              <User
                key={index}
                userId={friend.userId}
                friendImage={friend.avatar}
                name={friend.first_name + ' ' + friend.last_name}
                email={friend.email}
                isFriend

              />
            );
          },
        )}
        <SFriendsListButton onClick={handlePrevious}>Previous</SFriendsListButton>
        <SFriendsListButton onClick={handleNext}>Next</SFriendsListButton>
      </FriendsListContainer>
    </>
  );
};

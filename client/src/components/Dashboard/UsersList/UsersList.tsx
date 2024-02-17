import { useEffect, useState } from 'react';
import { AppBar } from '../../AppBar';
import { User } from '../common/User';
import queryString from 'query-string';
import { useUser } from '../../../context';
import { SUserListButton, SUsersListContainer } from './UsersList.styles.ts';

export const UsersList = () => {
  const { userData, updateUser } = useUser();
  const [usersList, setUserList] = useState<[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      updateUser(localStorage.getItem('userData'));
    }
  }, []);

  const [page, setPage] = useState(1);

  const queryParams = {
    shouldFetchUsersFromApi: true,
    page,
  };

  const queryStr = queryString.stringify(queryParams);

  useEffect(() => {
    setIsLoading(true);
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
          setUserList(data);
          setIsLoading(false);
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
      <SUsersListContainer>
        {usersList?.map(
          (friend: any, index: number) => {
            return (
              <User
                key={index}
                userId={friend.userId}
                friendImage={friend.avatar}
                name={friend.first_name + ' ' + friend.last_name}
                email={friend.email}
              />
            );
          },
        )}
        {!isLoading && (
          <>
            <SUserListButton onClick={handlePrevious}>Previous</SUserListButton>
            <SUserListButton onClick={handleNext}>Next</SUserListButton></>
        )}

      </SUsersListContainer>
    </>
  );
};

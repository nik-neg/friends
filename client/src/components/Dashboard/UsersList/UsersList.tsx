import { useEffect, useMemo, useState } from "react";
import { User } from "../common/User";
import queryString from "query-string";
import { useUser } from "../../../context";
import { SUserListButton, SUsersListContainer } from "./UsersList.styles.ts";

export const UsersList = () => {
  const { userData } = useUser();
  const [usersList, setUserList] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const queryStr = queryString.stringify({
    shouldFetchUsersFromApi: true,
    page,
  });

  useEffect(() => {
    fetchUsers().then();
  }, [page]);

  const fetchUsers = async () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_SERVER_URL_USER}?${queryStr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.length) {
          setUserList(data);
          setIsLoading(false);
        }
      });
  };

  const handlePrevious = async () => {
    setPage(page - 1 > 0 ? page - 1 : 1);
  };
  const handleNext = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <SUsersListContainer>
        {usersList?.map((friend: any, index: number) => {
          return (
            <User
              key={index}
              userId={friend.userId}
              friendImage={friend.avatar}
              name={friend.first_name + " " + friend.last_name}
              email={friend.email}
            />
          );
        })}
        {!isLoading && (
          <>
            <SUserListButton onClick={handlePrevious}>Previous</SUserListButton>
            <SUserListButton onClick={handleNext}>Next</SUserListButton>
          </>
        )}
      </SUsersListContainer>
    </>
  );
};

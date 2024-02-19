import {
  SAvatar,
  SAvatarGridArea,
  SInputWrapper,
  SProfileContainer,
  SProfileWrapper,
  SUpdateButtonPanel,
  SUpdateButtonWrapper,
  SUserUpdateButton,
} from "./Profile.styles.ts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { updateUserSchema } from "./validation/schema.ts";
import { Input } from "../../Welcome";
import { SProfileHeader } from "../../common/Text";
import { IUser, useUser } from "../../../context";
import { IProfile } from "./types.ts";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const { userData, updateUser } = useUser();
  const [user, setUser] = useState<IProfile>({});

  useEffect(() => {
    if (userData?.id) {
      fetch(`${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.length) {
            updateUser((prev: IUser) => ({
              ...prev,
              first_name: data?.first_name,
              last_name: data?.last_name,
            }));
            setUser({
              first_name: data?.first_name,
              last_name: data?.last_name,
            });
          }
        });
    }
  }, []);

  const defaultValues = {
    first_name: userData?.first_name,
    last_name: userData?.last_name,
  };

  const {
    register,
    formState: { isValid },
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateUserSchema),
  });

  const [canUpdateUser, setUpdateUser] = useState(false);
  const handleUpdate = async () => {
    if (canUpdateUser && isValid) {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData?.access_token}`,
          },
          body: JSON.stringify(getValues()),
        }
      );
      const data = await res.json();
      updateUser((prev: IUser) => ({
        ...prev,
        first_name: data?.first_name,
        last_name: data?.last_name,
      }));
      setUser({ first_name: data?.first_name, last_name: data?.last_name });
    }
  };

  const handleEdit = () => {
    setUpdateUser(!canUpdateUser);
  };

  const removeUser = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userData?.access_token}`,
      },
    });
    navigate("/");
  };

  return (
    <>
      <SProfileHeader>Profile</SProfileHeader>
      <SProfileContainer>
        <SAvatarGridArea>
          <SProfileWrapper>
            <SAvatar
              src={
                "https://images.pexels.com/photos/6897773/pexels-photo-6897773.jpeg?auto=compress&cs=tinysrgb&w=1600"
              }
            />
          </SProfileWrapper>
        </SAvatarGridArea>
        <SProfileWrapper>
          <SInputWrapper gridArea={"firstName"}>
            <Input
              type="text"
              id={"first_name"}
              value={canUpdateUser ? undefined : user?.first_name}
              {...register("first_name")}
              style={{ pointerEvents: canUpdateUser ? "auto" : "none" }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={"lastName"}>
            <Input
              type="text"
              id={"last_name"}
              value={canUpdateUser ? undefined : user?.last_name}
              {...register("last_name")}
              style={{ pointerEvents: canUpdateUser ? "auto" : "none" }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={"email"}>
            <Input
              type="text"
              id={"firstName"}
              value={userData?.email}
              style={{ pointerEvents: "none" }}
            />
          </SInputWrapper>
        </SProfileWrapper>
      </SProfileContainer>
      <SUpdateButtonPanel>
        <SUpdateButtonWrapper>
          <SUserUpdateButton onClick={handleEdit}>Edit</SUserUpdateButton>
        </SUpdateButtonWrapper>
        <SUpdateButtonWrapper>
          <SUserUpdateButton onClick={handleUpdate}>Update</SUserUpdateButton>
        </SUpdateButtonWrapper>
        <SUpdateButtonWrapper>
          <SUserUpdateButton onClick={removeUser}>Delete</SUserUpdateButton>
        </SUpdateButtonWrapper>
      </SUpdateButtonPanel>
    </>
  );
};

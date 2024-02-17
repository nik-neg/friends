import {
  SAvatar,
  SAvatarGridArea,
  SInputWrapper,
  SProfileContainer,
  SProfileWrapper,
  SUpdateButtonPanel,
  SUpdateButtonWrapper,
  SUserUpdateButton,
} from './Profile.styles.ts';
import { SProfileHeader } from '../../common/Text/Text.styles.ts';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateUserSchema } from './validation/schema.ts';

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user
  }, []);


  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateUserSchema),
  });


  const [canUpdateUser, setUpdateUser] = useState(false);
  const handleUpdate = async () => {
    console.log({ canUpdateUser, isValid, errors, user });
    if (canUpdateUser && isValid) {
      
    }
  };

  const handleEdit = () => {
    setUpdateUser(!canUpdateUser);
  };

  // TODO: show orders

  return (
    <>
      <AppBar />
      <SProfileHeader>Profile</SProfileHeader>
      <SProfileContainer>
        <SAvatarGridArea>
          <SProfileWrapper>
            <SAvatar
              src={
                'https://images.pexels.com/photos/6897773/pexels-photo-6897773.jpeg?auto=compress&cs=tinysrgb&w=1600'
              }
            />
          </SProfileWrapper>
        </SAvatarGridArea>
        <SProfileWrapper>
          <SInputWrapper gridArea={'firstName'}>
            <Input
              type="text"
              id={'firstName'}
              value={canUpdateUser ? undefined : user?.firstName}
              {...register('firstName')}
              style={{ pointerEvents: canUpdateUser ? 'auto' : 'none' }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={'lastName'}>
            <Input
              type="text"
              id={'lastName'}
              value={canUpdateUser ? undefined : user?.lastName}
              {...register('lastName')}
              style={{ pointerEvents: canUpdateUser ? 'auto' : 'none' }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={'email'}>
            <Input
              type="text"
              id={'firstName'}
              value={user?.email}
              style={{ pointerEvents: 'none' }}
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
      </SUpdateButtonPanel>
    </>
  );
};

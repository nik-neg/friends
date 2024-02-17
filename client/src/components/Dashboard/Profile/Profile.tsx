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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateUserSchema } from './validation/schema.ts';
import { useUser } from '../../../context';
import { Input } from '../../Welcome';
import { AppBar } from '../../AppBar';
import { SProfileHeader } from '../../common/Text';

export const Profile = () => {
  const { userData } = useUser();

  useEffect(() => {
    // fetch user
  }, []);


  const defaultValues = {
    first_name: userData.first_name,
    last_name: userData.last_name,
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
    console.log({ canUpdateUser, isValid, errors, userData });
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
              id={'first_name'}
              value={canUpdateUser ? undefined : userData?.first_name}
              {...register('first_name')}
              style={{ pointerEvents: canUpdateUser ? 'auto' : 'none' }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={'lastName'}>
            <Input
              type="text"
              id={'last_name'}
              value={canUpdateUser ? undefined : userData?.last_name}
              {...register('last_name')}
              style={{ pointerEvents: canUpdateUser ? 'auto' : 'none' }}
            />
          </SInputWrapper>
          <SInputWrapper gridArea={'email'}>
            <Input
              type="text"
              id={'firstName'}
              value={userData?.email}
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

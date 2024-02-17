import { SDescription, SEmail, SImage, SItemButton, SUserCard } from './User.styles.ts';
import { UserProps } from './types.ts';
import { useUser } from '../../../../context';

export const User = ({
                       userId,
                       friendImage,
                       name,
                       email,
                       isFriend,
                     }: UserProps) => {

  const { userData } = useUser();
  const handleUser = async () => {
    if (isFriend) {
      // remove
      const res = fetch(`${import.meta.env.VITE_SERVER_URL_USER}/${userData?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${userData?.access_token}`,
        },
        body: JSON.stringify({ friendId: userId }),
      });
    } else {
      // add
      const res = fetch(`${import.meta.env.VITE_SERVER_URL_FRIEND}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${userData?.access_token}`,
        },
        body: JSON.stringify({
          userId: userData?.id,
          friendImage,
          name,
          email,
        }),
      });
    }
  };

  return (
    <SUserCard>
      <SImage
        src={
          friendImage ??
          'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1600'
        }
      />
      <SDescription>{name}</SDescription>
      <SEmail>{email}</SEmail>

      <SItemButton onClick={handleUser}>
        {!isFriend ? 'Add to list' : 'Remove from list'}
      </SItemButton>
    </SUserCard>
  );
};

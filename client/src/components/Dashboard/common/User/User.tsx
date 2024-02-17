import { SDescription, SEmail, SImage, SItemButton, SUserCard } from './User.styles.ts';
import { UserProps } from './types.ts';

export const User = ({
                       userId,
                       friendImage,
                       name,
                       email,
                       isFriend,
                     }: UserProps) => {
  const handleItem = () => {
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

      <SItemButton onClick={handleItem}>
        {isFriend ? 'Add to list' : 'Remove from list'}
      </SItemButton>
    </SUserCard>
  );
};

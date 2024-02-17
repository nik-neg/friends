import {
  SDescription,
  SDetails,
  SDetailsContainer,
  SDetailsRow,
  SImage,
  SItemButton,
  SNourishmentCard,
} from './User.styles.ts';
import { UserProps } from './types.ts';

export const User = ({
                       userId,
                       friendImage,
                       description,
                       price,
                       isFriend,
                       quantity,
                     }: UserProps) => {
  const handleItem = () => {
  };

  return (
    <SNourishmentCard>
      <SImage
        src={
          friendImage ??
          'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1600'
        }
      />
      <SDescription>{description}</SDescription>
      <SDetailsContainer>
        <SDetailsRow>
          <SDetails>{quantity}</SDetails>
          <SDetails>{price}</SDetails>
        </SDetailsRow>
      </SDetailsContainer>

      <SItemButton onClick={handleItem}>
        {isFriend ? 'Add to list' : 'Remove from list'}
      </SItemButton>
    </SNourishmentCard>
  );
};

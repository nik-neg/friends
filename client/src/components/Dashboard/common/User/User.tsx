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
                       catalogImage,
                       description,
                       price,
                       isMenuItem,
                       quantity,
                     }: UserProps) => {
  const handleItem = () => {
  };

  return (
    <SNourishmentCard>
      <SImage
        src={
          catalogImage ??
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
        {isMenuItem ? 'Add to cart' : 'Remove from cart'}
      </SItemButton>
    </SNourishmentCard>
  );
};

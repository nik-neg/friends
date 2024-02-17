import { SButton } from './Button.styles.ts';
import { IButtonProps } from './types.ts';
import { useNavigate } from 'react-router-dom';

export const Button = ({ name }: IButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (event: Event) => {
    event.stopPropagation();
    
    const route = name === 'logout' ? '' : name?.toLowerCase();
    navigate(`/${route}`);
  };

  return <SButton onClick={handleClick}>{name}</SButton>;
};

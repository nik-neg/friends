export interface IButtonProps {
  children?: React.ReactNode;
  name?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

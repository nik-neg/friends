export interface UserProps {
  _id: string;
  description: string;
  price: number;
  catalogImage: string;
  isMenuItem?: boolean;
  quantity?: number;
  userId?: string;
  volume?: number;
  category?: string;
}

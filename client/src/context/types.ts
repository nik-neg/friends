export interface UserProviderProps {
  children: React.ReactNode;
}

export interface IUserContext {
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  handleLoggedIn: (value: boolean) => void;
  handleAuthenticated: (value: boolean) => void;
  updateUser: (value: any) => void;
}

export interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
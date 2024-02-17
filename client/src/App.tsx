import './App.styles.ts';
import { SApp } from './App.styles.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Profile } from './components/Dashboard/Profile';
import { useUser } from './context';
import { FriendsList } from './components/Dashboard/FriendsList/FriendsList.tsx';
import { UsersList } from './components/Dashboard/UsersList/UsersList.tsx';
import { AppBar } from './components/AppBar';

function App() {

  const { isAuthenticated, isLoggedIn } = useUser();

  return (
    <SApp>
      <BrowserRouter>
        {isAuthenticated && <AppBar />}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/users"
            element={isAuthenticated ? <UsersList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/friends"
            element={isAuthenticated ? <FriendsList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SApp>
  );
}

export default App;

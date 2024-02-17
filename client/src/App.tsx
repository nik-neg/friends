import './App.styles.ts';
import { SApp } from './App.styles.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { UserList } from './components/Dashboard/UserList';
import { FriendsList } from './components/Dashboard/FriendsList';
import { Profile } from './components/Dashboard/Profile';
import { useUser } from './context';

function App() {

  const { isAuthenticated } = useUser();

  console.log({ isAuthenticated });

  return (
    <SApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/friends"
            element={isAuthenticated ? <FriendsList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <UserList /> : <Navigate to="/" replace />}
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

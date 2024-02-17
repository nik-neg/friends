import './App.styles.ts';
import { SApp } from './App.styles.ts';
import { UserList } from './components/Dashboard/UserList/UserList.tsx';
import { Welcome } from './components/Welcome/Welcome.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FriendsList } from './components/Dashboard/FriendsList/FriendsList.tsx';
import { Profile } from './components/Dashboard/Profile/Profile.tsx';

function App() {

  const isAuthenticated = true;
  return (
    <SApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/menu"
            element={isAuthenticated ? <UserList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/cart"
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

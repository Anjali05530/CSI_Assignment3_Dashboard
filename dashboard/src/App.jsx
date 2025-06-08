import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');

    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
    document.body.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280';
  }, [theme]);

  function logout() {
    setLoggedInUser(null);
    setShowProfile(false);
  }

  if (!loggedInUser) return <Auth onLogin={setLoggedInUser} />;

  return (
    <>
      <Header
        theme={theme}
        setTheme={setTheme}
        loggedInUser={loggedInUser}
        onLogout={logout}
        onShowProfile={() => setShowProfile(true)}
      />
      {showProfile ? (
        <ProfilePage
          user={loggedInUser}
          onLogout={logout}
          onBack={() => setShowProfile(false)}
        />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

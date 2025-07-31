import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminFormTable from './components/AdminFormTable';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
  //   setIsLoggedIn(isAdmin);
  // }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <AdminFormTable /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;

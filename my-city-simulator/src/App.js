import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './styles/styles.css';

import Header from './components/Header';
import Construction from './components/Construction';
import Resources from './components/Resources';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000")
    .then(response => response.json())  // Перетворюємо відповідь на JSON
    .then(data => console.log(data.message));  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
      {/* Показуємо Header лише якщо залогінений користувач і не на сторінці входу */}
      {user && !isLoginPage && <Header user={user} />}

      <main>
        
        <Routes>
          {/* Сторінка входу */}
          <Route path="/" element={<Login />} />

          {/* Захищені сторінки */}
          {user ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </main>

      {/* Показуємо Footer лише якщо залогінений користувач і не на сторінці входу */}
      {user && !isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

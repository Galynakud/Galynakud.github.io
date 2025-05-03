import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../styles/styles.css';

const initialState = {
  email: '',
  password: '',
  name: '',
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const { email, password, name } = formData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          name,
          createdAt: serverTimestamp(),
        });
      } else {
        const { email, password } = formData;
        await signInWithEmailAndPassword(auth, email, password);
      }
      resetForm();
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Помилка: ' + (err?.message || 'Спробуйте ще раз.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          createdAt: serverTimestamp(),
        });
      }

      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Помилка входу через Google: ' + (err.message || 'Спробуйте ще раз.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{isRegistering ? 'Реєстрація' : 'Вхід'}</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Ваше ім'я"
              value={formData.name}
              onChange={handleChange}
              className="login-input"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Завантаження...' : isRegistering ? 'Зареєструватися' : 'Увійти'}
          </button>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? 'Завантаження...' : 'Увійти через Google'}
          </button>

          {error && <p className="login-error">{error}</p>}
        </form>

        <div className="login-switch">
          <p>
            {isRegistering ? 'Вже маєте акаунт?' : 'Немає акаунта?'}{' '}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetForm();
              }}
              className="login-link"
            >
              {isRegistering ? 'Увійти' : 'Зареєструватися'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

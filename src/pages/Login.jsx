import React, { useState, useContext } from 'react';
import { login, putAccessToken } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import LanguageContext from '../contexts/LanguageContext';
import useInput from '../hooks/useInput';
import HeaderComponent from '../components/HeaderComponent';
import LoadingIndicator from '../components/LoadingIndicator';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const { error, data } = await login({ email, password });
      setLoading(false);
      if (!error) {
        putAccessToken(data.accessToken);
        setUser({ accessToken: data.accessToken });
        navigate('/home');
      } else {
        setErrorMessage(language === 'id'
          ? 'Login gagal! Periksa email dan password.'
          : 'Login failed! Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage(language === 'id'
        ? 'Terjadi kesalahan server!'
        : 'Server error! Please try again later.');
    }
  };

  return (
    <div>
      <HeaderComponent
        title={language === 'id' ? 'Masuk' : 'Login'}
        showSearch={false}
      />

      <div className="login-container">
        <div className="login-form">
          <h2>{language === 'id' ? 'Selamat Datang Kembali' : 'Welcome Back'}</h2>
          <p>{language === 'id' ? 'Masukkan email dan password Anda.' : 'Enter your email and password.'}</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">{language === 'id' ? 'Email' : 'Email Address'}</label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{language === 'id' ? 'Password' : 'Password'}</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={onPasswordChange}
                required
              />
            </div>

            <button className='btn-submit' type="submit" disabled={loading}>
              {loading ? <LoadingIndicator size={30} /> : language === 'id' ? 'Masuk' : 'Login'}
            </button>
          </form>

          <p className="footer">
            {language === 'id' ? 'Belum punya akun?' : 'New here?'} <Link to="/register">{language === 'id' ? 'Daftar' : 'Create an account'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
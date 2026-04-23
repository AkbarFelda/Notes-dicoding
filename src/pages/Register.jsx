import React, { useContext, useState } from 'react';
import { register } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import LanguageContext from '../contexts/LanguageContext';
import HeaderComponent from '../components/HeaderComponent';
import LoadingIndicator from '../components/LoadingIndicator';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(language === 'id' ? 'Password dan konfirmasi tidak sama!' : 'Password and confirmation do not match!');
      return;
    }
    setLoading(true);
    const { error } = await register({ name, email, password });
    setLoading(false);
    if (!error) {
      setErrorMessage(language === 'id' ? 'Registrasi gagal. Silakan coba lagi.' : 'Registration failed. Please try again.');
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    }
  };

  return (
    <div>
      <HeaderComponent
        title={language === 'id' ? 'Daftar' : 'Register'}
        showSearch={false}
      />

      <div className="login-container">
        <div className="login-form">
          <h2>{language === 'id' ? 'Buat Akun Baru' : 'Create Account'}</h2>
          <p>{language === 'id' ? 'Masukkan detail Anda untuk membuat akun baru.' : 'Enter your details to create a new account.'}</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
              <input
                id="name"
                type="text"
                placeholder={language === 'id' ? 'Nama Lengkap' : 'Your Full Name'}
                value={name}
                onChange={onNameChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword">{language === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
              />
            </div>

            <button  className='btn-submit' type="submit" disabled={loading}>
              {loading ? <LoadingIndicator size={30} /> : language === 'id' ? 'Daftar' : 'Create Account'}
            </button>
          </form>

          <p className="footer">
            {language === 'id' ? 'Sudah punya akun?' : 'Already have an account?'} <Link to="/login">{language === 'id' ? 'Masuk' : 'Login'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
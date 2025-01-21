import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (name) => {
    const isValid = /^[A-Za-z\s]+$/.test(name); // Only alphabets and spaces allowed
    setNameError(isValid ? '' : 'Name must only contain alphabets.');
    return isValid;
  };

  const validateEmail = (email) => {
    const isValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setEmailError(isValid ? '' : 'Invalid email format. Use @ and .com');
    return isValid;
  };

  const validatePassword = (password) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    setPasswordError(isValid ? '' : 'Password must contain at least 8 characters, one uppercase and one lowercase letter.');
    return isValid;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    const isValid = password === confirmPassword;
    setConfirmPasswordError(isValid ? '' : 'Passwords do not match.');
    return isValid;
  };

  const validatePhone = (phone) => {
    const isValid = /^\d{10}$/.test(phone); // Only allows exactly 10 digits
    setPhoneError(isValid ? '' : 'Phone number must be exactly 10 digits.');
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (validateEmail(email) && validatePassword(password)) {
        alert('Login successful');
      }
    } else {
      if (
        validateName(name) &&
        validateEmail(email) &&
        validatePassword(password) &&
        validateConfirmPassword(password, confirmPassword) &&
        validatePhone(phone)
      ) {
        alert('Registration successful');
      }
    }
  };

  const isFormValid = isLogin
    ? email && password && !emailError && !passwordError
    : name &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !phoneError;

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="tab-buttons">
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>LOGIN</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>REGISTER</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateName(name)}
              />
              {nameError && <p className="error-message">{nameError}</p>}
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                maxLength="10"
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                onBlur={() => validatePhone(phone)}
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '🔒'}
            </span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          {!isLogin && (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateConfirmPassword(password, confirmPassword)}
              />
              {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
            </>
          )}
          <button type="submit" disabled={!isFormValid} className={!isFormValid ? 'disabled' : ''}>
            {isLogin ? 'Confirm Login' : 'Confirm Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;

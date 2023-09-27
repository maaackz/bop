import React, { useState } from "react";
import Axios from 'axios';
import './App.css';

const api = Axios.create({
  baseURL: 'http://localhost:3001',
});

function App() {
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = async () => {
    try {
      const response = await api.post('/register', {
        username: usernameRegister,
        email: emailRegister,
        password: passwordRegister,
      });
      console.log(response);
      // Clear input fields or perform other actions after successful registration
    } catch (error) {
      console.error(error);
      // Handle registration error
    }
  }

  const login = async () => {
    try {
      const response = await api.post('/login', {
        username: usernameLogin,
        password: passwordLogin,
      });
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Welcome, " + response.data[0].username + "!");
      }
      // Clear input fields or perform other actions after successful login
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <form>
          <label>Username</label>
          <input type="text" value={usernameRegister} onChange={(e) => setUsernameRegister(e.target.value)} />
          <label>Email</label>
          <input type="text" value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} />
          <label>Password</label>
          <input type="password" value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} />
          <button type="button" onClick={register}>Register</button>
        </form>
      </div>

      <div className="login">
        <h1>Login</h1>
        <form>
          <label>Username</label>
          <input type="text" value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} />
          <label>Password</label>
          <input type="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
          <button type="button" onClick={login}>Login</button>
        </form>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;

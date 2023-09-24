import React, { useState } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameRegister,
      email: emailRegister,
      password: passwordRegister,
    }).then((response) => {
      console.log(response);
    });
  }

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Welcome, " + response.data[0].username + "!")
      }
      
    });
  }

  const [loginStatus, setLoginStatus] = useState("")

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" onChange={(e)=> 
          {
            setUsernameRegister(e.target.value)
          }}
        />
        <label>Email</label>
        <input type="text" onChange={(e)=> 
          {
            setEmailRegister(e.target.value)
          }}
        />
        <label>Password</label>
        <input type="text" onChange={(e)=> 
          {
            setPasswordRegister(e.target.value)
          }}
        />
        <button onClick={register}>Register</button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <label>Username</label>
        <input type="text" onChange={(e)=> 
          {
            setUsernameLogin(e.target.value)
          }}
        />
        <label>Password</label>
        <input type="text" onChange={(e)=> 
          {
            setPasswordLogin(e.target.value)
          }}
        />
        <button onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;

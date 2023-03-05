import React, { useState,useContext } from "react";
import {UserContext} from '../App'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      console.log(data.user);
      localStorage.setItem("jwt",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
      dispatch({type:"USER",payload:data.user})
      // alert("Login Successful");
      Swal.fire(
        'Logged In',
        'Successfully!',
        'success'
      )
      navigate('/home', { replace: true });
    }else if(data.error!=null && !data.user){
      // alert(data.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.error
      })
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please check your username and password"
      })
      // alert("Please check your username and password");
    }
    console.log(data);
  }
  return (
    <div className='auth-inner-inner'>
    <form onSubmit={loginUser}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          value={password}
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
        <p className="forgot-password text-right"> Don't have an account?
        <a href='/sign-up'>Sign up</a>
        </p>
    </form>
    </div>
  );
}
export default Login;

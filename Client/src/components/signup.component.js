import React, { useState } from 'react'
import Swal from 'sweetalert2'
function SignUp(){
const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
async function registerUser(event) {
  event.preventDefault()

  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  const data = await response.json()
  if(data.status ==='ok'){
      // alert(data.message);
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: data.message
      })
      setName('');
      setEmail('');
      setPassword('');
  }else{
    // alert(data.error);
     Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error
    })
  }
  console.log(data);
  }
    return (
     <div className='auth-inner-inner'>
      <form onSubmit={registerUser}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder="Username"
            onChange={e=>setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Enter email"
            onChange={e=>setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Enter password"
            onChange={e=>setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>
    )
}
export default SignUp;

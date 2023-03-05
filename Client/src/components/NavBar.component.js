import React, {useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'
import { UserContext } from "../App";

function NavBar(){
  const navigate  = useNavigate();
  const renderList = ()=>{
  if(state){
      return [
        <><li className="nav-item">
          <Link className="nav-link" to={"/home"}>
            Home
          </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/createpost"}>
              Create Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/profile"}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
          <button className="logoutBtn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              Swal.fire({
                icon: 'success',
                title: 'Logged out',
                text: 'Successfully'
              })
              navigate('/sign-in')
            }}>
                Logout
            </button>
          </li>
          </>
       ]
  }else{
    return[
      <>
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-in"}>
          Login
        </Link>
      </li><li className="nav-item">
          <Link className="nav-link" to={"/sign-up"}>
            Sign up
          </Link>
        </li>
        </>
    ]
  }
}

  const {state,dispatch} = useContext(UserContext)
    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={state?"/":"/sign-in"}>
                Discussion Forum
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                {renderList()}
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={"/home"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/createpost"}>
                      Create Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profile"}>
                      Profile
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
    )
}
export default NavBar
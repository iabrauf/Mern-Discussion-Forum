import React, { useEffect, createContext, useReducer, useContext } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import EmailVerify from "./components/EmailVerify";
import CreatePost from "./components/CreatePost";
import { reducer, initialState } from "./reducer/useReducer";
import NavBar from "./components/NavBar.component";
export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // navigate("/home");
    } else {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/verifyUserEmail/:id/:token" element={<EmailVerify />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <NavBar />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

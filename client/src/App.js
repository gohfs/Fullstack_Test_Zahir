import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "./pages/Subscribe";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

function App() {
  const [state, dispatch] = useContext(UserContext);

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);

      // FALSE TOKEN
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.getItem("token");

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkUser();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignUp />} />

        <Route exact path="/admin" element={<Admin />} />

        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/subscribe" element={<Subscribe />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLoggedInUser(JSON.parse(userStr));
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup loggedInUser={loggedInUser} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard loggedInUser={loggedInUser} />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

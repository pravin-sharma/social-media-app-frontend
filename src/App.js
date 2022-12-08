import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import setTokenInHeader from "./utils/setTokenInHeader";

import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import NavigationBar from "./components/layout/NavigationBar";
import { Alerts } from "./components/layout/Alerts";
import PageNotFound from "./components/pages/PageNotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EmailVerification from "./components/pages/EmailVerification";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import PostState from "./context/post/PostState";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/";
  if (localStorage.getItem("token")) {
    setTokenInHeader(localStorage.getItem("token"));
  }

  return (
    <AlertState>
      <AuthState>
        <PostState>
          <Router>
            <NavigationBar />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Alerts />
            <Routes>
              <Route exact path="/" element={<Navigate to="/login" />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/home"
                element={<PrivateRoute Component={Home} />}
              />
              <Route
                exact
                path="/email-verification"
                element={<EmailVerification />}
              />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route exact path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </PostState>
      </AuthState>
    </AlertState>
  );
}

export default App;

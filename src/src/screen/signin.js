import React, { useEffect, useState } from "react";
import Header from "./component/header";
import email from '../images/email.webp';
import passwordIcon from '../images/password.webp';
import Footer from "./component/footer";
import line from '../images/line.webp';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { CircleSpinnerOverlay, FerrisWheelSpinner } from 'react-spinner-overlay'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import axios from "axios";
import showPasswordIcon from '../images/showPassword.svg';
import hidePasswordIcon from '../images/hidePassword.svg';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [model, setModel] = useState({
    email: "",
    password: ""
  }); 
  const [loading, setLoading] = useState(false)
  const apiUrl = "https://myuniversallanguages.com:9093/api/v1";

  const handleLogin = async (e) => {
    if (model?.email === "" || model?.password === "") {
      enqueueSnackbar("Email and password is required", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      })
      return null
    }
    else {
      setLoading(true)
      try {
        const response = await axios.post(`${apiUrl}/signin/`, {
          email: model?.email,
          password: model?.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const token = response.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem("items", JSON.stringify(decoded));
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar("Login successsfull", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        setLoading(false)
      }
      catch (error) {
        setLoading(false)
        console.log("catch error", error);
        enqueueSnackbar(error?.response?.data?.message ? error?.response?.data?.message : "Network error", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
      }
    }
  };

  const fillModel = (key, val) => {
    setModel(prevModel => ({ ...prevModel, [key]: val }));
  };

  return (
    <div>
      <SnackbarProvider />
      <section>
        <div className="maininputdivs" 
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            console.log(e);
            handleLogin()
          }
        }}>
          <div className="mainInputDiv">
            <p className="accessFont">Login your account</p>
            <div className="inputDiv">
              <img src={email} alt="Email" />
              <input className="autofill" onChange={(e) => fillModel("email", e.target.value)} placeholder="Email" />
            </div>
            <div className="inputDiv">
              <img src={passwordIcon} alt="Password" />
              <input className="autofill" type={showPassword ? 'text' : 'password'} onChange={(e) => fillModel("password", e.target.value)} placeholder="Password (8 or more characters)" />
              {model.password !== "" && <img style={{ cursor: "pointer" }} width={30} src={showPassword ? showPasswordIcon : hidePasswordIcon} alt="Password" onClick={() => setShowPassword(!showPassword)} />}
            </div>
            <div className="remember">
              <p className="forgot" onClick={() => navigate("/forget-password")}>Forget Password</p>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading} type="submit" className={loading ? "disabledAccountButton" : "accountButton"}>{loading ? <FerrisWheelSpinner loading={loading} size={28} color="#6DBB48" /> : "Login"}</button>
          </div>
        </div>
        <p className="loginFont">Don't have an account? <span style={{
          color: "#7ACB59",
          textDecoration: "underline",
          cursor: "pointer",
        }} onClick={() => navigate("/signup")}>Sign Up</span></p>
      </section>
      <img className="lines" src={line} alt="Line" />
    </div>
  );
}

export default SignIn;
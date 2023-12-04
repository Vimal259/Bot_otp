import loginImg from "../assets/images/hero-login-signup-page.svg";
import googleIcon from "../assets/icons/google-icon.svg";
import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { BASE_URL } from "../../config";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [forgetPassword, setForgetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (!errors.email && !errors.password) {
      try {
        const res = await axios.post(`${BASE_URL}/login`, values);

        // Check if the response status is 200
        if (res.status === 200) {
          const userData = res.data;
          if (userData.is_admin === true) {
            const token = userData.token;
            Cookies.set("serv_auth", token);
            Cookies.set("auth", values.email);
            
            setUser({
              loggedIn: true,
              email: values.email,
              balance: userData.balance,
              name: userData.name,
              isAdmin: true,
            });
    
            // Redirect to admin panel after successful login
            navigate("/adminpanel");
          } else {
            // For non-admin users, redirect to client profile page
            const token = userData.token;
            Cookies.set("serv_auth", token);
            Cookies.set("auth", values.email);
            
            setUser({
              loggedIn: true,
              email: values.email,
              balance: userData.balance,
              name: userData.name,
              isAdmin: false,
            });
    
            // Redirect to client profile page
            navigate("/profile");
          }
        }
            else {
              alert("Unexpected response status: " + res.status);
            }
          } catch (err) {
            // Handle other errors
            if (err.response && err.response.status === 401) {
              alert("Invalid email or password");
            } else {
              console.error("Unexpected error:", err);
            }
        }
      }
    }
  

  const sendPwd = () => {
    setForgetPassword(false);
    // Add your login logic here
    console.log("Logging in with:", username, password);
  };

  return (
    <section className="flex flex-row items-center justify-center w-full pt-40 padding-r max-container padding-l wide:padding-r padding-b">
      <div className="card">
        <h2 className="text-4xl font-[550] tracking-wider text-center">
          Login
        </h2>
        <br />
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            {/* <label htmlFor="email"></label> */}
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              // className="input-text"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              // className='input-text'
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <Button type="submit" className="btn-success" label="Login" />
        </form>
        <button
          onClick={() => {
            setForgetPassword(true);
          }}
          className="p-3 font-semibold text-slate-gray"
        >
          Forget Password
        </button>
        {forgetPassword && (
          <form className="flex flex-col justify-center gap-6 md:mt-12 max-md:mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
            />
            <Button label="Send Password" handler={sendPwd} />
          </form>
        )}
        <p className="p-3 font-semibold text-slate-gray">
          Don't have account ?{" "}
          <Link to="/signup">
            {" "}
            <span className="text-primary">Sign Up</span>
          </Link>
        </p>

        <button className="py-1.5 font-semibold bg-transparent border-2 button border-primary text-slate-gray mt-2">
          <img src={googleIcon} alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
      <div className="flex flex-col pl-32 pr-16 max-md:hidden">
        <img
          src={loginImg}
          alt="Login Hero Image"
          className="self-center w-full max-w-md"
        />
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-2xl font-semibold text-left">
            Receive SMS online
          </h3>
          <p className="font-md">
            Register on social networks, marketplaces, exchanges and online
            services without spam and disclosure of personal data
          </p>
        </div>
      </div>
    </section>
  );
        };

export default Login;

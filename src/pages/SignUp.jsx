import signUpImg from "../assets/images/hero-login-signup-page.svg";
import googleIcon from "../assets/icons/google-icon.svg";
import { useState } from "react";
import Button from "../components/Button";
import Validation from "./SignupValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";



useNavigate;
const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post(`${BASE_URL}/signup`, values)
        .then((res) => navigate("/login"))
        .catch((err) => console.log(err));
    }
  };
  // const handleSignUp = () => {
  //     // Add your login logic here
  //     console.log("Logging in with:", username, password);
  //   };

  return (
    <section className="flex flex-row items-center justify-center w-full pt-40 padding-r max-container padding-l wide:padding-r padding-b">
      <div className="flex flex-col items-center justify-center flex-1 w-full px-16 py-12 bg-white shadow-lg rounded-3xl">
        <h2 className="text-4xl font-[550] tracking-wider text-center">
          Sign Up
        </h2>
        <br />
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={handleInput}
              className="input-text"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleInput}
              className="input-text"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleInput}
              className="input-text"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleInput}
              className="input-text"
            />
            {errors.confirmPassword && (
              <span className="text-danger">{errors.confirmPassword}</span>
            )}
          </div>
          <Button className="btn-success" label="Sign Up" />
        </form>

        <p className="p-3 font-semibold text-slate-gray">
          Already have account ?{" "}
          <a href="/login">
            <span className="text-primary">Log In</span>
          </a>
        </p>

        <button className="py-1.5 font-semibold bg-transparent border-2 button border-primary text-slate-gray mt-2">
          <img src={googleIcon} alt="Google Logo" />
          Sign Up with Google
        </button>
      </div>
      <div className="flex flex-col pl-32 pr-16 max-md:hidden">
        <img
          src={signUpImg}
          alt="Sign Up Hero Image"
          className="self-center w-full max-w-md"
        />
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-2xl font-semibold text-left">
            Receive SMS online
          </h3>
          <p className="font-md">
            Register on social networks, marketplaces, exchanges and online
            services without spam and disclosure of personal data
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

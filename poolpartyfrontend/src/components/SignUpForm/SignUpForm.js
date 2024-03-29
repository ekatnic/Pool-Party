import React, { useContext, useState } from "react";
import axiosInstance from "../../axiosConfig";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext";

function SignUpForm() {
  const navigate = useNavigate();
  const { setLoggedInDetails } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    // Add any other fields you need
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setSession = async function () {
    try {
      const response = await axiosInstance.get("/api/get-session");
      const data = response.data;
      setLoggedInDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/signup", formData);
      setSession();
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error (e.g. display error message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;

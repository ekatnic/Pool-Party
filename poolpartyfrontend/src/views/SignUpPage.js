// React component in App.js
import React, { Fragment } from "react";
import "../styles/base.css";
import NavBar from "../components/NavBar/NavBar";
import SignUpForm from "../components/SignUpForm/SignUpForm";

function AboutUs() {
  return (
    <Fragment>
      <NavBar />
      <div className="base-page">
        <SignUpForm />
      </div>
    </Fragment>
  );
}

export default AboutUs;
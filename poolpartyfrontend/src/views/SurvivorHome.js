// React component in App.js
import React, { Fragment } from "react";
import "../styles/base.css";

function SurvivorHome() {
  return (
    <Fragment>
      <div className="base-page">
        <h1 className="welcome-header">Welcome to Survivor Pools!</h1>
        <div className="welcome-text-box">Here we host survivor pools.</div>
      </div>
    </Fragment>
  );
}

export default SurvivorHome;

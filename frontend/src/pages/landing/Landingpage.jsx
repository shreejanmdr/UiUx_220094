import React from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css"; // Import custom styles

const Landingpage = () => {
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        {/* Left Section */}
        <div className="text-content">
          <img
            src="../../assets/images/logo.png"
            alt="Estate Ease Logo"
            className="logo"
          />
          <h1>Welcome to Estate Ease!</h1>
          <p className="description">
            Look into Estate Ease to find the desired property you are looking
            for or trying to sell. Finding your happiness is our happiness.
            Explore more into Estate Ease and let us help you find your dream
            property.
          </p>
          <div className="button-group">
            <Link to="/login" className="custom-button primary-button">
              Login
            </Link>
            <Link to="/register" className="custom-button secondary-button">
              Register
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="image-content">
          <img
            src="../../assets/images/landing.png"
            alt="Landing"
            className="landing-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Landingpage;


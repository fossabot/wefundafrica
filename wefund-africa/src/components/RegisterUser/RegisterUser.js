import React, { useContext, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css"

const ApplyNow = () => {

  const [authLoader, setAuthLoader] = useState(false);

  const [consentChecked, setConsentChecked] = useState(false);

  const [passwordStrengthError, setPasswordStrengthError] = useState("");

  const [passwordMatchError, setPasswordMatchError] = useState("");

  
  let navigate = useNavigate();
    const handlelogin = () => {
        navigate('/login')
    }
  const backendRoot =
    "http://54.236.11.151";
    // "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!authLoader) {
    //   setAuthLoader(true);

    if (!authLoader && !passwordMatchError) {
      setAuthLoader(true);

      const formData = new FormData(e.target);

      try {
        let response = await fetch(`${backendRoot}/register/`, {
          method: "POST",
          body: formData,
        });
        let data = await response.json();
        console.log(data);
        console.log("before if condition");
        if (response.status === 201) {
            console.log("User successfully register")
            navigate("/login");
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } 
    }
  };


  const handlePasswordChange = (e) => {
    const password = e.target.value;

    // Password strength criteria
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinimumLength = password.length >= 8;

    if (!(hasCapitalLetter && hasSpecialCharacter && hasNumber && hasMinimumLength)) {
      setPasswordStrengthError("Password must have at least 8 characters, including a capital letter, a special character, and a number.");
    } else {
      setPasswordStrengthError("");
    }

    const confirm_password = document.getElementsByName("confirm_password")[0].value;
    if (confirm_password && password !== confirm_password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };


  const handleConfirmPasswordChange = (e) => {
    const confirm_password = e.target.value;

    // Check if passwords match
    const password = document.getElementsByName("password")[0].value;
    if (password && password !== confirm_password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };


  return (
    <div className="Homepage_master_div">
      <div className="static-nav-bar">
        <StaticNavBar />
      </div>
      <div className="login_background_picture"></div>
      <div className="navbar_homepage">
        <Navbar showApplyNowButton={true} isDashboard={false}  />
      </div>

      <div className="login_page_master_div">
        <div className="login_page_child_div">
          <div className="register_div_heading">Register a new account</div>
          <form id="inputform" onSubmit={handleSubmit}>
          <div className="username_email">
              <div className="inputbox">
                <input name="username" type="text" required="required" />
                <span>Company Name</span>
              </div>
              <div className="email_margin">
                <div className="inputbox">
                  <input name="email" type="email" required="required" />
                  <span>Email</span>
                </div>
              </div>
          </div>
          <div className="passwords">
            <div className="password_error">
        <div className="inputbox">
        <input name="password" type="password" required="required"  onChange={handlePasswordChange}/>
        <span>Password</span>
        </div>
        {passwordStrengthError && (
          <div className="password-strength-error">{passwordStrengthError}</div>
        )}
        </div>
        <div className="password_margin">
        <div className="password_error">
        <div className="inputbox">
        <input name="confirm_password" type="password" required="required" onChange={handleConfirmPasswordChange}/>
        <span>Confirm Password</span>
        </div>
        </div>
        {passwordMatchError && (
          <div className="password-match-error">{passwordMatchError}</div>
        )}
        </div>
        
        </div>
        <div className="first_last">
        <div className="inputbox">
        <input name="first_name" type="text" required="required" />
        <span>First name</span>
        </div>
        <div className="lastname_margin">
        <div className="inputbox">
        <input name="last_name" type="text" required="required" />
        <span>Last name</span>
        </div>
        </div>
        </div>
        <div className="phone_year">
          <div className="inputbox">
          <input name="phone_number" type="tel" required="required" />
          <span>Phone number</span>
          </div>

          {/* Add years_in_business input */}
          <div className="year_margin">
            <div className="inputbox">
              <input name="years_in_business" type="number" required="required" />
              <span>Years in Business</span>
            </div>
          </div>
        </div>


        <div className="phone_year">
          <div className="inputbox">
          <input name="po_value" type="tel" required="required" />
          <span>Po Value</span>
          </div>

          {/* Add years_in_business input */}
          <div className="year_margin">
            <div className="inputbox">
              <input name="supplier_quote" type="text" required="required" />
              <span>Supplier Quote</span>
            </div>
          </div>
        </div>

          {/* Add monthly_revenue select */}
          <div className="inputbox">
            <select name="monthly_revenue" required="required">
              <option value="0">0 - 50k</option>
              <option value="1">50k - 100k</option>
              <option value="2">100k - 150k</option>
              <option value="3">150k +</option>
            </select>
            <div className="monthly_text">
            <span>Monthly Revenue</span>
            </div>
          </div>


          <div className="checkbox_label">
            <input type="checkbox" id="consentCheckbox" 
            checked={consentChecked}
            onChange={() => setConsentChecked(!consentChecked)}
            />
            <label htmlFor="consentCheckbox" style={{ color: '#3AA641', marginLeft: "5px" }}>
              I consent to the storage and processing of my details
                per WeFund Africa Privacy Policy.
            </label>
          </div>

          <div className="register_button">
            <button id="submit_button_login" type="submit" disabled={!consentChecked || authLoader}>
              {authLoader ? <span id="authloader"></span> : "Register"}
            </button>
          </div>
            <div className="login_register">
              <span onClick={handlelogin}>Login</span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyNow;

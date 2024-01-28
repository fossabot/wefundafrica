import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import "./Login.css";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import AppContext from "../utils/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const LoginPage = () => {

    let { loginUser } = useContext(AppContext);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate();
    const forgothandle = () => {
        navigate('/forgot')
    }
    const signup = () => {
        navigate('/register')
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
    <form id="inputform" onSubmit={loginUser}>
        <div className="inputbox">
        <input name="email" type="email" required="required" />
        <span>Email</span>
        </div>
        {/* <div className="inputbox">
            <input name="password" type="password" required="required" />
            <span>Password</span>
        </div> */}
        <div className="inputbox">
            <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required="required"
            />
            <span>Password</span>
            <button className="show_hide_pass" type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye/> : <FaEyeSlash />}
            </button>
        </div>
        <button id="submit_button_login" type="submit">
        {/* {authloader ? <span id="authloader"></span> : <>LOGIN</>} */}
        Login
        </button>
        <div className="signup_forgot">
        <div className="sign_up" onClick={signup}><span>Sign Up</span></div>
        <div className="forget_password" onClick={forgothandle}><span>Forgot Password</span></div>
        </div>
    </form>
    </div>
    </div>
        <Footer />
    </div>
);
};

export default LoginPage;



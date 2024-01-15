import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./PrivacyPage.css";
import product_background from "../../assets/image/product_background.jpg";
import StaticNavBar from "../StaticNavBar/StaticNavBar";
import purchase_order from "../../assets/image/purchase_order.jpg";
import term_funding from "../../assets/image/term_funding.jpg";
import merchant_cash from "../../assets/image/merchant_cash.jpg";
import business_loan from "../../assets/image/business_loan.jpg";
import line_of_credit from "../../assets/image/line_of_credit.jpg";
import { useEffect } from "react";



const PrivacyPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);
    return (
        <div className="Homepage_master_div">
        <div className="static-nav-bar">
            <StaticNavBar />
        </div>
        <div id="product_background_picture">
            <img src={product_background} />
        </div>
        <div className="product_image_heading_master">
            <div className="product_image_heading">
                Privacy Policy
            </div>
        </div>
        <div>
            <Navbar showApplyNowButton={true} isDashboard={false}  />
        </div>

        {/* <div className="product_service_background"> 
        </div> */}
        
        <div className="products_master_div">
            {/* <div className="privacy_master_div">
                <h3>
                    Privacy Policy of Wefund Africa
                </h3>
                
                <p>
                Introduction
                </p>
                <p>
                Welcome to Wefund Africa. Safeguarding your personal information is our utmost priority. 
                This Privacy Policy delineates the types of information we collect and how we utilize it.
                </p>
            </div> */}


            <div className="container">
                <h1 className="heading">Privacy Policy of Wefund Africa</h1>
                <p className="paragraph">
                    Welcome to Wefund Africa. Safeguarding your personal information is our utmost priority. 
                    This Privacy Policy delineates the types of information we collect and how we utilize it.
                </p>

                <h2 className="sub-heading">Information We Collect</h2>
                <p className="paragraph">
                    <strong>Personal Information:</strong> This encompasses any information that you willingly submit to us, 
                    such as your name, email address, and phone number.
                </p>
                <p className="paragraph">
                    <strong>Automated Information:</strong> We may gather non-personal information about your computer hardware 
                    and software, including IP addresses, browser types, domain names, access times, and referring website addresses.
                </p>

                <h2 className="sub-heading">How We Utilize Your Information</h2>
                <ul className="list">
                    <li>Operate our website</li>
                    <li>Provide the services you have requested</li>
                    <li>Inform you of other products or services available from Wefund Africa and its affiliates</li>
                    <li>Solicit feedback to enhance our website and services</li>
                </ul>

                <h2 className="sub-heading">Sharing of Your Information</h2>
                <p className="paragraph">
                    We do not sell, rent, or lease our customer lists to third parties. Trusted partners may receive data to assist 
                    in statistical analysis, send emails or postal mail, provide customer support, or facilitate deliveries. All third 
                    parties are expressly prohibited from using your personal information for any purpose other than to provide services 
                    to Wefund Africa, and they are obligated to maintain the confidentiality of your information.
                </p>

                <h2 className="sub-heading">Use of Cookies</h2>
                <p className="paragraph">
                    Our website utilizes "cookies" to personalize your online experience. A cookie is a text file placed on your hard 
                    drive by a web page server. Cookies cannot execute programs or deliver viruses to your computer. You can choose to 
                    accept or decline cookies through your web browser settings.
                </p>

                <h2 className="sub-heading">Security of your Personal Information</h2>
                <p className="paragraph">
                    Wefund Africa secures your personal information from unauthorized access, use, or disclosure. SSL protocols are 
                    employed for this purpose.
                </p>

                <h2 className="sub-heading">Opt-Out & Unsubscribe</h2>
                <p className="paragraph">
                    We respect your privacy and offer you the opportunity to opt out of receiving specific announcements, such as 
                    customer service notifications or administrative notices.
                </p>

                <h2 className="sub-heading">How to Contact Us</h2>
                <p className="paragraph">
                    For any general questions about the Site or the information we collect and how we use it, please contact us at info@wefundafrica.co.za.
                </p>

                <h2 className="sub-heading">Updates to this Policy</h2>
                <p className="paragraph">
                    This Privacy Policy is subject to periodic updates. The latest version will always be available on our website 
                    <a href="https://www.wefundafrica.co.za">(www.wefundafrica.co.za)</a>. We recommend checking for updates regularly. In the event of significant changes, notice 
                    will be provided through our service or other means.
                </p>
                </div>




        </div>





        


        
        <Footer />
        </div>
    );
    };

export default PrivacyPage;

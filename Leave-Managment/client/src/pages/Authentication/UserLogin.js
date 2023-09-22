import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import { sentUOtpFunction } from "../../Services/APIs/AuthAPI";
import "../../styles/mix.css";
import Header from "../../components/Headers/Header"

const Login = () => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  // sendotp
  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter Your Email !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else {
      setSpinner(true);
      const data = {
        email: email
      };

      const response = await sentUOtpFunction(data);

      if (response.status === 200) {
        setSpinner(false);
        localStorage.setItem('currentUser', email);
        //console.log("currentUser in localStorage:", localStorage.getItem('currentUser'));
        navigate("/user/otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };
  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/pond.webp)`,
    overflow: "hidden",
  };
  return (
    <>
    <Header/>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
            </div>
            <button className='btn' onClick={sendOtp}>
              Login
              {spinner ? <span><Spinner animation="border" /></span> : ""}
            </button>
          </form>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </section>
    </>
  );
};

export default Login;

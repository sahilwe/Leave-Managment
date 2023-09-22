import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { sentAOtpFunction } from "../../Services/APIs/AuthAPI";
import Spinner from 'react-bootstrap/Spinner';
import "../../styles/AdminHome.css"
import Header from "../../components/Headers/Header"

const Login = () => {

    const [email, setEmail] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

            const response = await sentAOtpFunction(data);

            if (response.status === 200) {
                setSpiner(false)
                navigate("/admin/otp",{state:email})
            } else {
                toast.error(response.response.data.error);
            }
        }
    }
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
                        <button className='btn' onClick={sendOtp}>Login
                        {
                            spiner ? <span><Spinner animation="border" /></span>:""
                        }
                        </button>
                    </form>
                </div>
                <Toaster position="top-right"
                    reverseOrder={false} />
            </section>
        </>
    )
}

export default Login
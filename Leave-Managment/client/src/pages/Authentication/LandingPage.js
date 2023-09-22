import React from "react";
import { useNavigate } from "react-router-dom";
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "../../components/Headers/Header"


function LoginPage() {
  const navigate = useNavigate();

  const handleEmployeeLoginClick = () => {
    navigate ('/Admin/Auth')
  };

  const handleCustomerLoginClick = () => {
    navigate("/User/Auth");
  };

  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/pond.webp)`,
    overflow: "hidden",
  };

  return (
    <>
    <Header />
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-gray-100"
      style={styles}
    >
      <div className="flex flex-col md:flex-row items-center mt-36">
        <div
          className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center"
          onClick={handleEmployeeLoginClick}
        >
          <FontAwesomeIcon icon={faBuilding} className="text-6xl mb-2" />
          <h2 className="text-lg font-bold">Admin</h2>
          <p className="text-gray-700 text-sm mt-2">
            Access administrative functions and user information.
          </p>
        </div>
        <div
          className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center"
          onClick={handleCustomerLoginClick}
        >
          <FontAwesomeIcon icon={faUserTie} className="fa-solid text-6xl mb-2 icon" />
          <h2 className="text-lg font-bold">User</h2>
          <p className="text-gray-700 text-sm mt-2">
            Access your account information and make Leave Requests.
          </p>
        </div>
      </div>

      <style>
        {`
          

          .card:hover .fa-user-tie {
            animation: rotate 2s infinite linear;
          }
          .card:hover .fa-building {
            animation: rotate 2s infinite linear;
          }

          @keyframes rotate {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        `}
      </style>
    </div>
    </>
  );
}

export default LoginPage;

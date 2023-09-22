import React, { useEffect, useState } from "react";
import { GetAccountInfo } from "../../Services/APIs/UserAPI";
import Navbar from '../../components/Sidebar/Navbar';

const UserHomePage = () => {
  const username = localStorage.getItem('currentUser');
  console.log("username: ", username);

  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/gvTIFs.webp)`,
    overflow: `hidden`,
    height: `89vh`
  };

  const [isLoading, setIsLoading] = useState(true);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [branch, setBranch] = useState("");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        setIsLoading(true);
        if (username) {
          const response = await GetAccountInfo({ email: username });
          //console.log(response.data); // Check the structure of the response data
          //console.log(response.data.accountTableData); // Check if accountTableData exists and its value
          setfName(response.data.accountTableData.fname);
          setlName(response.data.accountTableData.lname);
          setEmail(response.data.accountTableData.email);
          setPosition(response.data.accountTableData.position); // Update this line
          setPhone(response.data.accountTableData.mobile);
          setBranch(response.data.accountTableData.branch);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountInfo();
  }, [username]);


  return (
    <>
    <Navbar />
      <div className="flex flex-col items-center justify-center h-screen  bg-gray-100" style={styles}>
        <div className="bg-white rounded-lg shadow-lg height " style={{height: "500px", width: "500px"}}>
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <img
                className="h-16 w-16 rounded-full mx-auto"
                src={process.env.PUBLIC_URL + '/circle.png'}
                alt="User Avatar"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              { username }
            </h1>
            <p className="text-sm text-gray-600 text-center mb-4">
              Account holder
            </p>
            <div className="flex flex-col text-gray-700 mb-4">
              <span>
                <span className="ml-2">Full Name:</span>
                <span className="ml-2 font-bold">{ fname }</span>
                <span className="ml-2 font-bold">{ lname }</span>
              </span>
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <span>
                <span className="ml-2">Position:</span>
                <span className="ml-2 font-bold">{ position }</span>
              </span>
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <span>
                <span className="ml-2">Registered Email:</span>
                <span className="ml-2 font-bold">{ email }</span>
              </span>
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <span>
                <span className="ml-2">Registered Phone :</span>
                <span className="ml-2 font-bold">{ phone }</span>
              </span>
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <span>
                <span className="ml-2">Branch :</span>
                <span className="ml-2 font-bold">{ branch }</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;

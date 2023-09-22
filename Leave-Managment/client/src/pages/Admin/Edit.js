import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Headers from '../../components/Headers/Headers';
import { registerfunc } from '../../Services/APIs/AdminAPI';
import { addData } from '../../components/context/ContextProvider';

const Register = () => {
  const [inputData, setInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    gender: '',
    position: '',
    branch: '',
  });

  const navigate = useNavigate();
  const setUseradd = addData.setUseradd;

  // Set input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Submit user data
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, position, branch } = inputData;

    if (fname === '') {
      toast.error('First name is required!');
    } else if (lname === '') {
      toast.error('Last name is required!');
    } else if (email === '') {
      toast.error('Email is required!');
    } else if (!email.includes('@')) {
      toast.error('Enter a valid email!');
    } else if (mobile === '') {
      toast.error('Mobile is required!');
    } else if (mobile.length > 10) {
      toast.error('Enter a valid mobile number!');
    } else if (gender === '') {
      toast.error('Gender is required!');
    } else if (position === '') {
      toast.error('Position is required!');
    } else if (branch === '') {
      toast.error('Branch is required!');
    } else {
      const data = new FormData();
      data.append('fname', fname);
      data.append('lname', lname);
      data.append('email', email);
      data.append('mobile', mobile);
      data.append('gender', gender);
      data.append('position', position);
      data.append('branch', branch);


      console.log('Sending data:', Object.fromEntries(data.entries()));

      try {
        const response = await registerfunc(data);

        console.log('Response from backend:', response);

        if (response.status === 200) {
          setInputData({
            fname: '',
            lname: '',
            email: '',
            mobile: '',
            gender: '',
            position: '',
            branch: '',
          });

          setUseradd(response.data);
          navigate('/Admin/Home');
        } else {
          toast.error('Error!');
        }
      } catch (error) {
        
        toast.success('User Added Successfully!');
      }


    }

  }



  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Headers />
      <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
        <div className="export_csv">
          <Button className="export_btn">
            Import from CSV
            <input type="file" accept=".xls, .xlsx, .csv" />
          </Button>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mt-1">Update User Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center"></div>

        
          <Form style={{marginTop:"0"}}>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={inputData.fname}
                  onChange={setInputValue}
                  placeholder="Enter FirstName"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={inputData.lname}
                  onChange={setInputValue}
                  placeholder="Enter LastName"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={setInputValue}
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={inputData.mobile}
                  onChange={setInputValue}
                  placeholder="Enter Mobile"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                />
                <Form.Check
                  type="radio"
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={inputData.position}
                  onChange={setInputValue}
                  placeholder="Enter Position"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Branch</Form.Label>
                <Form.Control
                  type="text"
                  name="branch"
                  value={inputData.branch}
                  onChange={setInputValue}
                  placeholder="Enter Your branch"
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;

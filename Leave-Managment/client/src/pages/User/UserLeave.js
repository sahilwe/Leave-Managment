import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Sidebar/Navbar"
import "./UserLeave.css"

function Leave() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [leavetype, setLeaveType] = useState("");
  const [duration, setDuration] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [kpurpose, setkPurpose] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4002/User/leaveform",
        { name, email, phone, startdate, enddate, leavetype, duration, purpose,kpurpose }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachmentChange = (event) => {
    setAttachments([...attachments, event.target.files[0]]);
  };

  return (
    <>
    <Navbar/>
    <div className="App">
        <div className="box1">
      <div className="leave1">
        <h1> Leave Application Form </h1>{" "}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Phone No:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <label>
            Leave Type:
            <select
              value={leavetype}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value=""> Select a leave type </option>{" "}
              <option value="Casual Leave"> Casual Leave </option>{" "}
              <option value="Resticted Leave"> Resticted Leave </option>{" "}
              <option value="Earned Leave"> Earned Leave </option>{" "}
              <option value="Vacation Leave"> Vacation Leave </option>{" "}
              <option value="Special Leave"> Special Leave </option>{" "}
              <option value="Commuted Leave"> Commuted Leave </option>{" "}
              <option value="Hospital Leave"> Hospital Leave </option>{" "}
              <option value="Study Leave"> Study Leave </option>{" "}
              <option value="Childcare Leave"> Childcare Leave </option>{" "}
              <option value="other Leave"> other Leave </option>{" "}
            </select>{" "}
          </label>
          <label>
            Duration:
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </label>
          <label>
            Purpose:
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </label>
          <label>
            Worksop Name/Home
            <input
              type="text"
              value={kpurpose}
              onChange={(e) => setkPurpose(e.target.value)}
              required
            />
          </label>
          <label>
            Attachments:
            <input type="file" onChange={handleAttachmentChange} />{" "}
          </label>
          <button className="btn btn-primay m-3" onSubmit={handleSubmit}>
            submit
          </button>
        </form>{" "}
        <Toaster position="top-right"
                    reverseOrder={false} />
      </div>
    </div>
    </div>
    </>
  );
}

export default Leave;
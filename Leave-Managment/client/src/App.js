import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/Authentication/LandingPage';
import Login from './pages/Authentication/UserLogin';
import Log from './pages/Authentication/AdminLogin';
import Aotp from './pages/Authentication/AdminOtp';
import Uotp from './pages/Authentication/UserOtp';
import AdminHomePage from './pages/Admin/AdminHome';
import Register from './pages/Admin/Register';
import Edit from './pages/Admin/Edit';
import Profile from './pages/Admin/Profile';
import UserHome from './pages/User/UserHome'
import UserLeave from './pages/User/UserLeave';
import UserLogs from './pages/User/Leavelogs';
import AdminLogs from './pages/Admin/LeaveLogs';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/User/Auth" element={<Login />} />
          <Route path="/user/otp" element={<Uotp />} />
          <Route path="/user/Home" element={<UserHome />} />
          <Route path="/User/Leaveform" element={<UserLeave/>}/>
          <Route path="/User/Logs" element={<UserLogs/>}/>

          <Route path="/Admin/Auth" element={<Log />} />
          <Route path="/Admin/otp" element={<Aotp />} />
          <Route path="/Admin/Home" element={<AdminHomePage />} />
          <Route path='/Admin/register' element={<Register />} />
          <Route path='Admin/edit/:id' element={<Edit />} />
          <Route path='/Admin/userprofile/:id' element={<Profile />} />
          <Route path="/Admin/Logs" element={<AdminLogs/>}/>
          {/* Add other routes here */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

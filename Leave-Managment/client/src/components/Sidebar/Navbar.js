import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, useLocation} from 'react-router-dom';
import {SidebarData} from './UserBarData';
import './Navbar.css';
import {IconContext} from 'react-icons';

function Navbar() {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  let isClickable;

  if (location.pathname === '/User/Home') {
    isClickable = false;
  }

  else isClickable = true;

  let navData = SidebarData;

  let text;
      switch (location.pathname) {
        case '/User/Home':
          text = 'Profile';
          break;
        case '/User/Leaveform':
          text = 'Apply Leave';
          break;
        case '/User/Logs':
          text = 'Leave Logs';
          break;
        default:
          text = 'Leave Management Portal';
      }

  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="navbar">
          <Link to="#" className={`menu-bars ${isClickable ? '' : 'disabled'}`}>
            <FaIcons.FaBars onClick={isClickable ? showSidebar : null} />
          </Link>
          let text;
          <Link to="/" className="mx-auto text-white font-semibold text-3xl tracking-wide text-center hover:underline">
            {text}
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose lineClose />
              </Link>
            </li>

            {navData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className=''>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

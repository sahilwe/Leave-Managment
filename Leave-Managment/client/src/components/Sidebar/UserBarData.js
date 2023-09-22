import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const SidebarData = [
    {
        title: "Home",
        path: '/User/Home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    

    {
        title: "Leave Requests",
        path: '/User/Leaveform',
        icon: <FaIcons.FaArrowCircleRight/>,
        cName: 'nav-text'
    },

    {
        title: "Leave Logs",
        path: '/User/Logs',
        icon: <FaIcons.FaArrowUp/>,
        cName: 'nav-text'
    },
    {
        title: "Log-out",
        path: '/',
        icon: <FaIcons.FaLockOpen/>,
        cName: 'nav-text'
    },
]
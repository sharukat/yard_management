import React from 'react'
import "./Sidebar.css"

import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import GradingIcon from '@mui/icons-material/Grading';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='com_titile'>Asian Container Terminal</div>
        <div className='com_abb'>(ACT)</div>
        
        <div className="sidebarWrapper">
            <div className='sidebarMenue'>
            
            <ul className='sidebarList'>
                <Link to="/" className='link'>
                    <li className='sidebarListItem'>
                        <SouthEastIcon className='sidebarIcon'/>
                        Container Inbound
                    </li>
                </Link>
                
                <Link to="/containerOut" className='link'>
                    <li className='sidebarListItem'>
                        <NorthWestIcon className='sidebarIcon'/>
                        Container Outbound
                    </li>
                </Link>
                
                <Link to="/containerReservation" className='link'>
                    <li className='sidebarListItem'>
                        <GradingIcon className='sidebarIcon'/>
                        Reservation
                    </li>
                </Link>
                
                
                <Link to="/customerReports" className='link'>
                    <li className='sidebarListItem'>
                        <PendingActionsIcon className='sidebarIcon'/>
                        Reports
                    </li>
                </Link>

                <Link to="/containerStatus" className='link'>
                    <li className='sidebarListItem'>
                        <ClearAllIcon/>
                        Container Status
                    </li>
                </Link>
            </ul>
            </div>
        </div>
    </div>
  )
}

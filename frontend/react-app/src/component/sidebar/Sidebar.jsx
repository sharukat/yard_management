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
        <div className="sidebarWrapper">
            <div className='sidebarMenue'>
            <ul className='sidebarList'>
                <Link to="/" className='link'>
                    <li className='sidebarListItem'>
                        <SouthEastIcon className='sidebarIcon'/>
                        Container Inbound
                    </li>
                </Link>
                
                <Link to="/container_out" className='link'>
                    <li className='sidebarListItem'>
                        <NorthWestIcon className='sidebarIcon'/>
                        Container Outbound
                    </li>
                </Link>
                
                <li className='sidebarListItem'>
                    <GradingIcon className='sidebarIcon'/>
                    Reservation
                </li>
                <li className='sidebarListItem'>
                    <PendingActionsIcon className='sidebarIcon'/>
                    Overdue
                </li>
                <li className='sidebarListItem'>
                    <ClearAllIcon/>
                    Clear Container Outbound
                </li>
            </ul>
            </div>
        </div>
    </div>
  )
}

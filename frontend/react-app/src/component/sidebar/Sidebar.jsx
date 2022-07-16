import React from 'react'
import "./Sidebar.css"

import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import GradingIcon from '@mui/icons-material/Grading';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className='sidebarMenue'>
            <ul className='sidebarList'>
                <li className='sidebarListItem active'>
                    <SouthEastIcon className='sidebarIcon'/>
                    Container Inbound
                </li>
                <li className='sidebarListItem'>
                    <NorthWestIcon className='sidebarIcon'/>
                    Container Outbound
                </li>
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

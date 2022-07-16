import React from 'react'
import "./Topbar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topleft'>
                <span className='logo'>Asian Container Terminal (ACT)</span>
            </div>
            <div className='topright'>
                <div className="topbarIconContainer">
                    <SearchSharpIcon/>
                    <AccountCircleIcon />
                </div>
            </div>
        </div>
    </div>
  )
}

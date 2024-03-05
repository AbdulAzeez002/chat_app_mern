import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from '../sidebar/LogoutButton';

const Header = () => {
  return (

    <div  style={{height:'10vh'}} className='flex justify-end bg-slate-800 '>
      <div className="">
      <LogoutButton />
      </div>
    </div>

  )
}

export default Header
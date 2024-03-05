import React from 'react'
import LogoutButton from '../sidebar/LogoutButton';

const Header = () => {
  return (

    <div  style={{height:'10vh'}} className='flex justify-end bg-slate-700 '>
      <div className="">
      <LogoutButton />
      </div>
    </div>

  )
}

export default Header
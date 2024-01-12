import React from 'react';
import Logo from '../Images/logo.png';

const Header = () => {
  return (
    <div className='flex items-center justify-center relative top-0 h-20 bg-black'>
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="h-10 w-10 " />
      </div>
    </div>
  );
};

export default Header;

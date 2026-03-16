import React from 'react'
import {NavLink} from 'react-router-dom';
import logo from '../assets/react.svg'


const Navbar = () => {
  return (
    <div className='absolute z-10 inset-0'>

        <div className='flex justify-center items-center pt-10 gap-32 text-center'>

         <div> 
            <img src={logo} height={55} width={100}/>
         </div>

         <div className='flex text-center justify-center items-center gap-16  text-white'>
           <NavLink to="/" className={({ isActive }) => isActive ? "font-sensation font-bold text-base leading-custom underline cursor-pointer p-2" : "font-sensation font-normal text-base hover:font-medium leading-custom cursor-pointer"} >
                <p>Home</p>
            </NavLink>

            <NavLink to="/calculator" className={({ isActive }) => isActive ? "font-sensation font-bold text-base leading-custom underline cursor-pointer" : "font-sensation font-normal hover:font-medium text-base leading-custom cursor-pointer"} >
                <p>Calculator</p>
            </NavLink>

            <NavLink to="/reviews" className={({ isActive }) => isActive ? "font-sensation font-bold text-base leading-custom underline cursor-pointer" : "font-sensation font-normal text-base leading-custom cursor-pointer"} >
                <p>Reviews</p>
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => isActive ? "font-sensation font-bold text-base leading-custom underline cursor-pointer" : "font-sensation font-normal text-base leading-custom cursor-pointer"} >
                <p>Contact</p>
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => isActive ? "font-sensation font-bold text-base leading-custom underline cursor-pointer" : "font-sensation font-normal text-base leading-custom cursor-pointer"} >
                <p>About Us</p>
            </NavLink>
         </div>

         <button className="bg-white rounded-br-[32px] rounded-tl-[32px] hover:rounded-tr-[32px] hover:rounded-bl-[32px] hover:rounded-br-[0px] hover:rounded-tl-[0px] w-32 h-12">
           <NavLink to="/login">
             Login 
            </NavLink>
         </button> 
        </div>
    </div>
  )
}

export default Navbar
import React, { useState } from 'react'
import { Logo } from '../assets/img/index'
import { NavLink, useNavigate } from 'react-router-dom'
import { isActiveStyle, isNotActiveStyle } from '../utils/style'
import { FaCrown } from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { motion } from 'framer-motion'
const Header = () => {

    const [{user}, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false)
    
    const navigate = useNavigate();
    
    
    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", {replace: true})
    }
  return (
    <header className='flex items-center justify-between w-full h-full p-4 md:py-2 md:px-6'>
        <NavLink>
            <img src={Logo} alt="Logo" className='w-28' />
        </NavLink>

        <ul className='flex items-center justify-center ml-7 flex-grow'>
            <li className='mx-5 text-lg'><NavLink to = {'/home'} className= {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle } >Home</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to = {'https://www.nhaccuatui.com/'}className= {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }  >Music Source</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to = {'/premium'}className= {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }  >Premium</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to = {'https://www.facebook.com/ccuonglle/'}className= {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }  >Contact</NavLink></li>
        </ul>

        <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className='flex items-center ml-auto cursor-pointer gap-2 relative'>
            <img src={user?.user?.imageURL} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='no-referrer' />
            <div className='flex flex-col'>
                <p className='text-lime-500 text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                <p className='flex items-center gap-2 text-xs text-yellow-300 font-normal'>Premium Member. <FaCrown className = 'text-sm -ml-1 text-yellow-400'></FaCrown> </p>
            </div>
            {isMenu && (
                <motion.div
                initial = {{opacity: 0, y: 50}}
                animate = {{opacity: 1, y: 0}}
                exit = {{opacity:0, y: 50}}
                className='absolute z-10 top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg background-blur-sm flex flex-col'>
                    <NavLink to = {'/userProfile'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                    </NavLink>
                    <NavLink to ={'Myfavourites'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My favourites</p>
                    </NavLink>
                    <hr/>

                    {
                        user?.user?.role === "admin" && (
                            <NavLink to = {"/dashboard/home"}>
                                <p className='text-base text-textColor hover:font-semibold duration-150 
                                transition-all ease-in-out'>
                                    
                                    Dashboard</p>
                            </NavLink>
                        )
                    }
                    <hr/>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'
                    onClick={logOut}>Sign out</p>
                </motion.div>
            )}
        </div>

    </header>
    
  )
}

export default Header

import React from 'react'
import './sidebar.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import {IoHome, IoMusicalNote, IoAlbums} from 'react-icons/io5'
import {FaUser, FaPaintBrush, FaPlusCircle} from 'react-icons/fa'
import { isActiveStyle, isNotActiveStyle } from '../utils/style'
import DashboardAlbums from "./DashboardAlbums";
import DashboardArtists from "./DashboardArtists";
import DashboardHome from "./DashboardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUsers from "./DashboardUsers";
import DashboardNewSongs from "./DashboardNewSongs"
import Header from './Header'

const Dashboard = () => {
  return (

<div className="w-full h-auto flex flex-col items-center justify-center">
  <Header />
  {/* Sidebar */}
  
      <div className="w-[60%] my-2 bg-gray-800 text-white p-4 flex items-center justify-evenly custom-wave-border">
    {/* Các items khác trong sidebar */}
        <NavLink to = {"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <IoHome className='text-2xl style' style={{ color: '#FF1493' }}></IoHome>Home</NavLink>
        <NavLink to = {"/dashboard/user"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <FaUser className='text-2xl style' style={{ color: '#FF1493' }}></FaUser>User</NavLink>
        <NavLink to = {"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <IoMusicalNote className='text-2xl style' style={{ color: '#FF1493' }}></IoMusicalNote>Song</NavLink>
        <NavLink to = {"/dashboard/artist"}className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <FaPaintBrush className='text-2xl style' style={{ color: '#FF1493' }}></FaPaintBrush>Artist</NavLink>
        <NavLink to = {"/dashboard/albums"}className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <IoAlbums className='text-2xl style' style={{ color: '#FF1493' }}></IoAlbums>Albums</NavLink>
    {/* <NavLink to = {"/dashboard/newSongs"}className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
            <FaPlusCircle className='text-2xl style' style={{ color: '#FF1493' }}></FaPlusCircle></NavLink> */}
      </div>


      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtists />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newSongs" element={<DashboardNewSongs />} />
        </Routes>
      </div>

</div>

  )
}

export default Dashboard
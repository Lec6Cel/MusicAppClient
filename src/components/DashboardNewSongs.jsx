import React, { useEffect } from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { storage } from '../config/firebase.config';
import { useStateValue } from '../context/StateProvider';
import { useState } from 'react';
import FilterButtons from './FilterButtons'
import { 
  getAllAlbums, 
  getAllArtist, 
  getAllSongs, 
  getAllUsers, 
  saveNewAlbum, 
  saveNewArtist, 
  saveNewSong 
} from '../api';
import { actionType } from '../context/reducer';
import { IoMusicalNote } from 'react-icons/io5';
import {filterByLanguage, filters} from '../utils/supportfunctions'
// import AlertSuccess from './AlertSuccess';
// import AlertError from './AlertError';

const DashboardNewSongs = () => {
  const [songName, setsongName] = useState('');
  const [songImageCover, setsongImageCover] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(0)
  const [isImageLoading, setisImageLoading] = useState(false);
  const [{allArtists, allAlbums}, dispatch] = useStateValue();

  useEffect(()=> {
    // if artists
    if(!allArtists)
    getAllArtist().then(data => {
      dispatch({
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data.artist
      })
    });
    // if albums
    if(!allAlbums) {
      getAllAlbums().then(data => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }

  },[])
  return (
    <div className='flex flex-col items-center justify-center p-4 
    border border-gray-300 gap-4 rounded-md'>
      <input type='text' 
      placeholder='Type your song name...' 
      className='w-full p-3 rounded-md text-base font-semibold text-black outline-none shadow-sm
      border border-gray-300 bg-transparent'
      value={songName}
      onChange={(e) => setsongName(e.target.value) }/>

      <div className='flex w-full justify-between flex-wrap items-center gap-4'>
      <FilterButtons filterData={allArtists} flag ={'Artist'}/>
      <FilterButtons filterData={allAlbums} flag ={'Album'}/>
      <FilterButtons filterData={filterByLanguage} flag ={'Language'}/>
      <FilterButtons filterData={filters} flag ={'Category'}/>
      </div>
      <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted
      border-gray-300 cursor-pointer'>
          {isImageLoading && <FileLoader progress = {imageUploadProgress}/>}
          {!isImageLoading && (
            <>
            {!songImageCover ? (
              <FileUploader 
              updateState = {setsongImageCover} 
              setProgress = {setimageUploadProgress} 
              isLoading = {setisImageLoading} 
              isImage ={true}/>): (<div></div>)}
            </>
          )}
      </div>
    </div>
  )
}

export const FileLoader = ({progress}) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <p className='text-xl font-semibold text-black'>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className='w-20 h-20 min-w-[40px] bg-blue-600 animate-ping
      rounded-full flex items-center justify-center relative'>
          <div className='absolute inset-0 rounded-full bg-blue-600 blur-xl'></div>
      </div>

    </div>
  )
}

export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {
  const uploadFile = (e) =>{
      isLoading(true);
      const uploadedFile =e.target.files[0];
      console.log(uploadFile);
  }
  return (
  <label>
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col justify-center items-center cursor-pointer'>
        <p className='font-bold text-2xl'>
          <BiCloudUpload />
        </p>
        <p className='text-lg'>Click to upload  
          {isImage ? ' an image' : 'an audio'}
        </p>
      </div>
    </div>
    <input 
    type='file'
    name='upload-file'
    accept={`${isImage ? 'image/*' :'audio/*'}`}
    className='w-0 h-0'
    onChange={uploadFile}
    />
  </label> 
  )
};

export default DashboardNewSongs
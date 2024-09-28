import React , {useState} from 'react'
import './sidebar.css'
import {useStateValue } from '../context/StateProvider';
import {motion } from 'framer-motion';
import moment from 'moment';
import {changingUserRole, getAllUsers, removeUser } from '../api';
import {actionType} from "../context/reducer"
import {MdDelete} from 'react-icons/md'
const DashboardUsers = () => {


  const [filtereUsers, setFiltereUsers] = useState(null);
  const [{ allUsers }, dispatch] = useStateValue();
  
  
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      {/* filter */}

      {/* tabular data form */}
      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start
      p-4 border custom-wave-border'>
        {/* total count of the user */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className="text-base font-semibold text-black">
              Count :{" "}
            </span>
            {filtereUsers ? filtereUsers?.length : allUsers?.length}
            </p>
        </div>
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Image</p>
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Name</p>
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Email</p>
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Verified</p>
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Created</p>
          <p className="text-base text-black font-semibold w-190 min-w-[160px] text-center">Role</p>{" "}
        </div>
        
        {/* table body content */}
        {
          allUsers && (
            allUsers?.map((data, i) => (
              <DashboardUserCard data ={data} index ={i}/>
            ))
          )
        }

      </div> 
      
    </div>
  )
}

export const DashboardUserCard = ({data, index}) => {
 
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false)  
  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY, h:mm:ss a')

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers : data.data
          })
        })
      }
    })
  }
 
  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        })
      }
    })
  }

  return (
    <motion.div key={index} className='relative w-full rounded-md flex items-center justify-between py-4 bg-slate-600
    cursor-pointer hover:bg-cyan-800 hover:shadow-md  '>
       {data._id !== user?.user._id &&  ( 

      <motion.div whileTap={{scale : 0.75}} className=' absolute left-4 w-8 h-8 rounded-md flex items-center 
      justify-center bg-gray-200' onClick={() => deleteUser(data._id)}>
        <MdDelete className ='text-xl text-red-400 hover:text-red-500' />
      </motion.div>
       )}
      {/* user image */}
      <div className='w-190 min-w-[160px] flex items-center justify-center'>
        <img src={data.imageURL} referrerPolicy='no-referrer' alt='' className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/> 

      </div>

      {/* user name */}

      <p className='text-base text-black w-190 min-w-[160px] text-center'>{data.name}</p>
      <p className='text-base text-black w-190 min-w-[160px] text-center'>{data.email}</p>
      <p className='text-base text-black w-190 min-w-[160px] text-center'>{data.email_verified ? "Xác nhận" : "Không xác nhận"}</p>
      <p className='text-base text-black w-190 min-w-[160px] text-center'>{createdAt}</p>
      <div className='w-190 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
      <p className='text-base text-black text-center'>{data.role}</p>
        {
          /*Dieu kien kiem tra userID co khop voi userID tren database hay khong
          neu khop thi tra ve role nhu da dang ky*/
          data._id !== user?.user._id &&  (
            <motion.p whileTap={{scale : 0.75}} className='text-[10px] font-semibold text-black px-1 bg-purple-200 rounded-sm 
            hover:shadow-sm' onClick={() => setIsUserRoleUpdated(true)}>
            {data.role === 'admin' ? 'Member' : 'Admin'}
          </motion.p>
          )
        }

        
          {isUserRoleUpdated && (
              <motion.div
              initial ={{opacity: 0, scale:0.5}}
              animate={{opacity: 1, scale:1}}
              exit={{opacity: 0, scale: 0}} 
              className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl
                    rounded-md'>
                  <p className='text-textColor text-sm font-semibold'>Bạn có thật sự muốn đổi vai trò của thành 
                        viên không
                    <span> {data.role === 'admin' ? 'Member' : 'Admin'} </span>?
                      </p>
                      <div className='flex items-center gap-4'>
                        <motion.button whileTap={{scale : 0.75}} className='outline-none border-none text-sm px-4 py-1
                        rounded-md bg-blue-200 text-black hover:shadow-md' onClick={() => updateUserRole(data._id, data === "admin" ? "member" : "admin")}>
                          Có
                        </motion.button>
                        <motion.button whileTap={{scale : 0.75}} className='outline-none border-none text-sm px-4 py-1
                        rounded-md bg-gray-200 text-black hover:shadow-md' onClick={() => setIsUserRoleUpdated(false)}>
                          Không
                        </motion.button>
                      </div>
              </motion.div>
          )}
      </div>
    </motion.div>
  )
}
export default DashboardUsers

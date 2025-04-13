import React ,{useContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    
    const navigate = useNavigate()

  return (
    <div className='min-h-screen'>
       
       {/*Navbar for recruiter panel */}
        <div className='shadow py-4'>
            <div className='px-4  mx-auto flex justify-between items-center'>
                <div className='flex justify-between gap-3 '>
                    <div className="border-1 border-purple-400 rounded-lg ">
                       <img  
                         onClick={() => navigate('/')}         
                         src={assets.jobPortalLogonew}
                         alt="joblogo"
                         className=" cursor-pointer max-sm:w-32 max-sm:h-15  w-[100px] h-[46px] rounded-md filter hue-rotate-45"
                
                        />           
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='max-sm:hidden'> Welcome , shivali</p>
                    <div className='relative group'>
                        <img className='w-8 s border-0 rounded-full' src={assets.company_icon} alt="company_icon" />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-0 text-black rounded pt-12 '>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
                      
            </div>
        </div>

        <div className='flex items-start'>

            {/*left sidebar with option add jobs, manage jobs & view applications */}
            <div className='inline-block min-h-screen border-r-2 border-gray-300'>
                <ul className='flex flex-col items-start pt-5 txt-gray-800'>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                       <img className='min-w-4' src={assets.add_icon} alt="add_icon" />
                       <p className='max-sm:hidden' >Add Job</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                       <img className='min-w-4' src={assets.home_icon} alt="home_icon" />
                       <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                       <img className='min-w-4' src={assets.person_icon} alt="person_icon" />
                       <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>
                </ul>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
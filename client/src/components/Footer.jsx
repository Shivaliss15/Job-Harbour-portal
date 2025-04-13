import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 flex justify-between gap-8 mx-auto  py-3 mt-20'>
        <div className='flex items-center justify-between gap-8 '>
            <div className="border-1 border-purple-400 rounded-lg ">
               <img  
                 onClick={() => navigate('/')}         
                 src={assets.jobPortalLogonew}
                 alt="joblogo"
                 className=" cursor-pointer   w-[100px] h-[46px] rounded-md filter hue-rotate-45"
        
                />           
            </div>

            <p className='text-gray-500'>|</p>
            
            <p className='flex-1 pl-2 pr-2 text-sm bg-purple-50 text-gray-500 max-sm:hidden'>All right reserved. Copyright @job-HarBour </p>
        </div>
        
        <div className='flex gap-2.5'>
            <img width ={38} src={assets.facebook_icon} alt="facebook" />
            <img width ={38} src={assets.twitter_icon} alt="twitter_icon" />
            <img width ={38} src={assets.instagram_icon} alt="instagram_icon" /> 
        </div>
    </div>
  )
}

export default Footer
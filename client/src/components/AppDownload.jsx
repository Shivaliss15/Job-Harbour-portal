import React from 'react'
import {assets} from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container mx-auto my-20 px- 2xl:px-40 '>
        <div className='relative  rounded-xl p-12 sm:p-24 lg:p-32 bg-gradient-to-r from-[rgba(245,242,255,1)] to-[#FBF6FF]  '>
            <div  >
                <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md text-black  '>Download Mobile App For Better Experience</h1>
                <div className='flex gap-4' >
                    <a href="#"  className='inline-block' >
                        <img  className='h-12' src={assets.play_store} alt="play store" />
                    </a>
                    <a href="#" className='inline-block' >
                        <img className='h-12' src={assets.app_store} alt="app store" />
                    </a>
                                    </div>
                <div>
                    <img className=' absolute w-100 right-0 bottom-0 mr-40 max-lg:hidden' src={assets.excitedwoman_app} alt="excited woman" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AppDownload
import React ,{useContext, useEffect, useState} from 'react'
import { assets } from '../assets/assets'
import { SignUp } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const RecruiterLogin = () => {

    const [state , setState] = useState('Login')
    const [name , setName]  = useState('') 
    const [password ,SetPassword] = useState('')
    const [email , setEmail] = useState('')

    const [image , setImage ]  = useState(null)

    const [isTextDataSubmited  , setIsTextDataSubmited ] = useState(false)

    const {setShowRecruiterLogin} = useContext(AppContext)

    const onSubmitHandler = async(e) => {
        e.preventDefault()

        if(state == "SignUp" && !isTextDataSubmited) {
            setIsTextDataSubmited(true)
        }
    }

    useEffect(() =>{
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    } , [])
    /*When the component is shown (mounted): Set the page's <body> to overflow: hidden
          This prevents scrolling on the whole page (good for modals/popups).
      When the component is hidden (unmounted):It resets the overflow back to normal (unset)
          This brings back scrolling when the modal or popup closes. */

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ' >
        <form onSubmit={onSubmitHandler} className='relative bg-blue-50 p-10 rounded-2xl text-slate-500'>

            <img onClick={e => setShowRecruiterLogin(false) } className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="cross_icon" />
            <h1 className='text-center text-2xl text-neutral-700 font-semibold *:' >Recruiter {state} </h1>
            <p className='text-sm text-blue-600' > Welcome back! Please sign in to continue </p>
            
            { state === "SignUp" && isTextDataSubmited 
            ? <>
               <div className='flex items-center gap-4 my-10'>
                <label htmlFor="image">                                                          { /*URL.createObjectURL(image)  -> Turn this image file into a URL so the browser can show it. */}
                    <img className=' mt-2 w-16 rounded-full ' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload_area" />
                    <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden/>
                    {/* setImage(e.target.files[0]) ->When the user picks a file, save that file into my React state(here image). */}
                </label>
                <p>Upload Company <br /> Logo</p>
               </div>
            </> 
            :<>

               { state !== 'Login' && (
                  <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img  src={assets.person_icon} alt="person_icon" />
                    <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required/>
                  </div>
               ) }
               

               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt="email_icon" />
                <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required/>
               </div>

               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt="lock_icon" />
                <input className='outline-none text-sm' onChange={e => SetPassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
               </div>

               

            </>
            }

            {state === 'Login' && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot Password?</p> }
            
            <button type='submit'  className=' bg-blue-600 w-full  text-white py-2 rounded-full mt-4'>
                {state === 'Login' ? 'Login' : isTextDataSubmited ? 'create account' : 'next'}
            </button>

            { state === 'Login' ? (
                  <div className="flex items-center space-x-1 text-center mt-5">
                    <p className="text-gray-500">Don't have an account? 
                        <span onClick={() => setState('SignUp')} className="text-blue-500 cursor-pointer"> 
                            Sign up
                        </span>
                    </p>   
                  </div>
               ) : (
                <div className="flex items-center space-x-1 text-center mt-5">
                    <p className="text-gray-500">Already have an account?
                        <span onClick={() => setState('Login')} className="text-blue-500 cursor-pointer"> 
                            Login
                        </span>
                    </p> 
                </div>

               )
               
            
            }

            
            
           
        </form>
    </div>
  )
}

export default RecruiterLogin
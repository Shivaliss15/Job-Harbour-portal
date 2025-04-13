import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk(); // Correct Clerk hook function to open the sign-in modal
  const { user, isLoaded } = useUser();
  const navigate = useNavigate()

  const {setShowRecruiterLogin} = useContext(AppContext)

  const handleLoginClick = () => {
    // Only show sign-in modal if the user is not signed in
    if (!user) {
      openSignIn();
    } else {
      console.log("User is already signed in, not showing sign-in modal.");
    }
  };
  
  
  if (!isLoaded) {
    return <div>Loading...</div>; // Display loading state until user data is fetched
  }

  console.log("User Data:", user); // Log user data to see if it's changing unexpectedly
  


  return (
    <div className="shadow py-2">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <div className='flex justify-between gap-3 '>
          <div className=" rounded-lg ">
           <img  
             onClick={() => navigate('/')}         
             src={assets.newJobLogo3}
             alt="joblogo"
             className=" cursor-pointer   w-[100px] h-[66px] rounded-md"
    
            />           
          </div>

          <div className='mt-4 '>
            <h2 className=' font-bold font-serif text-2xl text-purple-950'>Job Harbor</h2>
          </div>

        </div>
      

        {
            user
            ?<div className='flex items-canter gap-3' >
                <Link to='/applications' >Applied Jobs</Link>
                <p>|</p>
                <p className='max-sm:hidden' >Hi , {user.firstName+" "+user.lastName}</p>
                <UserButton/>
            </div>
            :<div className="flex gap-4 max-sm:text-xs">
              <button onClick={e => setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
              <button
                onClick={handleLoginClick}
                className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
              >
                Login
              </button>
            </div>
        }
        
        
          
        

      </div>
    </div>
  );
};

export default Navbar;

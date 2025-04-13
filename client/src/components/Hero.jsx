import React, { useContext , useRef} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

//useRef → Creates a reference to DOM elements or variables that don’t cause re-renders.

const Hero = () => {

    const {setSearchFilter,setIsSearched} = useContext(AppContext)
    
    const tittleRef = useRef(null);   //useRef → Creates a reference to DOM elements or variables that don’t cause re-renders.
    const locationRef = useRef(null); 
    //Sometimes, you need direct access to an HTML element, like an input field or a button. Instead of using document.querySelector(), we use useRef in React.
    //After the component mounts, tittleRef.current & locationRef.current refers to the actual <input> element.
    
    const onSearch= () =>{
        setSearchFilter({
            title : tittleRef.current.value, // Getting value from title input
            location : locationRef.current.value  
        })
        setIsSearched(true)
        
    }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
            <h2 className='text-2xl md:text-xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
            <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
             <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                <div className='flex items-center'>
                    <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                    <input type="text" 
                    placeholder='Search for jobs'
                    className='max-sm:text-xs p-2 rounded outline-none w-full'
                    ref = {tittleRef}
                    /*useRef(null) → Creates a reference (tittleRef).
                      ref={tittleRef} → Assigns the reference to the <input> element.
                      tittleRef.current.value → gets the input when the button is clicked.
                      */
                    />
                </div>
                <div className='flex items-center'>
                    <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                    <input type="text" 
                    placeholder='Location'
                    className='max-sm:text-xs p-2 rounded outline-none w-full'
                    ref = {locationRef} //ref={locationRef} attaches the locationRef reference to the input field.
                                        //allows you to access the input's value
                    />
                </div>
                <button onClick = {onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
             </div>
        </div>

        <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
            <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                <p className='font-medium'>Trusted by</p>
                <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">
                  <img className='h-6 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
                </a>
                <a href="https://www.walmart.com" target="_blank" rel="noopener noreferrer">
                   <img className='h-6' src={assets.walmart_logo} alt="" />
                </a>
                <a href="https://www.samsung.com" target="_blank" rel="noopener noreferrer">
                   <img className='h-6' src={assets.samsung_logo} alt="" />
                </a>
                <a href="https://www.accenture.com" target="_blank" rel="noopener noreferrer">
                   <img className='h-6' src={assets.accenture_logo} alt="" />
                </a>
                <a href="https://www.adobe.com/" target="_blank" rel="noopener noreferrer">
                   <img className='h-6' src={assets.adobe_logo} alt="" />
                </a>
                <a href="https://www.amazon.in/" target="_blank" rel="noopener noreferrer">
                   <img className='h-6' src={assets.amazon_logo} alt="" />
                </a>
                
                
                
                
               
                
            </div>

        </div>

        
    </div>

   
  )
}

export default Hero
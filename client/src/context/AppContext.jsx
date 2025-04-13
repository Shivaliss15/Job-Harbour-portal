/* Context Files (.js or .jsx) – These define the 
   global state and provide data to components. 
   Avoid prop drilling: Pass data globally without needing to send it through multiple components.
   Manage global state: Store user authentication, themes, language settings, etc.
   Improve code structure: Keep state logic separate from UI components.
   */
import React, { createContext ,useState, useEffect} from 'react';
import { jobsData } from '../assets/assets';
//useState → Allows components to have a state (variables that can change).

export const AppContext = createContext({}); // ✅ Empty object instead of undefined
//createContext → This helps create a global state that can be shared across components.

//AppContextProvider → This wraps other components and provides global state.
export const AppContextProvider = (props) =>{
    console.log("Rendering AppContextProvider:", props.children); 
    
    //useState → This allows us to store dynamic values inside the component.
    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })
    const [isSearched , setIsSearched]= useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin , setShowRecruiterLogin]  = useState(false)

     //userName

    const fetchjobs = async ()=>{
        setJobs(jobsData)
    }
    useEffect(()=>{
        fetchjobs()
        } , [])
    /*useEffect() =>  This allows us to run side effects, like fetching data when the component loads.
      The useEffect hook runs when the component it is inside of mounts (loads for the first time).
      In this case, useEffect is inside the AppContextProvider component.
    */

    const value={
        searchFilter,setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        
        
    }

    return (<AppContext.Provider value = {value}>
        {props.children}
    </AppContext.Provider>)
}


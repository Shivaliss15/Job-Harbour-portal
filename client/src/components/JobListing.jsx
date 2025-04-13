import React, { useContext, useState, useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories ,JobLocations } from '../assets/assets'
import JobCard from './JobCard'

//useContext → Helps share data (like themes, user info) between components without props.

const JobListing = () => {

    const {isSearched , searchFilter ,setSearchFilter,jobs } = useContext(AppContext)

    const [showFilter , setShowFilter] = useState((false))
    const [currentPage , setCurrentPage] = useState((1))
    const [selectedCategories , setSelectedCategories] =useState([])
    const [selectedLocation , setSelectedLocation] =useState([])
    

    const [filteredJobs, setFilteredJobs] = useState(jobs)
    
    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c!== category) : [...prev ,category]
            /* if the selected category is already there then it will be removed 
               ,if not present then it will be added */
        ) 
    }
    const handleCategoryLocation = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(c => c!== location) : [...prev ,location]
            /* if the selected location is already there then it will be removed 
               ,if not present then it will be added */
        ) 
    }


            /*BELOW CODE =>
              Users can filter jobs by category, location, or search keywords.
              The filtered jobs list updates automatically whenever the user changes a filter or searches.
              The page resets to 1 after applying filters to show the latest filtered results. 
              */
    useEffect(()=>{
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
            //Check if a job’s category matches any selected categories.
        const matchesLocation = job => selectedLocation.length ===0 || selectedLocation.includes(job.location)
            // Check if a job’s location matches any selected locations.
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
            //Check if a job’s title contains the search text (if searching by title).
        const matchesJobs = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
            //Check if a job’s location contains the search text (if searching by location).


       /*        Only keep jobs that pass all the above filters.         */
        const  newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesJobs(job) && matchesTitle(job)
        )

        setFilteredJobs(newFilteredJobs) // The filtered list is saved in filteredJobs.
        setCurrentPage(1)  //The current page is reset to 1 after filtering.

    } , [jobs, selectedCategories,selectedLocation,searchFilter])
       //useEffect() =>Runs whenever jobs, selectedCategories, selectedLocation, or searchFilter change.

       
  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
        {/* Sidebar */}
        <div className='w-full lg:w-1/4 bg-white px-4'>
            {/* Search Filter from Hero componenet*/}
            {
                isSearched && ( searchFilter.title != "" || searchFilter.location != "") && (
                    /*isSearched → Checks if the user has searched.
                    searchFilter.title & searchFilter.location → Stores the user's job title and location input. 
                    
                    */
                    <>
                        <h3 className ='font-medium  text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 text-gray-600'>
                            {searchFilter.title && (
                                
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded'>
                                    {/*Purpose of <span> Here:  group text elements inside a block without affecting layout.
                                    Wraps the job title so it can be displayed as a single unit with the delete icon ,i.e doesn’t break into a new line like <div>).
                                    */}
                                    <img  src={assets.search_icon} alt="" />
                                    {searchFilter.title}
                                    <img onClick={ e => setSearchFilter( prev => ({...prev , title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    {/* setSearchFilter(prev => ({...prev , title:""})) 
                                        → Clears the job title filter when the user clicks the X icon.
                                        */}    
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded'>
                                    <img  src={assets.location_icon} alt="" />
                                    {searchFilter.location}
                                    <img onClick={ e => setSearchFilter( prev => ({...prev , location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                {/*If you wrote:
                                    setSearchFilter({ location: "" });
                                    This would remove the title property!
                                    Using { ...prev } ensures other properties remain unchanged. 
                                */}
                                </span>
                            )}
                        </div>
                    </>
                )

            }

            <button  onClick = {e => setShowFilter(prev=> !prev)} className='px-6 py-1.5 rounded border bg-purple-700 text-white border-gray-800 lg:hidden'>
                {showFilter ? "Close" : "Filters"}
            </button>

            {/*Catagory filter */}
            <div className={showFilter? "":'max-lg:hidden'}>     {/*"Hide the element when the screen size is lg (1024px) or smaller." */}
                <h4 className='font-medium text-lg py-4'>Search by categories</h4>
                <ul className='space-y-4 text-gray-600' >
                    {  
                        
                        JobCategories.map((category , index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input 
                                className='scale-125' 
                                type="checkbox" 
                                onChange={() =>handleCategoryChange(category)}
                                checked = {selectedCategories.includes(category)}/>
                                {category}
                            </li>
                        ))
                    }
                    {/* JobCategories.map((category , index) =>{
                        This loops through the JobCategories array.
                        For each category, it creates a <li> (list item).
                        element(here category) → Represents each item in the array.
                        index → The position of the item in the array (optional).
                        */}
                </ul>
            </div>

            {/*Location Filter */}
            <div className={showFilter? "":'max-lg:hidden'}>
                <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                <ul className='space-y-4 text-gray-600' >
                    {  
                        
                        JobLocations.map((location , index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input 
                                className='scale-125' 
                                type="checkbox" 
                                onChange={() =>handleCategoryLocation(location)} 
                                checked = {selectedLocation.includes(location)}/>
                                {location}
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>

        {/* Job listings */}
        <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
            <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
            <p className='mb-8'>Get your desired job from top companies</p>
        
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filteredJobs.slice((currentPage-1)*6 , currentPage*6).map((job,index) =>(
                    <JobCard key={index} job={job} />
                ))}
            </div> 

            {/*Pagination */}
            {filteredJobs.length > 0 && (
                <div className='flex justify-center items-center space-x-2 mt-10'>
                    <a href="#job-list" >
                      <img onClick={() => setCurrentPage(Math.max(currentPage-1,1))} src={assets.left_arrow_icon} alt="arrow-icon" />
                    </a>
                    {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                      <a  key={index}  href="#job-list">
                        <button
                        onClick={() => setCurrentPage(index + 1)}
                        className={` w-10 h-10 items-center justify-center border border-gray-300 rounded  ${currentPage === index+1 ? 'bg-blue-100 text-blue-500' :'text-gray-500'}`}
                        >
                            {index + 1}
                        </button>
                      </a>
                    ))}
                    <a href="#job-list" >
                      <img  onClick={() => setCurrentPage(Math.min(currentPage+1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="arrow-icon" />
                    </a>
                </div>
            )
            } 
        </section>



    </div>
  )
}

export default JobListing
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { assets ,jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';

const Applications = () => {
  
  const [isEdit , setIsEdit] = useState(false);
  const [resume , setResume] =useState(null)

  return (
    <>
       <Navbar />
       <div className='container px-4 min-h-[65vh]  2xl:px-20 mx-auto my-10 ' >
        <h2 className='text-xl font-semibold' >Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3' >
          {
            isEdit 
            ? <>
                <label className='flex items-center' htmlFor="resumeUpload">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2' >Select Resume</p>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt="profile_upload_icon" />
                </label>
                <button onClick={e =>setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2' >Save</button>
            </>
            : <div className='flex gap-2 '>
              <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                Resume
              </a>
              <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2' >
                Edit
              </button>
            </div>
          }
          {/*The label makes the file input clickable. The hidden input captures the file selection.
              The image (upload icon) makes the UI more interactive.When a user selects a PDF file, setResume stores it. */}
        </div>
        <h2 className='text-xl font-semibold mb-4' >Job Applied</h2>
        <table className='min-w-full  border border-gray-300 rounded-lg' >
          <thead>
            <tr >
              <th  className='py-3 px-4 bg-gradient-to-r from-purple-300 to-purple-600 border-b border-gray-300  text-left' >Company</th>
              <th  className='py-3 px-4 bg-gradient-to-r from-purple-300 to-purple-600 border-b border-gray-300 text-left' >Job Title</th>
              <th  className='py-3 px-4 bg-gradient-to-r from-purple-300 to-purple-600 border-b border-gray-300 text-left max-sm:hidden' >Location</th>
              <th  className='py-3 px-4 bg-gradient-to-r from-purple-300 to-purple-600 border-b border-gray-300 text-left max-sm:hidden' >Date</th>
              <th  className='py-3 px-4 bg-gradient-to-r from-purple-300 to-purple-600 border-b border-gray-300 text-left' >Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job,index) => true ? (
               <tr>
                <td className='py-3 px-4 flex items gap-2 bg-purple-50   border  border-gray-300' >
                  <img className='w-10 h-8' src={job.logo} alt="joblogo" />
                  {job.company}
                </td>
                <td className='py-2 px-4 bg-purple-50  border  border-gray-300 '  > {job.title}</td>
                <td className='py-2 px-4 bg-purple-50  border  border-gray-300  max-sm:hidden' >{job.location}</td>
                <td className='py-2 px-4 bg-purple-50  border  border-gray-300  max-sm:hidden' >{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 bg-purple-50  border  border-gray-300 ' >
                  <span className={`${job.status === 'Accepted' ? 'bg-green-200' : job.status === 'Rejected' ? 'bg-red-200' : 'bg-blue-200' } px-4 py-1.5 rounded` } >
                    {job.status}</span>
                  </td>
               </tr>
            ) : (null) )}
          </tbody>
        </table>
       </div>
       <Footer/>
    </>
  )
}

export default Applications;
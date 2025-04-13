import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm  '>
          <thead>
            <tr >
              <th className='py-2 px-4 text-left bg-gradient-to-r from-purple-300 to-purple-600 '>#</th>
              <th className='py-2 px-4 text-left bg-gradient-to-r from-purple-300 to-purple-600 '>User Name</th>
              <th className='py-2 px-4 text-left max-sm:hidden  bg-gradient-to-r from-purple-300 to-purple-600  '>Job Title</th>
              <th className='py-2 px-4 text-left  max-sm:hidden bg-gradient-to-r from-purple-300 to-purple-600  '>Location</th>
              <th className='py-2 px-4 text-left  bg-gradient-to-r from-purple-300 to-purple-600  '>Resume</th>
              <th className='py-2 px-4 text-left bg-gradient-to-r from-purple-300 to-purple-600  '>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant ,index) => (
              <tr key={index} className='text-gray-700 bg-purple-50 ' >
                <td className='py-2 px-4 border border-gray-300  text-center'>{index+1}</td>
                <td className='py-2 px-4 border border-gray-200 text-center flex '>
                  <img className='w-20 h-20 rounded-full mr-3 max-md:hidden' src={applicant.imgSrc} alt="imgSrc" />
                  <span className='my-7'>{applicant.name}</span>
                </td>
                <td className='py-2 px-4 border border-gray-300 max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-2 px-4 border border-gray-300 max-sm:hidden'>{applicant.location}</td>
                <td className='py-2 px-4 border border-gray-300'>
                  <a href="" target='black'
                  className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'>
                    Resume <img src={assets.resume_download_icon} alt="resume_download_icon" />

                  </a>
                </td>
                <td className='py-2 px-4 border border-gray-300 relative'>
                  <div className='relative inline-block text-left group'> {/*The group class is like giving a name tag to a parent element so that its children can react when the parent is hovered or focused. */}
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'> {/*When the parent is hovered, group-hover:block activates, and the child becomes visible. */}
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
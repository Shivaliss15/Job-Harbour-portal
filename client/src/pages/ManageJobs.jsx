import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {

  const navigate = useNavigate()
  return (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead >
            <tr>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-left' >Job Title</th>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-left max-sm:hidden' >Date</th>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-left max-sm:hidden' >Location</th>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-center' >Applicants</th>
              <th className='py-2 px-4   bg-gradient-to-r from-purple-300 to-purple-600 text-left' >Visible</th>
            </tr>
          </thead>
          <tbody>
             {manageJobsData.map((job ,index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border border-gray-300  max-sm:hidden'>{index+1}</td>
                <td className='py-2 px-4 border border-gray-300 '>{job.title}</td>
                <td className='py-2 px-4 border border-gray-300  max-sm:hidden'>{moment(job.date).format('ll')}</td> {/*ll stands for “localized long date”  */}
                <td className='py-2 px-4 border border-gray-300  max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border border-gray-300   text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border border-gray-300 '>
                  <input type="checkbox" className='scale-125 ml-4' />
                </td>
              </tr>
             ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4  flex justify-end ' >
        <button onClick ={() => navigate('/dashboard/add-job')} className='bg-black text-white h-10 px-4 py-2 rounded'>Add new Job</button>
      </div>
    </div>
  )
}

export default ManageJobs
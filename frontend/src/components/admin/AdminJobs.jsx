import { Button } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice.'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch])
    return (
        <div>
            <Navbar />
            <div className=" max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='w-fit border border-gray-200'
                        placeholder='Filter by name , role'
                    />
                    <Button onClick={() => navigate('/admin/jobs/create')}> New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs
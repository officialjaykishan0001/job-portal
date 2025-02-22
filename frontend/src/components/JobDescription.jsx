import { Badge, Button } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice.'
import { toast } from 'react-hot-toast'

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
 
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true});
            console.log(res.data)
            if (res.data.success) {
                setIsApplied(true); // update the local state
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]}
                dispatch(setSingleJob(updateSingleJob)); // help in real time ui updation
                toast.success(res.data.message);    
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state in syn with fresh data
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge color="blue" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.position} Positions</Badge>
                        <Badge color="red" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
                        <Badge color="purple" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null :  applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'cursor-not-allowed' : 'cursor-pointer'}`} color="gray" variant='solid' highContrast >{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
            <div className="my-4">
                <h1 className='font-bold my-1 '>Role: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 '>Location: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 '>Description: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 '>Experience: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1 '>Salary: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1 '>Total Applicants: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.applications.length}</span></h1>
                <h1 className='font-bold my-1 '>Posted Date: <span className='pl-4 text-gray-800 font-normal'>{singleJob?.createdAt.split('T')[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription

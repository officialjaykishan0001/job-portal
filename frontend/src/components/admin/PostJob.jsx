import {  Select } from '@radix-ui/themes';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '../../utils/constant';
import Navbar from '../shared/Navbar'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false)
    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() == value);
        setInput({ ...input, companyId: selectedCompany._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs')
            }
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5 ">
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>

                    <div className="grid grid-cols-2 gap-2">
                        <div className='flex flex-col'>
                            <label htmlFor="">Title</label>
                            <input
                                type="text"
                                name='title'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Description</label>
                            <input
                                type="text"
                                name='description'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Requirements</label>
                            <input
                                type="text"
                                name='requirements'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Salary</label>
                            <input
                                type="text"
                                name='salary'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Location</label>
                            <input
                                type="text"
                                name='location'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Job Type</label>
                            <input
                                type="text"
                                name='jobType'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Experience Level</label>
                            <input
                                type="text"
                                name='experience'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">No of Positions</label>
                            <input
                                type="number"
                                name='position'
                                className='border border-bg-gray-200 focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select.Root onValueChange={selectChangeHandler}>
                                    <Select.Trigger placeholder="Select a Company" />
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Label>Companies</Select.Label>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <Select.Item value={company?.name?.toLowerCase()} key={company?._id} >{company?.name}</Select.Item>
                                                    )
                                                })
                                            }
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>


                            )
                        }
                    </div>
                    {
                        loading ? <button className='flex  justify-center items-center w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium '> <Loader2 className='m-2 h-4 w-4 animate-spin' /> <span>Please wait!</span> </button> : <button type='submit' className='w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium'>Post New Job</button>
                    }
                    {
                        companies.length == 0 && <p className='text-xs text-red-600 text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob

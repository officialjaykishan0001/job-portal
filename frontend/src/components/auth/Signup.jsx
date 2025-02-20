import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth)
    const dispath = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispath(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message);
        } finally {
            dispath(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 '>Sign Up</h1>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 font-bold">Username</label>
                        <input
                            type="text"
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                            placeholder="Enter your username"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-bold">Phone Number</label>
                        <input
                            type="number"
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            placeholder="808046810"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-600 font-bold">Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder="eg: kI@323kjsf"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className='flex items-center space-x-2 font-bold' name="example" color="gray" highContrast>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className='cursor-pointer'
                            />
                            <label htmlFor="">Student</label>
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className='cursor-pointer'
                            />
                            <label htmlFor="">Recruiter</label>
                        </div>
                        <div className="flex items-center gap-2 font-bold">
                            <label htmlFor="">Profile</label>
                            <input
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='cursore-pointer'
                            />
                        </div>
                    </div>
                    {
                        loading ? <button className='flex  justify-center items-center w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium '> <Loader2 className='m-2 h-4 w-4 animate-spin' /> <span>Please wait!</span> </button> : <button type='submit' className='w-full my-4 border border-black p-1 bg-black text-white rounded-md font-medium'>Signup</button>
                    }

                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup

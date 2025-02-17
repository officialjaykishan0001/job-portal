import React, { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false)
        }
        setOpen(false);
        console.log(input)
    }
    return (
        <div>
            <Dialog.Root open={open}>
                <Dialog.Content maxWidth="450px" className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)} >
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to your profile.
                    </Dialog.Description>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className='text-right'>Name</label>
                                <input onChange={changeEventHandler} type="text" id="name" name='name' value={input.fullname} className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="email" className='text-right'>Email</label>
                                <input onChange={changeEventHandler} type="email" id="email" name='email' value={input.email} className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="number" className='text-right'>Number</label>
                                <input onChange={changeEventHandler} type="number" id="number" name='number' value={input.phoneNumber} className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="bio" className='text-right'>Bio</label>
                                <input onChange={changeEventHandler} type="text" id="bio" name='bio' value={input.bio} className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="skills" className='text-right'>Skills</label>
                                <input onChange={changeEventHandler} type="text" id="skills" name='skills' value={input.skills} className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="file" className='text-right'>Resume</label>
                                <input onChange={fileChangeHandler} type="file" id="file" name='file' accept='application/pdf' className='col-span-3 border border-gray-200 rounded-md' />
                            </div>
                        </div>
                        {
                            loading ? <button className='flex  justify-center items-center w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium '> <Loader2 className='m-2 h-4 w-4 animate-spin' /> <span>Please wait!</span> </button> : <button type='submit' className='w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium'>Update</button>
                        }
                    </form>

                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}

export default UpdateProfileDialog
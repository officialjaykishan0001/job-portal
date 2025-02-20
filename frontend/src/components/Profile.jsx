import { Avatar, Badge } from '@radix-ui/themes'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import AppliedJobTable from './AppliedJobTable'
import Navbar from './shared/Navbar'
import UpdateProfileDialog from './UpdateProfileDialog'

// const skills = ["html", "css", "Javascripts", "Reactjs"]
const isResume = true
const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between ">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className='cursor-pointer'
                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                            fallback="A"
                            radius='full'
                            size='4'
                        />
                        <div className="">
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></button>
                </div>
                <div className='my-5'>
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="">{item}</Badge>) : <span>Not Applicable</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 '>
                    <label className='text-medium font-bold'>Resume</label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOrignalName}</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl ">
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
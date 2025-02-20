import { Avatar, Badge } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "jfkjsdlj"

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const TimeDifference = currentTime - createdAt;

        return Math.floor(TimeDifference / (1000 * 24 * 60 * 60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago `}</p>
                <button variant='outline' className='rounded-full ' size='icon'><Bookmark /></button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Avatar
                    className='cursor-pointer'
                    src={job?.company?.logo}
                    fallback="A"
                    size="1"
                />
                <div className="">
                    <h1 className='font-medium text-lg'>{job?.company.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge color="blue" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge color="red" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.jobType}</Badge>
                <Badge color="purple" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job._id}`)} color="gray" variant="outline" highContrast> Details</Button>
                <Button style={{ backgroundColor: "#7209b7", color: "white" }}>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job
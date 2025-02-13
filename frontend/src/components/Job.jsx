import { Avatar, AvatarImage, Badge } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId = "jfkjsdlj"
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <button variant='outline' className='rounded-full ' size='icon'><Bookmark /></button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Avatar
                    className='cursor-pointer'
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    fallback="A"
                    size="1"
                />
                <div className="">
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 '>Title</h1>
                <p className='text-sm text-gray-600'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis unde omnis corrupti porro nostrum quam! Iure cupiditate aspernatur nisi consequatur.</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge color="blue" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>12 Positions</Badge>
                <Badge color="red" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>Part Time</Badge>
                <Badge color="purple" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>12 LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
            <Button onClick={() => navigate(`/description/${jobId}`)} color="gray" variant="outline" highContrast> Details</Button>
                <Button style={{ backgroundColor: "#7209b7", color: "white" }}>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job
import { Badge, Button } from '@radix-ui/themes'
import React from 'react'

const JobDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl '>Frontend Developer</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge color="blue" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>12 Positions</Badge>
                        <Badge color="red" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>Part Time</Badge>
                        <Badge color="purple" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>12 LPA</Badge>
                    </div>
                </div>
                <Button  disabled={isApplied} className={`rounded-lg ${isApplied ? 'cursor-not-allowed' : 'cursor-pointer'}`}  color="gray" variant='solid' highContrast >{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className="my-4">
                <h1 className='font-bold my-1 '>Role: <span className='pl-4 text-gray-800 font-normal'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1 '>Location: <span className='pl-4 text-gray-800 font-normal'>Hyederabad</span></h1>
                <h1 className='font-bold my-1 '>Description: <span className='pl-4 text-gray-800 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
                <h1 className='font-bold my-1 '>Experience: <span className='pl-4 text-gray-800 font-normal'>2 yrs</span></h1>
                <h1 className='font-bold my-1 '>Total Applicants: <span className='pl-4 text-gray-800 font-normal'>4</span></h1>
                <h1 className='font-bold my-1 '>Posted Date: <span className='pl-4 text-gray-800 font-normal'>17-07-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription

import { Badge } from '@radix-ui/themes'
import React from 'react'

const LatestJobCards = ({job}) => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 '>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 '>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge color="blue" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge color="red" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.jobType}</Badge>
                <Badge color="purple" radius='full' className={'text-blue-700 font-bold'} variant='ghost'>{job?.salary}</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards

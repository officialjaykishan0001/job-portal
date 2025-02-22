import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@radix-ui/themes'
import { setSearchedQuery } from '../redux/jobSlice.';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2] '>Dream Jobs</span></h1>
                <p>Your gateway to the best job opportunities. Find your dream job today! Start with completing your Profile</p>
                <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full '
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6838C2]'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection
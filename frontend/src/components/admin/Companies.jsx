import { Button } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '../../redux/companySlice'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'

const Companies = () => {
    const [input, setInput] = useState('');
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input])
    return (
        <div>
            <Navbar />
            <div className=" max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='w-fit border border-gray-200'
                        placeholder='Filter by name'
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}> New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
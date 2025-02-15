import { Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try{    
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}` );
                
            }

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>what would you like to give your company name? You can change this later..</p>

                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Company Name</label>
                    <input
                        type="text"
                        onChange={(e) => setCompanyName(e.target.value)}
                        className='my-2 border border-gray-200'
                        placeholder='JobHunt, Microsoft, etc'
                    />
                </div>
                <div className="flex items-center gap-2 my-10">
                    <Button onClick={() => navigate('/admin/companies')} variant='outline'>Cancel</Button>
                    <Button onClick={registerNewCompany} >Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate

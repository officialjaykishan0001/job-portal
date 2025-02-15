import { Button, } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const {singleCompany} = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website ||  "",
            location: singleCompany.location ||  "",
            file: singleCompany.file ||  null
        })
    }, [singleCompany])
    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto m-10">
                <div className="flex items-center gap-5 p-8">
                    <Button onClick={() => navigate('/admin/companies')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="">
                            <label htmlFor="">Company</label>
                            <input
                                className='border border-gray-200'
                                type="text"
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Description</label>
                            <input
                                className='border border-gray-200'
                                type="text"
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Website</label>
                            <input
                                className='border border-gray-200'
                                type="text"
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Location</label>
                            <input
                                className='border border-gray-200'
                                type="text"
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Logo</label>
                            <input
                                className='border border-gray-200'
                                type="file"
                                name='logo'
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <button className='flex  justify-center items-center w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium '> <Loader2 className='m-2 h-4 w-4 animate-spin' /> <span>Please wait!</span> </button> : <button type='submit' className='w-full my-4 border border-black p-1 b bg-black text-white rounded-md font-medium'>Update</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
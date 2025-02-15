import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '../hooks/useGetAllJobs'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJob from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const Home = () => {
    useGetAllJobs();
    const {user}  = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role === 'recruiter'){
            navigate('/admin/companies');
        }
    }, [])
    
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJob />
            <Footer />
        </div>

    )
}

export default Home

import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJob from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

const Home = () => {
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

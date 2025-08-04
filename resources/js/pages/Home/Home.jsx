import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Hero from '../../components/home/hero';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Footer />
        </>
    );
};

export default Home;
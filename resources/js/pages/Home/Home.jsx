import FaQ from '../../components/home/FaQ';
import Features from '../../components/home/features';
import Hero from '../../components/home/hero';
import Testimonials from '../../components/home/testimonials';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[linear-gradient(135deg,#EAF4FF,#F5F6FA)]">
                <Hero />
                <Features />
                <Testimonials />
                <FaQ />
            </div>
            <Footer />
        </>
    );
};

export default Home;

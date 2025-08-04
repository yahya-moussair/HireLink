import Features from '../../components/home/features';
import Hero from '../../components/home/hero';
import Testimonials from '../../components/home/testimonials';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Testimonials />
            <Footer />
        </>
    );
};

export default Home;

import Features from '../../components/home/features';
import Hero from '../../components/home/hero';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </>
    );
};

export default Home;

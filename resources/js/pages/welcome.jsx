import Hero from '../components/welcome/Hero';
import Navbar from '../components/welcome/Navbar';
import SecondSection from '../components/welcome/SecondSection';

const Welcome = () => {
    return (
        <>
            <div>
                <div className=" w-full rounded-b-2xl bg-gradient-to-b from-[#02003e] to-[#450b97]">
                    <Navbar />
                    <Hero />
                </div>
                <SecondSection />
            </div>
        </>
    );
};

export default Welcome;

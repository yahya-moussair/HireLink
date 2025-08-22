import images from '@/constant/images';
import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <>
            <div className='flex w-full flex-col items-center gap-y-30 pt-40 relative h-screen'>
                <div className="flex w-full flex-col items-center gap-y-8 text-white">
                    <h1 className="w-[60%] text-center text-6xl leading-snug font-semibold capitalize">Connect With the Right Talent, On Time</h1>
                    <p className="w-[30%] text-center opacity-60">Empowering recruiters and job seekers with a smarter hiring platform.</p>
                    <div className="flex gap-x-10">
                        <Link href={route('register')}>
                            <button className="animation cursor-pointer rounded-full bg-[#ac8ffd] px-15 py-4 text-xl font-semibold text-white hover:bg-[#9974ff89]">
                                Get Started
                            </button>
                        </Link>
                        <Link href={route('register')}>
                            <button className="animation cursor-pointer rounded-full border-2 border-white/50 bg-transparent px-15 py-4 text-xl font-semibold text-white hover:border-[#ac8ffd] hover:bg-[#ac8ffd]">
                                Post a Job
                            </button>
                        </Link>
                    </div>
                </div>
                <img src={images.hero} className="w-[80%] rounded-lg absolute top-[75%]" alt="" />
            </div>
        </>
    );
};

export default Hero;

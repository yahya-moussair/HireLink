import { Link } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import { Images } from '../../constant';

const Hero = () => {
    return (
        <>
            <div className="flex w-full flex-col-reverse items-center gap-10 px-2 pt-10 md:flex-row md:px-25 md:pt-40 lg:flex-row lg:px-30 lg:pt-50">
                <div className="flex w-full flex-col gap-8 md:w-1/2 lg:w-1/2">
                    <h1 className="text-center lg:text-4xl text-3xl  font-extrabold text-[#00193f] md:text-start lg:text-start">
                        Connect With Opportunity, Faster.
                    </h1>
                    <h3 className="text-center text-xl font-bold text-[#00193f] md:text-start lg:text-start">
                        Discover your next job, build your career, and connect with professionals — all in one place.
                    </h3>
                    <ul class="space-y-5 ps-5 text-base text-gray-600 md:ps-10 lg:ps-10">
                        <li className="flex items-center gap-4">
                            <CircleCheck /> Search and apply to thousands of verified job offers
                        </li>
                        <li className="flex items-center gap-4">
                            <CircleCheck /> Create a professional profile with resume and skills
                        </li>
                        <li className="flex items-center gap-4">
                            <CircleCheck /> Connect with recruiters and hiring managers directly
                        </li>
                        <li className="flex items-center gap-4">
                            <CircleCheck /> Track your applications and interview status in real time
                        </li>
                        <li className="flex items-center gap-4">
                            <CircleCheck /> Free to use for job seekers — forever
                        </li>
                    </ul>
                    <Link href={route('register')}>
                        <button className="ms-10 w-full cursor-pointer rounded-lg bg-[#202b61] px-10 py-4 text-lg text-white transition-all duration-300 hover:bg-[#2980d1] md:w-fit lg:w-fit">
                            Register Now
                        </button>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2">
                    <img src={Images.hero} alt="" className="w-full" />
                </div>
            </div>
        </>
    );
};

export default Hero;

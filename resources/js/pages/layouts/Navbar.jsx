import { Link } from '@inertiajs/react';
import { Images } from '../../constant';

const Navbar = () => {
    return (
        <>
            <nav className="z-40 w-full border-gray-200 bg-[linear-gradient(135deg,#EAF4FF,#F5F6FA)] md:fixed md:shadow-lg lg:fixed lg:shadow-lg">
                <div className="w-full items-center px-2 py-4 md:flex md:justify-between md:px-15 lg:flex lg:justify-between lg:px-20">
                    <div>
                        <Link href={route('home')} className="flex justify-center lg:block">
                            <img src={Images.logo} className="w-[50%] transition-all duration-300 hover:scale-110 lg:w-[20%]" alt="HireLink Logo" />
                        </Link>
                    </div>
                    <div className="hidden items-center gap-5 md:flex lg:flex">
                        <Link href={route('login')}>
                            <button className="cursor-pointer rounded-lg bg-[#202b61] px-5 py-1.5 text-white transition-all duration-300 hover:bg-[#2980d1] lg:py-1.5">
                                Login
                            </button>
                        </Link>
                        <Link href={route('register')}>
                            <button className="cursor-pointer rounded-lg bg-[#202b61] px-5 py-1.5 text-white transition-all duration-300 hover:bg-[#2980d1] lg:py-1.5">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

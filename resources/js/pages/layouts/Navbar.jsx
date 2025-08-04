import { Link } from '@inertiajs/react';
import { Images } from '../../constant';

const Navbar = () => {
    return (
        <>
            <nav class="border-gray-200 bg-white lg:shadow-lg md:shadow-lg lg:fixed md:fixed w-full z-40">
                <div class="lg:flex md:flex  w-full items-center lg:justify-between md:justify-between lg:px-20 md:px-15 px-2 py-4">
                    <div>
                        <Link href={route('home')} className='lg:block flex justify-center'>
                            <img src={Images.logo} class="lg:w-[20%] w-[50%]  transition-all duration-300 hover:scale-110" alt="HireLink Logo" />
                        </Link>
                    </div>
                    <div class="lg:flex md:flex items-center gap-5  hidden">
                        <Link href={route('login')}>
                            <button className="cursor-pointer rounded-lg bg-[#202b61] px-5 lg:py-1.5 py-1.5 text-white transition-all duration-300 hover:bg-[#2980d1]">
                                Login
                            </button>
                        </Link>
                        <Link href={route('register')}>
                            <button className="cursor-pointer rounded-lg bg-[#202b61] px-5 lg:py-1.5 py-1.5  text-white transition-all duration-300 hover:bg-[#2980d1]">
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

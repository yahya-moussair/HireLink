import { Link } from '@inertiajs/react';
import images from '../../constant/images';

const Navbar = () => {
    return (
        <>
            <div className="fixed flex w-full items-center justify-between px-20 py-8">
                <div>
                    <Link to="">
                        <img src={images.logo} className="animation w-45 hover:scale-110" alt="" />
                    </Link>
                </div>
                <nav className="flex items-center gap-x-15 text-lg text-white">
                    <Link to="" className="group flex flex-col">
                        Home
                        <span className="animation h-[2px] w-0 rounded-lg bg-white group-hover:w-full"></span>
                    </Link>
                    <Link to="" className="group flex flex-col">
                        About
                        <span className="animation h-[2px] w-0 rounded-lg bg-white group-hover:w-full"></span>
                    </Link>
                    <Link to="" className="group flex flex-col">
                        Pricing
                        <span className="animation h-[2px] w-0 rounded-lg bg-white group-hover:w-full"></span>
                    </Link>
                    <Link to="" className="group flex flex-col">
                        Contact
                        <span className="animation h-[2px] w-0 rounded-lg bg-white group-hover:w-full"></span>
                    </Link>
                </nav>
                <div className="flex items-center gap-x-5">
                    <Link href={route('login')}>
                        <button className="button-style">Login</button>
                    </Link>
                    <Link href={route('register')}>
                        <button className="button-style">Register</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;

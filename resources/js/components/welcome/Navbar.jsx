import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import images from '../../constant/images';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (open == true) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };
    return (
        <>
            <div className="fixed z-50 flex w-full items-center justify-between bg-[#080147] px-20 py-5">
                <div>
                    <Link to="">
                        <img src={images.logo} className="animation w-45 hover:scale-110" alt="" />
                    </Link>
                </div>
                <nav
                    className={`fixed ${open ? 'top-[0%]' : 'top-[-200%]'} flex flex-col items-center gap-x-15 bg-white text-white md:relative md:top-0 md:flex-row md:bg-transparent lg:relative lg:top-0 lg:flex-row lg:bg-transparent`}
                >
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
                <Menu className="block md:hidden lg:hidden" />
            </div>
        </>
    );
};

export default Navbar;

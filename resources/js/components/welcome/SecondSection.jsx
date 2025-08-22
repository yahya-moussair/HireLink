import { Link } from '@inertiajs/react';
import cards from './cards';
const SecondSection = () => {
    return (
        <>
            <div className="flex flex-col gap-15 px-15 pt-[32rem] text-[#080147]">
                <div className="flex items-center justify-between">
                    <h1 className="w-1/2 text-5xl leading-15">The Smartest Way to Hire Top Talent</h1>
                    <Link href={route('register')}>
                        <button className="animation cursor-pointer rounded-full  bg-[#080147] px-15 py-4 text-xl font-semibold text-white hover:bg-[#ac8ffd]">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-x-5">
                    {cards?.map((e, index) => {
                        const Icon = e.icon;
                        return (
                            <div key={index} className="flex flex-col gap-15 animation cursor-pointer rounded-lg px-5 py-10 shadow-lg hover:bg-[#ac8ffd] hover:text-white">
                                <Icon size={50} />
                                <h2 className="text-2xl">{e.title}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SecondSection;

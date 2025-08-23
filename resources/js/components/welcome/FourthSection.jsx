import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { carousel } from './welcome';

const FourthSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handelNext = () => {
        setCurrentIndex((prev) => (prev === carousel.length - 1 ? 0 : prev + 1));
    };
    const handelPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? carousel.length - 1 : prev - 1));
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-y-20 px-5 pt-30 text-[#080147]">
                <div className="flex flex-col items-center gap-y-5">
                    <h1 className="text-5xl">Unlock Smarter Hiring</h1>
                    <p className="text-xl">Find top talent with next-gen recruitment tools</p>
                </div>
                <div className="relative flex h-[70vh] w-full flex-col items-center gap-y-5 overflow-x-hidden">
                    <div
                        className="gap-x-10 flex h-full w-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${(currentIndex * (100 - 21))}%)` }}
                        >
                        {carousel.map((item, index) => (
                            <div key={index} className="mx-auto flex h-full w-[80%] flex-shrink-0">
                                <img src={item.image} alt="" className="object-fit w-1/2 rounded-l-lg" />
                                <div className="flex h-full w-1/2 flex-col justify-between rounded-r-lg bg-gradient-to-r from-[#240c4b] to-[#1b0b37] p-10 text-white">
                                    <div className="flex flex-col gap-5">
                                        <h1 className="text-4xl">{item.number}</h1>
                                        <p className="text-xl">{item.text}</p>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <h1 className="text-2xl font-semibold">{item.author}</h1>
                                        <p className="ps-2">{item.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-x-5">
                        <ChevronLeft onClick={handelPrev} color="black" size={50} className="cursor-pointer rounded-full border-2 bg-white" />
                        <ChevronRight onClick={handelNext} color="black" size={50} className="cursor-pointer rounded-full border-2 bg-white" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FourthSection;

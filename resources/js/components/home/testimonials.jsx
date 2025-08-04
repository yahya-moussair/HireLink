import { Star } from 'lucide-react';
import testimonials from '../../../json/testimonials';

const Testimonials = () => {
    return (
        <>
            <div className="w-full px-5 pt-30 md:px-25 lg:px-30">
                <div className="flex flex-col gap-10">
                    <h1 className="text-center text-5xl font-extrabold text-[#00193f]">Testimonials</h1>
                    <div className="grid grid-cols-1 gap-5 px-2 py-5 md:grid-cols-3 lg:grid-cols-4">
                        {testimonials?.map((element, index) => (
                            <div key={index} className="lg:hover:scale-102 transition-all duration-300 flex flex-col items-center gap-y-5 rounded-lg p-5 shadow-lg">
                                <div className="flex flex-col items-center gap-3">
                                    <img src={element.image} className="h-[5rem] w-[5rem] rounded-full object-cover" alt="" />
                                    <p className="font-bold">{element.name}</p>
                                </div>
                                <p className="text-sm">
                                    {element.company} - {element.role}
                                </p>
                                <div className="flex space-x-1">
                                    {[...Array(element.rate)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-500" />
                                    ))}
                                </div>

                                <p className="text-center text-lg">" {element.quote} "</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonials;

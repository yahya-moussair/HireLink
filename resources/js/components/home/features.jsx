import features from '../../../json/features';

const Features = () => {
    return (
        <>
            <div className="w-full px-5 pt-25 md:px-25 lg:px-30">
                <div className="flex flex-col gap-10">
                    <h1 className="text-center text-5xl font-extrabold text-[#00193f]">Features</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features?.map(({ image, title, icon: Icon, description }, index) => (
                            <div key={index} className="lg:h-[25rem] md:h-[25rem] h-[27rem] rounded-lg shadow-lg lg:hover:scale-105 transition-all duration-300">
                                <img src={image} className="h-[14rem] w-full rounded-t-lg" alt="" />
                                <div className="flex flex-col gap-5 px-5 pt-8">
                                    <div className='flex gap-4'>
                                        <Icon className="feature-icon text-[#00193f]" />
                                        <h1 className="text-xl font-bold text-[#00193f]">{title}</h1>
                                    </div>
                                    <div>
                                        <h3 className='text-sm text-[#00193f]'>{description}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;

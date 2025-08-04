const Footer = () => {
    return (
        // <footer className="bg-[#00193e] py-10 text-white">
            <div className="bg-[#00193e] container mx-auto px-5 md:px-10">
                <div className="mt-10 border-t border-gray-600 py-5 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} HireLink. All rights reserved.
                </div>
            </div>
        // </footer>
    );
};

export default Footer;

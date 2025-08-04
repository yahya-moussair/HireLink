const FaQ = () => {
    return (
        <section className="min-h-screen py-32 text-[#00193f]">
            <div className="container mx-auto flex flex-col justify-center p-4 md:p-8">
                <h2 className="mb-12 text-center text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h2>
                <div className="flex flex-col divide-y divide-gray-300 sm:px-8 lg:px-12 xl:px-32">
                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">How does HireLink match me with jobs?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                Our AI-powered algorithm analyzes your skills, experience, and preferences to connect you with the most relevant job
                                opportunities. Just complete your profile and let HireLink do the work.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">
                            Is it free to create a profile and apply for jobs?
                        </summary>
                        <div className="px-4 pb-4">
                            <p>
                                Yes! Creating a profile and applying for jobs on HireLink is completely free for job seekers. Companies may pay to
                                post jobs, but job applications are free.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">Can I communicate directly with employers?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                Absolutely. HireLink includes a built-in messaging system that allows you to chat directly with recruiters and hiring
                                managers in real-time.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">How do I build a professional profile?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                Our intuitive profile builder helps you showcase your skills, experience, and achievements. You can also upload your
                                resume, add a portfolio, and set career goals.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">Are all job postings verified?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                Yes. We manually verify every company and job post to ensure authenticity. You’ll only see trusted, real opportunities
                                from verified employers.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">Do you offer mobile access?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                Definitely! HireLink is fully responsive and works smoothly across all devices — desktop, tablet, and mobile — so you
                                can job hunt on the go.
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary className="cursor-pointer py-2 outline-none focus:underline">How can I contact support?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                You can reach us at{' '}
                                <a href="mailto:support@hirelink.com" className="underline">
                                    support@hirelink.com
                                </a>{' '}
                                for help. We’re here Monday to Saturday, 10 AM to 6 PM.
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default FaQ;

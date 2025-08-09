import { router } from "@inertiajs/react";

const RecruiterDashboard = () => {
    const handleLogOut = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };
    return (
        <div>
            <h1>Hello recruiter</h1>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};

export default RecruiterDashboard;

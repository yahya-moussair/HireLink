import { router } from "@inertiajs/react";

const UserDashboard = () => {
    const handleLogOut = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };
    return (
        <div>
            <h1>Hello user</h1>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};

export default UserDashboard;

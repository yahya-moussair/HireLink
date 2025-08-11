import { router } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Palette, Bell, Shield, Mail } from "lucide-react";

const UserSettingsIndex = ({ user }) => {
    const handleNavigation = (route) => {
        router.get(route);
    };

    const settingsSections = [
        {
            title: "Profile Settings",
            description: "Update your personal information and profile details",
            icon: User,
            route: route('profile.edit'),
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Password & Security",
            description: "Change your password and manage security settings",
            icon: Lock,
            route: route('password.edit'),
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Appearance",
            description: "Customize your interface appearance and theme",
            icon: Palette,
            route: route('appearance'),
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EAF4FF,#F5F6FA)]">
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => handleNavigation(route('user.dashboard'))}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                ← Back to Dashboard
                            </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-[#00193f]">Settings</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#00193f] mb-2">Account Settings</h2>
                    <p className="text-[#202b61]">Manage your account preferences and security settings</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {settingsSections.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                            <Card 
                                key={index} 
                                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => handleNavigation(section.route)}
                            >
                                <CardHeader className="pb-4">
                                    <div className={`inline-flex p-3 rounded-lg ${section.bgColor} mb-4`}>
                                        <IconComponent className={`h-6 w-6 ${section.color}`} />
                                    </div>
                                    <CardTitle className="text-lg text-[#00193f] group-hover:text-[#2980d1] transition-colors">
                                        {section.title}
                                    </CardTitle>
                                    <CardDescription className="text-[#202b61]">
                                        {section.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white transition-all duration-300"
                                    >
                                        Manage
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default UserSettingsIndex;

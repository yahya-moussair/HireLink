import { Bolt, Brain , File, MessagesSquare, ShieldCheck, TabletSmartphone } from "lucide-react";
import { Images } from "../js/constant";

const features = [
    {
        image: Images.findJob,
        title: 'Smart Job Matching',
        icon: Brain,
        description:
            'Let the right jobs find you. Our AI-powered algorithm connects your profile with the most relevant job opportunities — no more endless scrolling.',
    },
    {
        image: Images.apply,
        title: 'One-Click Applications',
        icon: Bolt,
        description: 'Apply in seconds, not hours. Upload your CV once and apply to any job instantly with just one click.',
    },
    {
        image: Images.security,
        title: 'Verified Companies',
        icon: ShieldCheck,
        description: 'Opportunities you can trust. All employers are manually verified to ensure you only see real and reliable job offers.',
    },
    {
        image: Images.messaging,
        title: 'Built-in Messaging System',
        icon: MessagesSquare,
        description: 'Talk directly to recruiters. Communicate instantly and professionally with hiring managers using our secure in-app messaging.',
    },
    {
        image: Images.creer,
        title: 'Career Profile Builder',
        icon: File,
        description:
            'Stand out from the crowd. Build a powerful profile that showcases your skills, experience, and personality — better than a basic CV.',
    },
    {
        image: Images.mobile,
        title: 'Mobile Friendly & Fast',
        icon: TabletSmartphone,
        description: 'Search and apply anytime, anywhere. Optimized for speed and usability on all devices — from your phone to your desktop.',
    },
];

export default features;

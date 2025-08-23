import images from '@/constant/images';
import { BarChart2, Calendar, PieChart, Users } from 'lucide-react';
const cards = [
    {
        icon: Calendar,
        title: 'Streamline Hiring Process',
        description: 'Save time with faster recruitment workflows.',
    },
    {
        icon: BarChart2,
        title: 'Find the Best Fit Instantly',
        description: 'Advanced matching to connect with ideal candidates.',
    },
    {
        icon: Users,
        title: 'Access Global Talent Pool',
        description: 'Discover skilled professionals across industries.',
    },
    {
        icon: PieChart,
        title: 'Hire with Confidence',
        description: 'Verified profiles and reliable hiring support.',
    },
];
const carousel = [
    {
        id : 1,
        image: images.car1, // leave empty until you set value
        number: '92%',
        text: 'Faster Time-to-Hire',
        author: 'ZenCorp',
        comment:
            'HireFlex helped us reduce hiring cycles drastically. The automation saved us countless hours and ensured only the best candidates reached our pipeline.',
    },
    {
        id : 2,
        image: images.car2,
        number: '85%',
        text: 'Success Rate',
        author: 'Swiss',
        comment: 'HireFlex helped us cut through the noise and reach top candidates in no time. The AI matching tool is highly accurate.',
    },
    {
        id : 3,
        image: images.car3,
        number: '78%',
        text: 'Cost Reduction',
        author: 'NextHire',
        comment:
            'With HireFlex, we cut recruitment costs significantly. The platform’s smart matching saved both time and budget while keeping quality high.',
    },
    {
        id : 4,
        image: images.car4,
        number: '95%',
        text: 'Candidate Satisfaction',
        author: 'TalentWorks',
        comment: 'Our candidates loved the seamless experience. The platform made applying effortless, and engagement rates skyrocketed.',
    },
    {
        id : 5,
        image: images.car5,
        number: '88%',
        text: 'Retention Rate',
        author: 'GlobalTech',
        comment: 'HireFlex didn’t just help us hire faster — it helped us hire right. Our new hires are staying longer and performing better.',
    },
    {
        id : 6,
        image: images.car6,
        number: '90%',
        text: 'Productivity Boost',
        author: 'FutureLabs',
        comment: 'The automation features allowed our team to focus on strategic hiring decisions instead of repetitive tasks.',
    },
];

export {cards , carousel}
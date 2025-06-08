import React from 'react';
import { siteConfig } from '../config/siteConfig';

const LogoHeader: React.FC = () => (
    <header className="flex flex-col items-center mb-8">
        <div className="w-28 h-28 mb-4 rounded-full bg-gray-600 border-4 border-gray-500 flex items-center justify-center">
            <img src={siteConfig.logo} alt={siteConfig.altLogo} className="rounded-full w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">DVN Fitness</h1>
    </header>
);

export default LogoHeader;
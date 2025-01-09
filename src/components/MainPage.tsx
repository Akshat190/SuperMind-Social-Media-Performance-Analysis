'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ChatbotArea from './ChatbotArea';
import StatsGraph from './StatsGraph';
import TeamSection from './TeamSection';
import OptionButtons from './OptionButtons';
import PieChart from './PieChart';

type StatsType = 'carousel' | 'reels' | 'static' | 'story';

export default function MainPage() {
    const [activeOption, setActiveOption] = useState<StatsType>('reels');

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0">
                <Image
                    src="/images/new2.jpeg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                    quality={100}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8">
                <div className="text-center mb-12">
                <h1 className="text-5xl font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">SocialLens</h1>
                    <p className="text-lg italic">Decode your social impact!</p>
                </div>

                <main className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <ChatbotArea />
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-8">
                        <div className='flex w-full justify-center items-center space-x-12'>
                            <OptionButtons setActiveOption={setActiveOption} />
                            <StatsGraph activeOption={activeOption} />
                        </div>
                        
                        <div className="w-2/4">
                            <div className="bg-white rounded-xl border shadow-lg">
                                <PieChart />
                            </div>
                        </div>
                    </div>

                    <TeamSection />
                </main>
            </div>
        </div>
    );
}
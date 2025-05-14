'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Dispatch event to update navigation state
    window.dispatchEvent(new CustomEvent('menuStateChange', { 
      detail: { 
        isMenuOpen: true,
        isExpanded: true
      }
    }));

    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen bg-[#1A1A1A] transition-transform duration-500 ease-in-out transform ${
      isVisible ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-white font-['Times_New_Roman'] italic text-4xl md:text-5xl">
              About Reagan Matthew
            </h1>
            <p className="text-white font-degular text-sm leading-relaxed">
              Reagan Matthew is a multidisciplinary artist and designer based in New York City. 
              With a background in both fine arts and digital design, Reagan creates work that 
              bridges the gap between traditional and contemporary mediums.
            </p>
            <p className="text-white font-degular text-sm leading-relaxed">
              Their practice explores themes of identity, memory, and the intersection of 
              technology and human experience. Through various projects spanning documentary 
              filmmaking, art direction, and interactive installations, Reagan seeks to create 
              meaningful connections between viewers and their work.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-white font-['Times_New_Roman'] italic text-2xl md:text-3xl">
              Selected Exhibitions & Projects
            </h2>
            <ul className="text-white font-degular text-sm space-y-4">
              <li>Documentary Series - 2023</li>
              <li>Art Collection Exhibition - 2022</li>
              <li>Food Culture Project - 2021</li>
              <li>Hospitality Design Series - 2020</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
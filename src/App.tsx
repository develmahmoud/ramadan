import React, { useState, useEffect } from 'react';
import { Moon, Sun, Calendar, Share2, RocketIcon, CodeIcon } from 'lucide-react';

// Set the target date (New Year 2025 in this example)
const TARGET_DATE = new Date('2025-02-28T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const currentYear = new Date().getFullYear()
  
  
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[120px]">
      <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-gray-600 dark:text-gray-300 text-sm mt-2">{label}</span>
    </div>
  );

  const handleShare = () => {
    const targetDate = TARGET_DATE.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const message = `🎯 Countdown to Ramadan 2025 by Dev Mahmoud!\n\n⏰ Time Remaining:\n${timeLeft.days} 
    days\n${timeLeft.hours} hours\n${timeLeft.minutes} minutes\n${timeLeft.seconds} 
    seconds\n\nJoin me in counting down! 🎉 \n\n Visit: https://ramadan-countdown-lyart.vercel.app/`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <RocketIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">SpaceSoftwares Inc</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              aria-label="Share on WhatsApp"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-gray-600 dark:text-gray-300 mb-2">Time Remaining Until Ramadan 2025</h2>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {TARGET_DATE.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>
      <footer className='max-w-4xl mx-auto'>
            <div className="text-center mt-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                  <div className="">
                      Powered By SpaceSoftwares Inc ({currentYear})
                        
                      <RocketIcon className="ml-2 inline-block w-6 h-6 text-indigo-600 dark:text-white" />
                  </div>
                  <div>
                      <a href='https://devmahmoud-portfolio.vercel.app' target='_blank'>Contact Developer 
                      <CodeIcon className='ml-2 inline-block w-6 h-6 text-indigo-600 dark:text-white' /> </a>
                  </div>
                     
                </div>
            </div>
      </footer>
    </div>
  );
}

export default App;
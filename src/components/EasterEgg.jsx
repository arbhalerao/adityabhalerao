import React from 'react';

const EasterEgg = () => {
    const handleEasterEgg = () => {
        window.open("https://youtu.be/rEq1Z0bjdwc?si=FmUBM5WYfjhE8PFX", "_blank");
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
            <span
                onClick={handleEasterEgg}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors select-none italic cursor-pointer p-4"
                style={{
                    fontSize: '10px',
                    cursor: `url('/egg/light-saber.cur'), pointer`
                }}
            >
                Hello there
            </span>
        </div>
    );
};

export default EasterEgg;

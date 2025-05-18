import React from 'react';

const Timeline = ({currentStage, onStageChange}) => {
    const timelineStages = ['Classify', 'Ad Types', 'Write', 'Manage'];

    return (
        <div className="w-full py-10">
            <div className="flex justify-center items-center">
                {timelineStages.map((stage, index) => (
                    <div key={index} className="flex items-center">
                        <button 
                            onClick={() => onStageChange(stage)} 
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <span className={`w-[1.5vw] h-[1.5vw] ${currentStage === stage ? 'ring-2 ring-blue-700 ring-offset-2' : ''} rounded-full bg-blue-500`} />
                            <p className={`${currentStage === stage ? 'font-bold text-blue-700' : 'text-gray-600'}`}>{stage}</p>
                        </button>

                        {index < timelineStages.length - 1 && (
                            <div className="w-[17vw] h-1 bg-blue-300 mb-[1vw]"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;

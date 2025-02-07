import React, { useState, useEffect } from 'react';

interface propType{
    progress: number
}

const ProgressBar:React.FC<propType> = ({progress = 0}) => {

  useEffect(() => {

  }, []);

  return (
    <div className="w-[90vw] bg-[white] rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

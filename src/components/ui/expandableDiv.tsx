'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExpandableDiv = ({ bio }: { bio: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;
  const shouldTruncate = bio.length > maxLength;
  const displayText = shouldTruncate && !isExpanded ? `${bio.slice(0, maxLength)}...` : bio;

  return (
    <div className='space-y-2'>
      <p className='text-gray-600'>{displayText}</p>
      {shouldTruncate && (
        <button onClick={() => setIsExpanded(!isExpanded)} className='flex items-center gap-1 text-blue-500 hover:text-blue-600'>
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Read More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableDiv;

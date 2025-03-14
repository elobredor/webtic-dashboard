import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: number;
  className?: string;
  text?: string;
  fullscreen?: boolean;
  show?: boolean;
}

export function Loading({ 
  size = 24, 
  className = '', 
  text = 'Loading...', 
  fullscreen = false,
  show = true
}: LoadingProps) {
  if (!show) return null;

  const content = (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 
        size={size} 
        className={`animate-spin text-green-600 ${className}`}
      />
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
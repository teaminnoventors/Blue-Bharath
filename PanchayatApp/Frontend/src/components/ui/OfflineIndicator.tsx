import React from 'react';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

export function OfflineIndicator({ isOffline }: OfflineIndicatorProps) {
  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-amber-100 border-b border-amber-200 px-4 py-2 flex items-center justify-center z-50 animate-slide-down">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        <span className="text-amber-800 text-sm font-medium">You're offline. Data will sync when connected.</span>
      </div>
      
      <style jsx>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
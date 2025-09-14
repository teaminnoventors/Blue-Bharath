import React from 'react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-100 to-teal-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-300 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Logo and branding */}
      <div className="text-center space-y-6 animate-fade-in relative z-10">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl transform animate-bounce-slow">
          <div className="text-white text-4xl">🌱</div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl text-cyan-800 tracking-tight font-semibold">Blue Carbon MRV</h1>
          <p className="text-cyan-600 text-lg">Monitoring • Reporting • Verification</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto border border-cyan-200/30">
          <p className="text-cyan-700 text-sm leading-relaxed">
            Empowering coastal communities through transparent carbon credit management
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>


    </div>
  );
}
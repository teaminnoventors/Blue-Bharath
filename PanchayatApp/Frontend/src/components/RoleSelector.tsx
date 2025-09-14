import React from 'react';
import { UserRole } from '../App';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 flex flex-col p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-300 to-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-gradient-to-br from-sky-300 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-8 relative z-10">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <div className="text-white text-2xl">🌱</div>
        </div>
        <h1 className="text-2xl text-cyan-800 mb-2 font-semibold">Welcome to Blue Carbon MRV</h1>
        <p className="text-cyan-600">Choose your role to get started</p>
      </div>

      {/* Role selection cards */}
      <div className="flex-1 flex flex-col space-y-4 max-w-md mx-auto w-full relative z-10">
        {/* Panchayat card */}
        <div 
          className="p-6 bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform"
          onClick={() => onRoleSelect('panchayat')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md">
              <div className="text-white text-2xl">🏛️</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-cyan-800 mb-1 font-semibold">Panchayat</h3>
              <p className="text-cyan-600 text-sm leading-relaxed">
                Government body managing coastal restoration projects and community engagement
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-cyan-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cyan-500 bg-cyan-50 px-2 py-1 rounded-full font-medium">Government Authentication Required</span>
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* NGO card */}
        <div 
          className="p-6 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform"
          onClick={() => onRoleSelect('ngo')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md">
              <div className="text-white text-2xl">🤝</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-teal-800 mb-1 font-semibold">NGO Partner</h3>
              <p className="text-teal-600 text-sm leading-relaxed">
                Non-profit organization providing technical expertise and community training
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-teal-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-500 bg-teal-50 px-2 py-1 rounded-full font-medium">Sign In or Sign Up</span>
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-8 text-center relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 max-w-sm mx-auto border border-cyan-200/30">
          <p className="text-xs text-cyan-700 leading-relaxed">
            Secure authentication ensures data integrity and compliance with NCCR standards
          </p>
        </div>
      </div>
    </div>
  );
}
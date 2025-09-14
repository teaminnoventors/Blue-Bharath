import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface NGOAuthChoiceProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onBack: () => void;
}

export function NGOAuthChoice({ onSignIn, onSignUp, onBack }: NGOAuthChoiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-12">
        <Button 
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h1 className="text-xl text-cyan-800">NGO Access</h1>
        <div className="w-10"></div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <div className="text-white text-4xl">🤝</div>
        </div>
        <h2 className="text-2xl text-teal-800 mb-2">Welcome NGO Partner</h2>
        <p className="text-teal-600 text-sm px-4">
          Join our coastal restoration mission with technical expertise and community training
        </p>
      </div>

      {/* Auth Options */}
      <div className="space-y-4 mb-8">
        {/* Sign In Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-cyan-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-xl">👤</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-cyan-800 mb-1">Existing Member</h3>
              <p className="text-cyan-600 text-sm">
                Already have an NGO account? Sign in to continue
              </p>
            </div>
          </div>
          <Button 
            onClick={onSignIn}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3"
          >
            Sign In to Your Account
          </Button>
        </Card>

        {/* Sign Up Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-xl">✨</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-emerald-800 mb-1">New Partner</h3>
              <p className="text-emerald-600 text-sm">
                Register your organization to start collaborating
              </p>
            </div>
          </div>
          <Button 
            onClick={onSignUp}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3"
          >
            Create NGO Account
          </Button>
        </Card>
      </div>

      {/* Benefits Section */}
      <Card className="bg-white/60 backdrop-blur-sm border border-cyan-200 p-4">
        <h4 className="text-cyan-800 mb-3">Partnership Benefits</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <p className="text-cyan-700 text-sm">Technical guidance and best practices</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <p className="text-cyan-700 text-sm">Quality assurance and monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <p className="text-cyan-700 text-sm">Carbon credit certification support</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <p className="text-cyan-700 text-sm">Access to specialized training programs</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface NGOSignInProps {
  onSignInSuccess: (profile: any) => void;
  onBack: () => void;
  onSwitchToSignUp: () => void;
}

export function NGOSignIn({ onSignInSuccess, onBack, onSwitchToSignUp }: NGOSignInProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    setIsSigningIn(true);
    
    // Simulate sign in process
    setTimeout(() => {
      const profile = {
        organizationName: 'Coastal Conservation NGO',
        contactPerson: 'Dr. Sarah Johnson',
        email: formData.email,
        phone: '+91 9876543210',
        registrationNumber: 'NGO/2020/001234',
        location: 'Mumbai, Maharashtra',
        expertise: ['Mangrove Restoration', 'Community Training', 'Carbon Credits'],
        isExistingUser: true
      };
      
      setIsSigningIn(false);
      onSignInSuccess(profile);
    }, 2000);
  };

  const isFormValid = formData.email && formData.password;

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
        <h1 className="text-xl text-cyan-800">Sign In</h1>
        <div className="w-10"></div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <div className="text-white text-3xl">👤</div>
        </div>
        <h2 className="text-2xl text-cyan-800 mb-2">Welcome Back</h2>
        <p className="text-cyan-600 text-sm px-4">
          Sign in to your NGO account to continue
        </p>
      </div>

      {/* Sign In Form */}
      <Card className="bg-white/80 backdrop-blur-sm border border-cyan-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@organization.org"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-cyan-700">
              <input type="checkbox" className="rounded border-cyan-300" />
              <span>Remember me</span>
            </label>
            <button className="text-blue-600 hover:text-blue-700">
              Forgot password?
            </button>
          </div>
        </div>
      </Card>

      {/* Sign In Button */}
      <Button
        onClick={handleSignIn}
        disabled={!isFormValid || isSigningIn}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 mb-6"
      >
        {isSigningIn ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </div>
        ) : (
          'Sign In to Account'
        )}
      </Button>

      {/* Switch to Sign Up */}
      <Card className="bg-white/60 backdrop-blur-sm border border-emerald-200 p-4 text-center">
        <p className="text-emerald-700 text-sm mb-2">
          Don't have an account yet?
        </p>
        <Button
          onClick={onSwitchToSignUp}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm py-2 px-4"
        >
          Create New Account
        </Button>
      </Card>
    </div>
  );
}
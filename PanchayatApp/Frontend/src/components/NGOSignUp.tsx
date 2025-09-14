import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface NGOSignUpProps {
  onSignUpSuccess: (profile: any) => void;
  onBack: () => void;
  onSwitchToSignIn: () => void;
}

export function NGOSignUp({ onSignUpSuccess, onBack, onSwitchToSignIn }: NGOSignUpProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
    location: ''
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    setIsSigningUp(true);
    
    // Simulate sign up process
    setTimeout(() => {
      const profile = {
        organizationName: formData.organizationName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        registrationNumber: formData.registrationNumber,
        location: formData.location,
        expertise: ['Coastal Restoration', 'Environmental Education', 'Community Development'],
        isNewUser: true
      };
      
      setIsSigningUp(false);
      onSignUpSuccess(profile);
    }, 2000);
  };

  const isFormValid = formData.organizationName && 
                     formData.contactPerson && 
                     formData.email && 
                     formData.phone && 
                     formData.password && 
                     formData.confirmPassword &&
                     formData.password === formData.confirmPassword;

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
        <h1 className="text-xl text-cyan-800">Create Account</h1>
        <div className="w-10"></div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <div className="text-white text-3xl">✨</div>
        </div>
        <h2 className="text-2xl text-emerald-800 mb-2">Join Our Mission</h2>
        <p className="text-emerald-600 text-sm px-4">
          Register your NGO to start making a difference
        </p>
      </div>

      {/* Sign Up Form */}
      <div className="space-y-4 mb-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200 p-6">
          <h3 className="text-emerald-800 mb-4">Organization Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                placeholder="Your NGO Name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="NGO/2024/XXXXX"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-cyan-200 p-6">
          <h3 className="text-cyan-800 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Primary contact name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@yourorg.org"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 XXXXXXXXXX"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-blue-200 p-6">
          <h3 className="text-blue-800 mb-4">Account Security</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong password"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="mt-2"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Sign Up Button */}
      <Button
        onClick={handleSignUp}
        disabled={!isFormValid || isSigningUp}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 mb-6"
      >
        {isSigningUp ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating Account...</span>
          </div>
        ) : (
          'Create NGO Account'
        )}
      </Button>

      {/* Switch to Sign In */}
      <Card className="bg-white/60 backdrop-blur-sm border border-blue-200 p-4 text-center">
        <p className="text-blue-700 text-sm mb-2">
          Already have an account?
        </p>
        <Button
          onClick={onSwitchToSignIn}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm py-2 px-4"
        >
          Sign In Instead
        </Button>
      </Card>
    </div>
  );
}
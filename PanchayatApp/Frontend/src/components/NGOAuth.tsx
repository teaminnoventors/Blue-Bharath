import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface NGOAuthProps {
  ngoName: string;
  onComplete: (ngoUser: any) => void;
  onBack: () => void;
}

export function NGOAuth({ ngoName, onComplete, onBack }: NGOAuthProps) {
  const [authMode, setAuthMode] = useState<'choice' | 'login' | 'register'>('choice');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: ngoName,
    contactPerson: '',
    phone: '',
    registrationNumber: '',
    address: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      const ngoUser = {
        id: `ngo_${Date.now()}`,
        organizationName: ngoName,
        email: formData.email,
        role: 'ngo-partner',
        isAuthenticated: true
      };
      setIsLoading(false);
      onComplete(ngoUser);
    }, 2000);
  };

  const handleRegister = () => {
    setIsLoading(true);
    // Simulate registration API call
    setTimeout(() => {
      const ngoUser = {
        id: `ngo_${Date.now()}`,
        organizationName: formData.organizationName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
        role: 'ngo-partner',
        isAuthenticated: true,
        isNewRegistration: true
      };
      setIsLoading(false);
      onComplete(ngoUser);
    }, 3000);
  };

  const renderAuthChoice = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
          <div className="text-white text-2xl">🏢</div>
        </div>
        <h2 className="text-xl text-cyan-800 mb-2">NGO Authentication</h2>
        <p className="text-cyan-600 text-sm">Connect with {ngoName}</p>
      </div>

      <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="text-white">🌊</div>
          </div>
          <div>
            <h3 className="text-cyan-800">{ngoName}</h3>
            <p className="text-cyan-600 text-sm">Verified Partner Organization</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-blue-600 text-xs">Rating</div>
            <div className="text-blue-800">⭐⭐⭐⭐⭐ 4.8/5</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-green-600 text-xs">Projects</div>
            <div className="text-green-800">150+ Completed</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-blue-600">👥</div>
            <h4 className="text-blue-800">Existing NGO Member?</h4>
          </div>
          <p className="text-blue-700 text-sm mb-4">
            If your organization already has an account with {ngoName}, please login to continue.
          </p>
          <Button 
            onClick={() => setAuthMode('login')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Login to NGO Account
          </Button>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-emerald-600">📝</div>
            <h4 className="text-emerald-800">New Partnership?</h4>
          </div>
          <p className="text-emerald-700 text-sm mb-4">
            Register your organization to start a new partnership with {ngoName}.
          </p>
          <Button 
            onClick={() => setAuthMode('register')}
            variant="outline"
            className="w-full border-emerald-400 text-emerald-700 hover:bg-emerald-100"
          >
            Register New Organization
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-cyan-600 hover:bg-cyan-50"
        >
          ← Back to NGO Selection
        </Button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
          <div className="text-white text-2xl">🔐</div>
        </div>
        <h2 className="text-xl text-cyan-800 mb-2">NGO Login</h2>
        <p className="text-cyan-600 text-sm">Access your {ngoName} account</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@ngo.org"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-amber-600">⚠️</div>
            <h4 className="text-amber-800">Security Notice</h4>
          </div>
          <p className="text-amber-700 text-sm">
            Your login credentials will be verified with {ngoName}'s secure authentication system.
          </p>
        </div>

        <Button 
          onClick={handleLogin}
          disabled={isLoading || !formData.email || !formData.password}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Logging in...</span>
            </div>
          ) : (
            'Login to NGO Account'
          )}
        </Button>

        <div className="text-center space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setAuthMode('register')}
            className="text-emerald-600 hover:bg-emerald-50"
          >
            Don't have an account? Register
          </Button>
          <br />
          <Button 
            variant="ghost" 
            onClick={() => setAuthMode('choice')}
            className="text-cyan-600 hover:bg-cyan-50"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-4">
          <div className="text-white text-2xl">📋</div>
        </div>
        <h2 className="text-xl text-cyan-800 mb-2">NGO Registration</h2>
        <p className="text-cyan-600 text-sm">Register to partner with {ngoName}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              placeholder="Full Name"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="orgEmail">Organization Email *</Label>
          <Input
            id="orgEmail"
            type="email"
            placeholder="info@yourorganization.org"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Registration Number *</Label>
          <Input
            id="registrationNumber"
            placeholder="NGO Registration Number"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="address">Organization Address *</Label>
          <Input
            id="address"
            placeholder="Complete address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="regPassword">Password *</Label>
            <Input
              id="regPassword"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-green-600">✅</div>
            <h4 className="text-green-800">Partnership Benefits</h4>
          </div>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Direct collaboration on coastal restoration projects</li>
            <li>• Technical support and quality assurance</li>
            <li>• Carbon credit certification assistance</li>
            <li>• Access to specialized training programs</li>
          </ul>
        </div>

        <Button 
          onClick={handleRegister}
          disabled={isLoading || !formData.email || !formData.password || !formData.contactPerson}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Registering...</span>
            </div>
          ) : (
            'Register Organization'
          )}
        </Button>

        <div className="text-center space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setAuthMode('login')}
            className="text-blue-600 hover:bg-blue-50"
          >
            Already have an account? Login
          </Button>
          <br />
          <Button 
            variant="ghost" 
            onClick={() => setAuthMode('choice')}
            className="text-cyan-600 hover:bg-cyan-50"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
            NGO Partnership
          </Badge>
          <div className="w-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-cyan-200 shadow-xl">
          <div className="p-6">
            {authMode === 'choice' && renderAuthChoice()}
            {authMode === 'login' && renderLogin()}
            {authMode === 'register' && renderRegister()}
          </div>
        </Card>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface PanchayatOnboardingProps {
  onComplete: (profile: any) => void;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  { id: 1, title: 'Authentication', description: 'Verify your government credentials' },
  { id: 2, title: 'Profile Setup', description: 'Basic information about your Panchayat' },
  { id: 3, title: 'Collaboration', description: 'Connect with NGO partners' },
  { id: 4, title: 'Jurisdiction', description: 'Review your area of responsibility' }
];

export function PanchayatOnboarding({ onComplete }: PanchayatOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    govtId: '',
    name: '',
    panchayatName: '',
    block: '',
    district: '',
    state: '',
    contactNumber: '',
    authorizedPerson: '',
    wantsCollaboration: false,
    selectedNGO: ''
  });

  const mockNGOs = [
    'Coastal Conservation Foundation',
    'Marine Ecosystem Trust',
    'Blue Carbon Initiative',
    'Mangrove Protection Society'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">🔐</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Government Authentication</h2>
              <p className="text-cyan-600 text-sm">Verify your identity with government credentials</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="govtId">Government ID / Employee ID</Label>
                <Input
                  id="govtId"
                  placeholder="Enter your government ID"
                  value={formData.govtId}
                  onChange={(e) => handleInputChange('govtId', e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Development mode notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="text-amber-600">⚠️</div>
                  <p className="text-amber-700 text-sm">
                    <strong>Development Mode:</strong> Authentication is simulated. In production, this would integrate with government ID systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">📋</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Panchayat Profile</h2>
              <p className="text-cyan-600 text-sm">Provide basic information about your Panchayat</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="panchayatName">Panchayat Name</Label>
                  <Input
                    id="panchayatName"
                    placeholder="e.g., Coastal Village Panchayat"
                    value={formData.panchayatName}
                    onChange={(e) => handleInputChange('panchayatName', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="block">Block</Label>
                    <Input
                      id="block"
                      placeholder="Block name"
                      value={formData.block}
                      onChange={(e) => handleInputChange('block', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="District name"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label>State</Label>
                  <Select onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="odisha">Odisha</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="authorizedPerson">Authorized Person Name</Label>
                    <Input
                      id="authorizedPerson"
                      placeholder="Full name of authorized person"
                      value={formData.authorizedPerson}
                      onChange={(e) => handleInputChange('authorizedPerson', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      placeholder="+91 98765 43210"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">🤝</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">NGO Collaboration</h2>
              <p className="text-cyan-600 text-sm">Connect with NGO partners for technical support</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
                <h3 className="text-cyan-800 mb-3">Do you want to collaborate with NGOs?</h3>
                <div className="flex space-x-4">
                  <Button
                    variant={formData.wantsCollaboration ? "default" : "outline"}
                    onClick={() => handleInputChange('wantsCollaboration', true)}
                    className="flex-1"
                  >
                    Yes, I'm interested
                  </Button>
                  <Button
                    variant={!formData.wantsCollaboration ? "default" : "outline"}
                    onClick={() => handleInputChange('wantsCollaboration', false)}
                    className="flex-1"
                  >
                    Not now
                  </Button>
                </div>
              </div>

              {formData.wantsCollaboration && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label>Select an NGO Partner</Label>
                    <Select onValueChange={(value) => handleInputChange('selectedNGO', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose from registered NGOs nearby" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockNGOs.map((ngo) => (
                          <SelectItem key={ngo} value={ngo}>
                            {ngo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="text-emerald-800 mb-2">Benefits of NGO Partnership:</h4>
                    <ul className="text-emerald-700 text-sm space-y-1">
                      <li>• Technical expertise in coastal restoration</li>
                      <li>• Training programs for community workers</li>
                      <li>• Quality assurance and monitoring support</li>
                      <li>• Access to best practices and resources</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">🗺️</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Jurisdiction Area</h2>
              <p className="text-cyan-600 text-sm">Review your area of responsibility</p>
            </div>

            <div className="space-y-4">
              {/* Map preview placeholder */}
              <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-lg h-48 flex flex-col items-center justify-center border-2 border-dashed border-cyan-300">
                <div className="text-cyan-400 text-4xl mb-2">🗺️</div>
                <p className="text-cyan-600 text-sm text-center">
                  Map Preview<br />
                  <span className="text-xs">Jurisdiction boundaries will be loaded from NCCR database</span>
                </p>
              </div>

              {/* Summary */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
                <h3 className="text-cyan-800 mb-3">Setup Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-600">Panchayat:</span>
                    <span className="text-cyan-800">{formData.panchayatName || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600">Location:</span>
                    <span className="text-cyan-800">{formData.district || 'Not specified'}, {formData.state || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600">Authorized Person:</span>
                    <span className="text-cyan-800">{formData.authorizedPerson || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600">NGO Partner:</span>
                    <span className="text-cyan-800">
                      {formData.wantsCollaboration ? (formData.selectedNGO || 'To be selected') : 'None'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-emerald-600">✅</div>
                  <h4 className="text-emerald-800">Ready to Start</h4>
                </div>
                <p className="text-emerald-700 text-sm">
                  Your Panchayat profile is complete. You can now create projects and start coastal restoration initiatives.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 flex flex-col">
      {/* Progress indicator */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-cyan-400 text-white' 
                  : 'bg-white text-cyan-400 border-2 border-cyan-200'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-cyan-400' : 'bg-cyan-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-cyan-200 shadow-xl">
          <div className="p-6">
            {renderStepContent()}
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto flex space-x-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
          >
            {currentStep === 4 ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
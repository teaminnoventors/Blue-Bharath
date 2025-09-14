import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

interface NGOOnboardingProps {
  onComplete: (profile: any) => void;
}

export function NGOOnboarding({ onComplete }: NGOOnboardingProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: '',
    officeAddress: '',
    contactPerson: '',
    email: '',
    phone: '',
    description: '',
    hasPreviousWork: false,
    previousWorkDetails: '',
    interestedInCollaboration: true
  });
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = () => {
    // Simulate file upload
    setDocumentUploaded(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 p-6">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <div className="text-white text-2xl">🤝</div>
        </div>
        <h1 className="text-2xl text-teal-800 mb-2">NGO Registration</h1>
        <p className="text-teal-600">Join our network of coastal conservation partners</p>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-teal-200 shadow-xl">
          <div className="p-6 space-y-6">
            {/* Organization Details */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg text-teal-800 mb-2">Organization Information</h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto"></div>
              </div>

              <div>
                <Label htmlFor="organizationName">NGO Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Full organization name"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Government registration number"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="officeAddress">Office Address *</Label>
                <Textarea
                  id="officeAddress"
                  placeholder="Complete office address with pincode"
                  value={formData.officeAddress}
                  onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                  className="mt-2 min-h-[80px]"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg text-teal-800 mb-2">Contact Information</h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto"></div>
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="Primary contact person name"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="organization@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <div>
                <Label>Registration Document *</Label>
                <div className="mt-2">
                  {!documentUploaded ? (
                    <div 
                      className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-400 transition-colors"
                      onClick={handleDocumentUpload}
                    >
                      <div className="text-teal-400 text-2xl mb-2">📄</div>
                      <p className="text-teal-600 text-sm">
                        Tap to upload registration certificate (PDF)
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-emerald-600">✅</div>
                        <div>
                          <p className="text-emerald-800 text-sm">Registration_Certificate.pdf</p>
                          <p className="text-emerald-600 text-xs">Uploaded successfully</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Organization Description */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your organization's mission and focus areas (200 characters max)"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value.slice(0, 200))}
                  className="mt-2 min-h-[80px]"
                />
                <p className="text-xs text-teal-500 mt-1">{formData.description.length}/200 characters</p>
              </div>
            </div>

            {/* Previous Work */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Switch
                  checked={formData.hasPreviousWork}
                  onCheckedChange={(checked) => handleInputChange('hasPreviousWork', checked)}
                />
                <Label>Previous mangrove/coastal restoration work</Label>
              </div>

              {formData.hasPreviousWork && (
                <div className="animate-fade-in">
                  <Label htmlFor="previousWorkDetails">Project Details</Label>
                  <Textarea
                    id="previousWorkDetails"
                    placeholder="Describe your previous coastal restoration projects, locations, and outcomes..."
                    value={formData.previousWorkDetails}
                    onChange={(e) => handleInputChange('previousWorkDetails', e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              )}
            </div>

            {/* Collaboration Interest */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Switch
                  checked={formData.interestedInCollaboration}
                  onCheckedChange={(checked) => handleInputChange('interestedInCollaboration', checked)}
                />
                <Label>I'm interested in collaborating with Panchayats</Label>
              </div>
              <p className="text-emerald-700 text-xs">
                Enable this to be visible to Panchayats looking for NGO partners
              </p>
            </div>

            {/* Verification Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-amber-600">⏳</div>
                <h4 className="text-amber-800">Verification Process</h4>
              </div>
              <p className="text-amber-700 text-sm">
                After submission, NCCR will verify your registration and credentials. 
                Expected response time: 3-5 business days.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !documentUploaded || !formData.organizationName || !formData.registrationNumber}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit for Verification'
              )}
            </Button>

            {/* Privacy Notice */}
            <div className="text-center">
              <p className="text-xs text-teal-600">
                By submitting, you agree to NCCR's verification process and data handling policies
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-gradient-to-br from-cyan-300 to-teal-400 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
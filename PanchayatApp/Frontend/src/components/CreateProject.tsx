import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User } from '../App';

interface CreateProjectProps {
  user: User;
  onComplete: () => void;
  onBack: () => void;
}

interface ProjectStep {
  id: number;
  title: string;
  description: string;
}

const steps: ProjectStep[] = [
  { id: 1, title: 'Basic Info', description: 'Project details and type' },
  { id: 2, title: 'Location', description: 'GPS coordinates and mapping' },
  { id: 3, title: 'Media Upload', description: 'Photos and documentation' },
  { id: 4, title: 'Workers', description: 'Team and workforce setup' },
  { id: 5, title: 'Collaboration', description: 'NGO partnership selection' },
  { id: 6, title: 'Review', description: 'Final review and submission' }
];

export function CreateProject({ user, onComplete, onBack }: CreateProjectProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    type: '',
    ecosystem: '',
    areaSize: '',
    workerCount: '',
    hasWorkerAccounts: false,
    workers: [] as any[],
    selectedNGO: '',
    location: { lat: 0, lng: 0, accuracy: 0 },
    media: [] as any[],
    description: ''
  });
  
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mockNGOs = [
    'Coastal Conservation Foundation',
    'Marine Ecosystem Trust', 
    'Blue Carbon Initiative',
    'Mangrove Protection Society'
  ];

  const handleInputChange = (field: string, value: any) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const captureLocation = () => {
    setIsCapturingLocation(true);
    // Simulate GPS capture
    setTimeout(() => {
      handleInputChange('location', {
        lat: 22.5726 + (Math.random() - 0.5) * 0.1,
        lng: 88.3639 + (Math.random() - 0.5) * 0.1,
        accuracy: Math.floor(Math.random() * 5) + 2
      });
      setIsCapturingLocation(false);
    }, 3000);
  };

  const uploadMedia = () => {
    setIsUploadingMedia(true);
    // Simulate media upload
    setTimeout(() => {
      const newMedia = {
        id: Date.now(),
        type: 'image',
        url: 'mock://land-photo.jpg',
        timestamp: new Date().toISOString(),
        gps: `${projectData.location.lat.toFixed(6)}, ${projectData.location.lng.toFixed(6)}`,
        accuracy: projectData.location.accuracy
      };
      handleInputChange('media', [...projectData.media, newMedia]);
      setIsUploadingMedia(false);
    }, 2000);
  };

  const addWorker = () => {
    const newWorker = {
      id: Date.now(),
      name: '',
      aadhaar: '',
      bankUPI: '',
      mobile: ''
    };
    handleInputChange('workers', [...projectData.workers, newWorker]);
  };

  const updateWorker = (index: number, field: string, value: string) => {
    const updatedWorkers = [...projectData.workers];
    updatedWorkers[index] = { ...updatedWorkers[index], [field]: value };
    handleInputChange('workers', updatedWorkers);
  };

  const submitProject = () => {
    setIsSubmitting(true);
    // Simulate project submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Auto-close modal and navigate after showing success
      setTimeout(() => {
        setShowSuccessModal(false);
        onComplete();
      }, 3000);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">🌱</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Project Basic Information</h2>
              <p className="text-cyan-600 text-sm">Define your coastal restoration project</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Coastal Mangrove Restoration Initiative"
                  value={projectData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Project Type *</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plantation">Plantation</SelectItem>
                    <SelectItem value="restoration">Restoration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Ecosystem Type *</Label>
                <Select onValueChange={(value) => handleInputChange('ecosystem', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose ecosystem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mangrove">Mangrove</SelectItem>
                    <SelectItem value="seagrass">Seagrass</SelectItem>
                    <SelectItem value="salt-marsh">Salt Marsh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="areaSize">Area Size (hectares) *</Label>
                  <Input
                    id="areaSize"
                    type="number"
                    placeholder="0.0"
                    value={projectData.areaSize}
                    onChange={(e) => handleInputChange('areaSize', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="workerCount">Estimated Workers *</Label>
                  <Input
                    id="workerCount"
                    type="number"
                    placeholder="0"
                    value={projectData.workerCount}
                    onChange={(e) => handleInputChange('workerCount', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your restoration goals and approach..."
                  value={projectData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2 min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">📍</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Project Location</h2>
              <p className="text-cyan-600 text-sm">Capture GPS coordinates for verification</p>
            </div>

            <div className="space-y-4">
              {/* GPS Capture */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-cyan-800">GPS Location</h3>
                  <Button
                    onClick={captureLocation}
                    disabled={isCapturingLocation}
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    {isCapturingLocation ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Capturing...</span>
                      </div>
                    ) : (
                      'Capture Location'
                    )}
                  </Button>
                </div>

                {projectData.location.lat !== 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-600">Latitude:</span>
                      <span className="text-cyan-800">{projectData.location.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-600">Longitude:</span>
                      <span className="text-cyan-800">{projectData.location.lng.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-600">Accuracy:</span>
                      <span className={`${projectData.location.accuracy <= 5 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        ±{projectData.location.accuracy}m
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Preview */}
              <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-lg h-48 flex flex-col items-center justify-center border-2 border-dashed border-cyan-300">
                <div className="text-cyan-400 text-4xl mb-2">🗺️</div>
                <p className="text-cyan-600 text-sm text-center">
                  Map Preview<br />
                  <span className="text-xs">Location will be verified for accuracy</span>
                </p>
              </div>

              {/* GPS Requirements */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-amber-600">⚠️</div>
                  <h4 className="text-amber-800">GPS Requirements</h4>
                </div>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• GPS accuracy must be ≤5m for submission</li>
                  <li>• Location must be within Panchayat jurisdiction</li>
                  <li>• Multiple capture attempts may be needed</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">📸</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Media Documentation</h2>
              <p className="text-cyan-600 text-sm">Upload land photos and videos (minimum 3 required)</p>
            </div>

            <div className="space-y-4">
              {/* Upload Button */}
              <div className="text-center">
                <Button
                  onClick={uploadMedia}
                  disabled={isUploadingMedia || projectData.location.lat === 0}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isUploadingMedia ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <>📷 Capture Photo</>
                  )}
                </Button>
                {projectData.location.lat === 0 && (
                  <p className="text-amber-600 text-xs mt-2">Location must be captured first</p>
                )}
              </div>

              {/* Uploaded Media */}
              <div className="space-y-3">
                {projectData.media.map((item, index) => (
                  <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <div className="text-white">📷</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-cyan-800">Photo {index + 1}</p>
                        <p className="text-xs text-cyan-600">GPS: {item.gps}</p>
                        <p className="text-xs text-cyan-600">Accuracy: ±{item.accuracy}m</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">✅ Verified</Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Upload Progress */}
              {projectData.media.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-800 text-sm">Upload Progress</span>
                    <span className="text-emerald-600 text-sm">{projectData.media.length}/3 minimum</span>
                  </div>
                  <Progress 
                    value={(projectData.media.length / 3) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              {/* AI Pre-check Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-blue-600">🤖</div>
                  <h4 className="text-blue-800">AI Verification</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  All uploads are automatically checked for duplicates and tampering. 
                  Flagged images will require manual review.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">👥</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Worker Management</h2>
              <p className="text-cyan-600 text-sm">Add community workers and payment details</p>
            </div>

            <div className="space-y-4">
              {/* Worker List */}
              <div className="space-y-3">
                {projectData.workers.map((worker, index) => (
                  <Card key={worker.id} className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Full Name"
                          value={worker.name}
                          onChange={(e) => updateWorker(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Mobile Number"
                          value={worker.mobile}
                          onChange={(e) => updateWorker(index, 'mobile', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Aadhaar (Optional)"
                          value={worker.aadhaar}
                          onChange={(e) => updateWorker(index, 'aadhaar', e.target.value)}
                        />
                        <Input
                          placeholder="Bank/UPI ID"
                          value={worker.bankUPI}
                          onChange={(e) => updateWorker(index, 'bankUPI', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add Worker Button */}
              <Button
                onClick={addWorker}
                variant="outline"
                className="w-full border-cyan-200 hover:bg-cyan-50"
              >
                ➕ Add Worker
              </Button>

              {/* Privacy Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-amber-600">🔒</div>
                  <h4 className="text-amber-800">Privacy & Security</h4>
                </div>
                <p className="text-amber-700 text-sm mb-3">
                  Worker data is encrypted and stored securely. Aadhaar numbers are optional 
                  but may be required for government compliance and payments.
                </p>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-amber-300" />
                  <label className="text-amber-700 text-sm">
                    I consent to storing worker information for project management
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">🤝</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">NGO Collaboration</h2>
              <p className="text-cyan-600 text-sm">Select an NGO partner for technical support and verification</p>
            </div>

            <div className="space-y-4">
              {/* NGO Selection */}
              <div>
                <Label>Select NGO Partner</Label>
                <Select onValueChange={(value) => handleInputChange('selectedNGO', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose an NGO partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockNGOs.map((ngo) => (
                      <SelectItem key={ngo} value={ngo}>{ngo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected NGO Details */}
              {projectData.selectedNGO && projectData.selectedNGO !== 'independent' && (
                <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <div className="text-white">🏢</div>
                    </div>
                    <div>
                      <h3 className="text-cyan-800">{projectData.selectedNGO}</h3>
                      <p className="text-cyan-600 text-sm">Verified Partner Organization</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <h4 className="text-emerald-800 text-sm mb-2">Partnership Benefits</h4>
                      <ul className="text-emerald-700 text-xs space-y-1">
                        <li>• Technical guidance and best practices</li>
                        <li>• Quality assurance and monitoring</li>
                        <li>• Carbon credit certification support</li>
                        <li>• Access to specialized training programs</li>
                      </ul>
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
                  </div>
                </Card>
              )}

              {/* Selected NGO Details for Independent */}
              {projectData.selectedNGO === 'independent' && (
                <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                      <div className="text-white">🏛️</div>
                    </div>
                    <div>
                      <h3 className="text-cyan-800">Independent Project</h3>
                      <p className="text-cyan-600 text-sm">Proceeding without NGO partnership</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-700 text-xs">
                      You can add an NGO partner later through the project management panel.
                    </p>
                  </div>
                </Card>
              )}

              {/* Collaboration Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-blue-600">📋</div>
                  <h4 className="text-blue-800">Collaboration Agreement</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-blue-300" />
                    <label className="text-blue-700 text-sm">
                      I agree to follow NGO guidelines and best practices
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-blue-300" />
                    <label className="text-blue-700 text-sm">
                      I consent to data sharing for project monitoring
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-blue-300" />
                    <label className="text-blue-700 text-sm">
                      I understand the carbon credit sharing terms (70% Panchayat, 30% NGO)
                    </label>
                  </div>
                </div>
              </div>

              {/* Skip Option */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleInputChange('selectedNGO', 'independent')}
                  className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                >
                  Continue Without NGO Partner
                </Button>
                <p className="text-cyan-500 text-xs mt-2">
                  You can add an NGO partner later if needed
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-white text-2xl">✅</div>
              </div>
              <h2 className="text-xl text-cyan-800 mb-2">Project Review</h2>
              <p className="text-cyan-600 text-sm">Review all details before submission</p>
            </div>

            <div className="space-y-4">
              {/* Project Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                <h3 className="text-cyan-800 mb-3">Project Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Title:</span>
                    <span className="text-cyan-800 text-sm text-right">{projectData.title || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Type:</span>
                    <span className="text-cyan-800 text-sm capitalize">{projectData.type || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Ecosystem:</span>
                    <span className="text-cyan-800 text-sm capitalize">{projectData.ecosystem || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Area:</span>
                    <span className="text-cyan-800 text-sm">{projectData.areaSize || '0'} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Workers:</span>
                    <span className="text-cyan-800 text-sm">{projectData.workerCount || '0'} estimated</span>
                  </div>
                </div>
              </Card>

              {/* Location Status */}
              <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                <h3 className="text-cyan-800 mb-3">Location & Media</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-600 text-sm">GPS Location:</span>
                    <Badge className={projectData.location.lat !== 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                      {projectData.location.lat !== 0 ? '✅ Captured' : '⚠️ Missing'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-600 text-sm">Media Files:</span>
                    <Badge className={projectData.media.length >= 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                      {projectData.media.length >= 3 ? `✅ ${projectData.media.length} files` : `⚠️ ${projectData.media.length}/3 minimum`}
                    </Badge>
                  </div>
                  {projectData.location.lat !== 0 && (
                    <div className="text-xs text-cyan-600">
                      GPS: {projectData.location.lat.toFixed(6)}, {projectData.location.lng.toFixed(6)} (±{projectData.location.accuracy}m)
                    </div>
                  )}
                </div>
              </Card>

              {/* Workers Summary */}
              <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                <h3 className="text-cyan-800 mb-3">Worker Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-cyan-600 text-sm">Registered Workers:</span>
                    <span className="text-cyan-800 text-sm">{projectData.workers.length}</span>
                  </div>
                  {projectData.workers.length > 0 && (
                    <div className="text-xs text-cyan-600">
                      Workers can be added or modified after project approval
                    </div>
                  )}
                </div>
              </Card>

              {/* NGO Partnership */}
              <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                <h3 className="text-cyan-800 mb-3">Partnership</h3>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-600 text-sm">NGO Partner:</span>
                  <span className="text-cyan-800 text-sm text-right">
                    {projectData.selectedNGO === 'independent' ? 'Independent Project' : 
                     projectData.selectedNGO || 'Not selected'}
                  </span>
                </div>
              </Card>

              {/* Submission Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-blue-600">🚀</div>
                  <h4 className="text-blue-800">Ready for Submission</h4>
                </div>
                <div className="space-y-2 text-blue-700 text-sm">
                  <p>• Your project will be submitted to NCCR for review</p>
                  <p>• Review process typically takes 5-7 business days</p>
                  <p>• You'll be notified of approval status via the app</p>
                  <p>• Project can be edited until final approval</p>
                </div>
              </div>

              {/* Final Consent */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <input type="checkbox" className="rounded border-emerald-300" />
                  <label className="text-emerald-800 text-sm">
                    I confirm all information is accurate and complete
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-emerald-300" />
                  <label className="text-emerald-800 text-sm">
                    I agree to the Blue Carbon MRV terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 flex flex-col">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-auto text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
              <div className="text-white text-4xl animate-pulse">✅</div>
            </div>
            <h2 className="text-2xl text-emerald-800 mb-4">Success!</h2>
            <p className="text-emerald-700 mb-2">
              Your project has been successfully submitted to NCCR for review.
            </p>
            <p className="text-emerald-600 text-sm">
              You will receive updates on the approval status within 5-7 business days.
            </p>
          </div>
        </div>
      )}

      {/* Header with progress */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={handleBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800">Create New Project</h1>
          <div className="w-12"></div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <Progress value={(currentStep / 6) * 100} className="h-1" />
        </div>

        <div className="text-center">
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
            Step {currentStep} of 6: {steps[currentStep - 1]?.title}
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
        <div className="max-w-md mx-auto">
          <Button 
            onClick={currentStep === 6 ? submitProject : handleNext}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            disabled={
              (currentStep === 2 && projectData.location.lat === 0) ||
              (currentStep === 3 && projectData.media.length < 3) ||
              isSubmitting
            }
          >
            {currentStep === 6 ? (
              isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting to NCCR...</span>
                </div>
              ) : (
                'Submit Project'
              )
            ) : (
              'Next Step'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
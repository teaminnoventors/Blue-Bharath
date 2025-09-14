import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  Users,
  Building,
  MapPin,
  Calendar,
  Camera,
  Satellite,
  FileText,
  Shield,
  Activity,
  Hash,
  Download,
  ExternalLink,
  Clock,
  TrendingUp,
  Leaf,
  X,
  AlertCircle,
  Eye,
  Star,
  Zap,
  Database,
  MessageSquare,
  Image,
  PlayCircle,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface BaseProject {
  id: string;
  projectId: string;
  panchayat: string;
  ngo: string;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Salt Marsh' | 'Coral Reef' | 'Estuary';
  hectaresRestored: number;
  location: string;
  state: string;
}

interface ReadyForCreditsProject extends BaseProject {
  estimatedCredits: number;
  verificationCompletedOn: string;
  complianceScore: number;
  type: 'ready';
}

interface IssuedCertificate extends BaseProject {
  creditsGenerated: number;
  dateIssued: string;
  certificateId: string;
  blockchainHash: string;
  status: 'Active' | 'Retired' | 'Transferred';
  vintage: string;
  methodology: string;
  type: 'issued';
}

type ProjectData = ReadyForCreditsProject | IssuedCertificate;

interface ProjectDetailProps {
  project: ProjectData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateCredits?: (project: ReadyForCreditsProject) => void;
}

const mockComprehensiveData = {
  metadata: {
    submissionDate: '2023-12-05T14:30:00Z',
    lastUpdated: '2024-01-30T18:45:00Z',
    projectManager: 'Ramesh Patel',
    assignedExperts: ['Dr. Rajesh Kumar', 'Prof. Meera Patel', 'Dr. Arun Sharma'],
    priority: 'High',
    category: 'Blue Carbon Restoration'
  },
  panchayatUploads: [
    {
      id: 'PU-001',
      date: '2024-01-30',
      title: 'Monthly Progress Report - January',
      description: 'Comprehensive progress update with detailed measurements, survival rates, and photographic evidence',
      type: 'Monthly Report',
      photos: 12,
      documents: 4,
      videosCount: 2,
      gpsVerified: true,
      aiVerified: true,
      status: 'Approved'
    },
    {
      id: 'PU-002',
      date: '2024-01-26',
      title: 'Week 3 Field Update',
      description: 'Weekly monitoring report covering additional plantings and maintenance activities',
      type: 'Weekly Update',
      photos: 8,
      documents: 2,
      videosCount: 1,
      gpsVerified: true,
      aiVerified: true,
      status: 'Approved'
    },
    {
      id: 'PU-003',
      date: '2024-01-12',
      title: 'Initial Site Preparation',
      description: 'Documentation of site preparation activities and baseline measurements',
      type: 'Baseline Report',
      photos: 15,
      documents: 3,
      videosCount: 0,
      gpsVerified: true,
      aiVerified: true,
      status: 'Approved'
    },
    {
      id: 'PU-004',
      date: '2024-01-05',
      title: 'Community Training Session',
      description: 'Training documentation for local community members on restoration techniques',
      type: 'Training Report',
      photos: 6,
      documents: 2,
      videosCount: 1,
      gpsVerified: false,
      aiVerified: true,
      status: 'Under Review'
    }
  ],
  expertReviews: [
    {
      id: 'ER-001',
      expertName: 'Dr. Rajesh Kumar',
      specialty: 'Marine Biology',
      reportType: 'Ecological Assessment',
      submissionDate: '2024-01-28',
      reviewDate: '2024-01-29',
      score: 96,
      status: 'Approved',
      comments: 'Excellent restoration progress with high survival rates. Biodiversity indicators showing positive trends.',
      recommendationsCount: 3,
      flaggedIssues: 0
    },
    {
      id: 'ER-002',
      expertName: 'Prof. Meera Patel',
      specialty: 'Environmental Science',
      reportType: 'Soil & Water Quality Analysis',
      submissionDate: '2024-01-29',
      reviewDate: '2024-01-30',
      score: 94,
      status: 'Approved',
      comments: 'Water quality parameters within acceptable ranges. Minor recommendations for sediment monitoring.',
      recommendationsCount: 2,
      flaggedIssues: 1
    },
    {
      id: 'ER-003',
      expertName: 'Dr. Arun Sharma',
      specialty: 'Remote Sensing & GIS',
      reportType: 'Spatial Analysis & Mapping',
      submissionDate: '2024-01-29',
      reviewDate: '2024-01-30',
      score: 98,
      status: 'Approved',
      comments: 'Satellite imagery confirms significant vegetation increase. GIS analysis validates project boundaries.',
      recommendationsCount: 1,
      flaggedIssues: 0
    }
  ],
  droneGisData: {
    baseline: {
      date: '2023-12-10',
      flights: 4,
      coverage: '100%',
      resolution: '5cm/pixel',
      images: 247
    },
    latest: {
      date: '2024-01-30',
      flights: 3,
      coverage: '100%',
      resolution: '5cm/pixel',
      images: 198
    },
    changes: {
      vegetationIncrease: 18.4,
      waterCoverageChange: 2.1,
      areaExpansion: 5.2,
      integrityScore: 98.3
    },
    gisLayers: [
      { name: 'Vegetation Cover', status: 'Updated', lastUpdate: '2024-01-30' },
      { name: 'Water Bodies', status: 'Updated', lastUpdate: '2024-01-30' },
      { name: 'Restoration Zones', status: 'Updated', lastUpdate: '2024-01-29' },
      { name: 'Infrastructure', status: 'Updated', lastUpdate: '2024-01-28' }
    ]
  },
  complianceTests: [
    {
      id: 'CT-001',
      testName: 'Photo Authenticity Verification',
      category: 'Image Analysis',
      result: 'Passed',
      confidence: 98.2,
      timestamp: '2024-01-30T10:15:30Z',
      details: 'All uploaded photos verified as authentic with no signs of manipulation'
    },
    {
      id: 'CT-002',
      testName: 'GPS Metadata Validation',
      category: 'Location Verification',
      result: 'Passed',
      confidence: 96.7,
      timestamp: '2024-01-30T10:16:45Z',
      details: 'GPS coordinates verified and consistent with project boundaries'
    },
    {
      id: 'CT-003',
      testName: 'Document Integrity Check',
      category: 'Document Analysis',
      result: 'Passed',
      confidence: 94.8,
      timestamp: '2024-01-30T10:17:12Z',
      details: 'No tampering detected in submitted documents'
    },
    {
      id: 'CT-004',
      testName: 'Timeline Consistency Analysis',
      category: 'Temporal Verification',
      result: 'Passed',
      confidence: 97.3,
      timestamp: '2024-01-30T10:18:00Z',
      details: 'Project timeline and milestones verified as consistent'
    },
    {
      id: 'CT-005',
      testName: 'Cross-Reference Validation',
      category: 'Data Verification',
      result: 'Passed',
      confidence: 95.1,
      timestamp: '2024-01-30T10:19:22Z',
      details: 'All data points cross-referenced and validated'
    }
  ]
};

const ecosystemConfig = {
  'Mangrove': { color: 'bg-emerald-100 text-emerald-800', icon: Leaf },
  'Seagrass': { color: 'bg-teal-100 text-teal-800', icon: Leaf },
  'Salt Marsh': { color: 'bg-cyan-100 text-cyan-800', icon: Leaf },
  'Coral Reef': { color: 'bg-rose-100 text-rose-800', icon: Leaf },
  'Estuary': { color: 'bg-indigo-100 text-indigo-800', icon: Leaf }
};

const statusConfig = {
  'Active': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'Retired': { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  'Transferred': { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' }
};

export function ComprehensiveProjectDetail({
  project,
  open,
  onOpenChange,
  onGenerateCredits
}: ProjectDetailProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [generatingCredits, setGeneratingCredits] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const EcosystemIcon = ecosystemConfig[project.ecosystemType].icon;
  const isReadyProject = project.type === 'ready';
  const isIssuedProject = project.type === 'issued';

  const generationSteps = [
    'Validating project data...',
    'Creating blockchain record...',
    'Generating certificate...',
    'Finalizing issuance...'
  ];

  const handleGenerateClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmGenerate = async () => {
    setShowConfirmDialog(false);
    setGeneratingCredits(true);
    setCurrentStep(0);

    // Simulate step-by-step progress
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setGeneratingCredits(false);
    setShowSuccessDialog(true);
    
    if (onGenerateCredits && isReadyProject) {
      onGenerateCredits(project as ReadyForCreditsProject);
    }
  };

  const handleViewCarbonCredit = () => {
    setShowSuccessDialog(false);
    if (onGenerateCredits && isReadyProject) {
      onGenerateCredits(project as ReadyForCreditsProject);
    }
  };

  const getCreditsAmount = () => {
    return isReadyProject ? (project as ReadyForCreditsProject).estimatedCredits : (project as IssuedCertificate).creditsGenerated;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 gap-0 flex flex-col">
          {/* Fixed Header */}
          <DialogHeader className="p-6 pb-4 border-b bg-white shrink-0">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              {isReadyProject ? 'Ready for Carbon Credits' : 'Issued Certificate'} - Project Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {project.projectId} • Comprehensive project information and verification data
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 modal-scrollbar">
              <div className="p-6 space-y-4">
                
                {/* Project Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Basic Information Card */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Project Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Project ID</p>
                        <p className="text-sm font-medium break-words">{project.projectId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Panchayat</p>
                        <p className="text-sm font-medium break-words">{project.panchayat}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">NGO Partner</p>
                        <p className="text-sm font-medium break-words">{project.ngo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-sm font-medium break-words">{project.location}, {project.state}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ecosystem Details Card */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <EcosystemIcon className="w-4 h-4 text-green-600" />
                        Ecosystem Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <Badge 
                        variant="outline" 
                        className={`${ecosystemConfig[project.ecosystemType].color} w-fit`}
                      >
                        <EcosystemIcon className="w-3 h-3 mr-1" />
                        {project.ecosystemType}
                      </Badge>
                      <div>
                        <p className="text-sm text-gray-600">Area Restored</p>
                        <p className="text-sm font-medium">{project.hectaresRestored.toFixed(1)} hectares</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="text-sm font-medium">{mockComprehensiveData.metadata.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Priority</p>
                        <Badge className="bg-orange-100 text-orange-800">
                          {mockComprehensiveData.metadata.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Metadata Card */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Database className="w-4 h-4 text-purple-600" />
                        Project Metadata
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Submission Date</p>
                        <p className="text-sm font-medium">
                          {new Date(mockComprehensiveData.metadata.submissionDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="text-sm font-medium">
                          {new Date(mockComprehensiveData.metadata.lastUpdated).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Project Manager</p>
                        <p className="text-sm font-medium">{mockComprehensiveData.metadata.projectManager}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Experts Assigned</p>
                        <p className="text-sm font-medium">{mockComprehensiveData.metadata.assignedExperts.length}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Credits Summary Card */}
                  <Card className="p-4 rounded-xl shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        {isReadyProject ? 'Estimated Credits' : 'Generated Credits'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {getCreditsAmount().toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">tCO2e Credits</div>
                      {isReadyProject ? (
                        <div className="text-xs text-gray-600 mt-1">Ready for generation</div>
                      ) : (
                        <div className="space-y-1 mt-2">
                          <Badge className={statusConfig[(project as IssuedCertificate).status].color}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[(project as IssuedCertificate).status].dot}`} />
                            {(project as IssuedCertificate).status}
                          </Badge>
                          <div className="text-xs text-gray-600">
                            Issued: {new Date((project as IssuedCertificate).dateIssued).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Panchayat Uploads */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Panchayat Uploads ({mockComprehensiveData.panchayatUploads.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="max-h-80 overflow-y-auto modal-scrollbar space-y-3">
                        {mockComprehensiveData.panchayatUploads.map((upload) => (
                          <div key={upload.id} className="border rounded-lg p-3 space-y-3 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium leading-tight break-words mb-1">
                                  {upload.title}
                                </h4>
                                <Badge variant="outline" className="text-xs mb-1">
                                  {upload.type}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 whitespace-nowrap">
                                {new Date(upload.date).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-600 break-words leading-relaxed">
                              {upload.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                  <Camera className="w-3 h-3" />
                                  {upload.photos}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {upload.documents}
                                </span>
                                {upload.videosCount > 0 && (
                                  <span className="flex items-center gap-1">
                                    <PlayCircle className="w-3 h-3" />
                                    {upload.videosCount}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {upload.gpsVerified && (
                                  <MapPin className="w-3 h-3 text-green-600" />
                                )}
                                {upload.aiVerified && (
                                  <Zap className="w-3 h-3 text-blue-600" />
                                )}
                                <Badge className={upload.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {upload.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Camera className="w-4 h-4 mr-2" />
                          View Photos
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Documents
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expert Reviews */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        Expert Reviews ({mockComprehensiveData.expertReviews.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="max-h-80 overflow-y-auto modal-scrollbar space-y-3">
                        {mockComprehensiveData.expertReviews.map((review) => (
                          <div key={review.id} className="border rounded-lg p-3 space-y-3 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium leading-tight break-words">
                                  {review.expertName}
                                </h4>
                                <p className="text-xs text-gray-600">{review.specialty}</p>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {review.reportType}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <Badge className={review.status === 'Approved' ? 
                                  'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {review.status}
                                </Badge>
                                <div className="text-xs font-medium text-primary mt-1">
                                  {review.score}%
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-600 break-words leading-relaxed">
                              {review.comments}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-4">
                                <span>Review: {new Date(review.reviewDate).toLocaleDateString('en-IN')}</span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {review.recommendationsCount} recommendations
                                </span>
                              </div>
                              {review.flaggedIssues > 0 && (
                                <Badge className="bg-orange-100 text-orange-800">
                                  {review.flaggedIssues} issues
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Secondary Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Drone & GIS Data */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Satellite className="w-5 h-5 text-green-600" />
                        Drone & GIS Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      
                      {/* Visual Preview */}
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <Satellite className="w-12 h-12 text-green-600" />
                        <div className="absolute top-2 left-2 right-2">
                          <div className="bg-white/90 p-2 rounded text-xs space-y-1">
                            <p className="font-medium">Latest Survey: {mockComprehensiveData.droneGisData.latest.date}</p>
                            <p className="text-green-600">
                              +{mockComprehensiveData.droneGisData.changes.vegetationIncrease}% vegetation
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-green-100 text-green-800">
                            {mockComprehensiveData.droneGisData.changes.integrityScore}% integrity
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Survey Data */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Baseline</p>
                          <p className="text-sm font-medium">{mockComprehensiveData.droneGisData.baseline.date}</p>
                          <p className="text-xs text-gray-600">{mockComprehensiveData.droneGisData.baseline.images} images</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Latest</p>
                          <p className="text-sm font-medium">{mockComprehensiveData.droneGisData.latest.date}</p>
                          <p className="text-xs text-gray-600">{mockComprehensiveData.droneGisData.latest.images} images</p>
                        </div>
                      </div>

                      {/* GIS Layers */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">GIS Layers</p>
                        <div className="max-h-32 overflow-y-auto modal-scrollbar space-y-1">
                          {mockComprehensiveData.droneGisData.gisLayers.map((layer, index) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 rounded p-2">
                              <span className="font-medium break-words">{layer.name}</span>
                              <Badge className="bg-blue-100 text-blue-800 whitespace-nowrap">
                                {layer.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        <Satellite className="w-4 h-4 mr-2" />
                        View Interactive Map
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Compliance & Verification Tests */}
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Compliance & Verification Tests
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="max-h-80 overflow-y-auto modal-scrollbar space-y-3">
                        {mockComprehensiveData.complianceTests.map((test) => (
                          <div key={test.id} className="border rounded-lg p-3 space-y-2 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium leading-tight break-words">
                                  {test.testName}
                                </h4>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {test.category}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-800">
                                  {test.result}
                                </Badge>
                                <div className="text-xs font-medium text-green-600 mt-1">
                                  {test.confidence.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-600 break-words leading-relaxed">
                              {test.details}
                            </p>
                            
                            <div className="text-xs text-gray-500">
                              Verified: {new Date(test.timestamp).toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">All tests passed</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          Project meets all compliance requirements for carbon credit generation
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Certificate Information for Issued Projects */}
                {isIssuedProject && (
                  <Card className="p-4 rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Hash className="w-5 h-5 text-primary" />
                        Certificate Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Certificate ID</p>
                          <p className="text-sm font-medium break-all">{(project as IssuedCertificate).certificateId}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Blockchain Hash</p>
                          <p className="text-xs font-mono break-all">{(project as IssuedCertificate).blockchainHash.slice(0, 20)}...</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Vintage</p>
                          <p className="text-sm font-medium">{(project as IssuedCertificate).vintage}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">Methodology</p>
                          <p className="text-xs font-medium break-words">{(project as IssuedCertificate).methodology}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>

            {/* Fixed Bottom Action Bar - Only for Ready Projects */}
            {isReadyProject && (
              <div className="p-4 border-t bg-white shrink-0">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Project verified and ready for carbon credit generation
                  </div>
                  <Button 
                    onClick={handleGenerateClick}
                    className="bg-primary hover:bg-primary/90"
                    disabled={generatingCredits}
                  >
                    {generatingCredits ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Generate Carbon Credits
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate Carbon Credits</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to generate carbon credits for this project? This action will:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Create blockchain records for {getCreditsAmount().toLocaleString()} tCO2e credits</li>
                <li>Generate an official certificate</li>
                <li>Move the project to "Issued Certificates"</li>
                <li>Make the credits available for trading</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmGenerate}>
              Yes, Generate Credits
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Generation Progress Dialog */}
      <Dialog open={generatingCredits} onOpenChange={() => {}}>
        <DialogContent className="max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Generating Carbon Credits
            </DialogTitle>
            <DialogDescription>
              Please wait while we process your carbon credit generation...
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {generationSteps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index === currentStep ? 'bg-primary/10 border border-primary/20' :
                  index < currentStep ? 'bg-green-50 border border-green-200' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : index === currentStep ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-400" />
                )}
                <span className={`text-sm ${
                  index === currentStep ? 'font-medium text-primary' :
                  index < currentStep ? 'text-green-600' :
                  'text-gray-600'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Progress value={(currentStep / generationSteps.length) * 100} className="w-full" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-semibold text-center">
              ✅ Carbon Credits Successfully Generated
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              Verified Carbon Credit Project
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 text-center space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {getCreditsAmount().toLocaleString()}
              </div>
              <div className="text-sm text-green-700">
                tCO2e Carbon Credits Generated
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Your carbon credits have been successfully generated and recorded on the blockchain. 
              The certificate is now available and the credits can be traded.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button onClick={handleViewCarbonCredit} className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              See Carbon Credit Details
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
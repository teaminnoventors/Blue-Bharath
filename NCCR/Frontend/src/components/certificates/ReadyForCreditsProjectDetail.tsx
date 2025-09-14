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
  AlertCircle
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

interface ReadyForCreditsProject {
  id: string;
  projectId: string;
  panchayat: string;
  ngo: string;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Salt Marsh' | 'Coral Reef' | 'Estuary';
  hectaresRestored: number;
  estimatedCredits: number;
  verificationCompletedOn: string;
  location: string;
  state: string;
  complianceScore: number;
}

interface ProjectDetailProps {
  project: ReadyForCreditsProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateCredits: (project: ReadyForCreditsProject) => void;
  generatingCredits: boolean;
  generationSuccess: boolean;
}

const mockProjectData = {
  panchayatUploads: [
    {
      date: '2024-01-30',
      title: 'Monthly Progress Report',
      description: 'Comprehensive update with photos and measurements',
      photos: 8,
      documents: 3,
      gpsVerified: true
    },
    {
      date: '2024-01-26',
      title: 'Week 3 Update',
      description: 'Additional plantings completed, survival rate monitoring',
      photos: 5,
      documents: 1,
      gpsVerified: true
    },
    {
      date: '2024-01-12',
      title: 'Week 1 Update',
      description: 'Initial planting progress and site preparation',
      photos: 6,
      documents: 2,
      gpsVerified: true
    }
  ],
  gisData: {
    baselineDate: '2023-12-10',
    latestDate: '2024-01-30',
    vegetationIncrease: 18,
    waterCoverageChange: 2,
    integrityScore: 98
  },
  expertReports: [
    {
      expertName: 'Dr. Rajesh Kumar',
      reportType: 'Marine Biology Assessment',
      date: '2024-01-28',
      score: 96,
      status: 'Approved'
    },
    {
      expertName: 'Prof. Meera Patel',
      reportType: 'Soil & Water Quality Analysis',
      date: '2024-01-29',
      score: 94,
      status: 'Approved'
    },
    {
      expertName: 'Dr. Arun Sharma',
      reportType: 'Drone Survey & GIS Mapping',
      date: '2024-01-29',
      score: 98,
      status: 'Approved'
    }
  ],
  aiVerificationLogs: [
    {
      test: 'Photo Authenticity Check',
      result: 'Passed',
      confidence: 98,
      timestamp: '2024-01-30T10:15:00Z'
    },
    {
      test: 'GPS Metadata Validation',
      result: 'Passed',
      confidence: 96,
      timestamp: '2024-01-30T10:16:00Z'
    },
    {
      test: 'Document Tampering Detection',
      result: 'Passed',
      confidence: 94,
      timestamp: '2024-01-30T10:17:00Z'
    },
    {
      test: 'Timeline Consistency Check',
      result: 'Passed',
      confidence: 97,
      timestamp: '2024-01-30T10:18:00Z'
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

export function ReadyForCreditsProjectDetail({
  project,
  open,
  onOpenChange,
  onGenerateCredits,
  generatingCredits,
  generationSuccess
}: ProjectDetailProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const EcosystemIcon = ecosystemConfig[project.ecosystemType].icon;

  const generationSteps = [
    'Validating project data...',
    'Creating blockchain record...',
    'Generating certificate...',
    'Finalizing issuance...'
  ];

  const handleGenerateClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmGenerate = () => {
    setShowConfirmDialog(false);
    onGenerateCredits(project);
    
    // Show success alert after generation
    setTimeout(() => {
      setShowSuccessAlert(true);
    }, 3000);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    onOpenChange(false);
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 gap-0 flex flex-col">
          {/* Fixed Header */}
          <DialogHeader className="p-6 pb-4 border-b bg-white shrink-0">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Project Detail - Ready for Carbon Credits
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {project.projectId} • Final review before certificate generation
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 modal-scrollbar">
              <div className="p-6 space-y-6">
                {/* Project Overview Card */}
                <Card className="rounded-xl shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium">Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Project Details */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Project Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Panchayat</p>
                            <div className="text-sm font-medium max-w-full">
                              <span className="block truncate" title={project.panchayat}>
                                {project.panchayat}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">NGO Partner</p>
                            <div className="text-sm font-medium max-w-full">
                              <span className="block truncate" title={project.ngo}>
                                {project.ngo}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <div className="text-sm font-medium max-w-full">
                              <span className="block truncate" title={project.location}>
                                {project.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ecosystem Details */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                          <EcosystemIcon className="w-4 h-4 text-green-600" />
                          Ecosystem
                        </h4>
                        <div className="space-y-3">
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
                            <p className="text-sm text-gray-600">Est. Credits</p>
                            <p className="text-sm font-medium text-primary">
                              {project.estimatedCredits.toLocaleString()} tCO2e
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Verification Status */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          Verification
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Compliance Score</p>
                            <p className={`text-sm font-medium ${getComplianceColor(project.complianceScore)}`}>
                              {project.complianceScore}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Completed On</p>
                            <p className="text-sm font-medium">
                              {new Date(project.verificationCompletedOn).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            All Checks Passed
                          </Badge>
                        </div>
                      </div>

                      {/* Credit Summary */}
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                        <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          Credits
                        </h4>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {project.estimatedCredits.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">tCO2e Credits</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Ready for generation
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Panchayat Uploads */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Panchayat Uploads
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="max-h-64 overflow-y-auto modal-scrollbar space-y-3">
                        {mockProjectData.panchayatUploads.map((upload, index) => (
                          <div key={index} className="border rounded-lg p-3 space-y-2 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-medium leading-tight break-words">
                                {upload.title}
                              </h4>
                              <div className="text-xs text-gray-600 whitespace-nowrap">
                                {new Date(upload.date).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 break-words">{upload.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-xs">
                                <span className="flex items-center gap-1">
                                  <Camera className="w-3 h-3" />
                                  {upload.photos}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {upload.documents}
                                </span>
                              </div>
                              {upload.gpsVerified && (
                                <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Camera className="w-4 h-4 mr-2" />
                        View All Photos
                      </Button>
                    </CardContent>
                  </Card>

                  {/* GIS & Satellite Data */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Satellite className="w-5 h-5 text-green-600" />
                        GIS & Satellite Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div className="space-y-3">
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <Satellite className="w-8 h-8 text-green-600" />
                          <div className="absolute top-2 left-2 right-2">
                            <div className="bg-white/90 p-2 rounded text-xs">
                              <p className="truncate">Latest: {mockProjectData.gisData.latestDate}</p>
                              <p className="text-green-600 truncate">
                                +{mockProjectData.gisData.vegetationIncrease}% vegetation
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Baseline</p>
                            <p className="text-sm font-medium truncate">
                              {mockProjectData.gisData.baselineDate}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Integrity</p>
                            <p className="text-sm font-medium text-green-600">
                              {mockProjectData.gisData.integrityScore}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        <Satellite className="w-4 h-4 mr-2" />
                        View Map Comparison
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Expert Reviews */}
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        Expert Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="max-h-64 overflow-y-auto modal-scrollbar space-y-3">
                        {mockProjectData.expertReports.map((report, index) => (
                          <div key={index} className="border rounded-lg p-3 space-y-2 bg-gray-50">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-medium leading-tight break-words">
                                {report.expertName}
                              </h4>
                              <Badge className="bg-green-100 text-green-800 text-xs whitespace-nowrap">
                                {report.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 break-words">{report.reportType}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">
                                {new Date(report.date).toLocaleDateString('en-IN')}
                              </span>
                              <span className="text-xs font-medium text-purple-600">
                                Score: {report.score}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Download className="w-4 h-4 mr-2" />
                        Download Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Verification Logs */}
                <Card className="rounded-xl shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      AI Verification Logs - No Tampering Detected ✅
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockProjectData.aiVerificationLogs.map((log, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium break-words">{log.test}</h4>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-green-600 font-medium text-sm whitespace-nowrap">
                                {log.result}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Confidence: {log.confidence}%</span>
                            <span className="truncate ml-2">
                              {new Date(log.timestamp).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Generation Progress */}
                {generatingCredits && (
                  <Card className="rounded-xl shadow-sm border-blue-200 bg-blue-50/50">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Activity className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-blue-800 mb-2">
                            Generating Carbon Credits...
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Please wait while we process your certificate generation
                          </p>
                          
                          <div className="max-w-md mx-auto space-y-3">
                            {generationSteps.map((step, index) => (
                              <div key={index} className="flex items-center gap-3 text-sm">
                                {index < currentStep ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                ) : index === currentStep ? (
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                                )}
                                <span className={`break-words ${index <= currentStep ? 'text-foreground' : 'text-gray-600'}`}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Bottom padding for fixed button */}
                <div className="h-20"></div>
              </div>
            </ScrollArea>
          </div>

          {/* Fixed Bottom Action Area */}
          {!generatingCredits && !generationSuccess && (
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between max-w-full">
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-primary">{project.estimatedCredits.toLocaleString()}</div>
                    <div className="text-gray-600">Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{project.hectaresRestored.toFixed(1)}</div>
                    <div className="text-gray-600">Hectares</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{project.complianceScore}%</div>
                    <div className="text-gray-600">Score</div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerateClick}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Generate Carbon Credit Certificate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              Confirm Certificate Generation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600">
              Are you sure you want to generate carbon credit certificate for project {project.projectId}? 
              This action will create {project.estimatedCredits.toLocaleString()} carbon credits and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmGenerate}
              className="bg-primary hover:bg-primary/90"
            >
              <Award className="w-4 h-4 mr-2" />
              Generate Certificate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Alert - Stays Visible Until Manually Closed */}
      <Dialog open={showSuccessAlert} onOpenChange={() => {}}>
        <DialogContent className="max-w-md rounded-xl">
          <div className="absolute right-4 top-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleCloseSuccessAlert}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center space-y-4 pt-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Verified Carbon Credit Project
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Carbon credits have been successfully generated and the certificate is ready.
              </p>
              
              <div className="bg-gray-50 border rounded-lg p-4 text-left mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project ID:</span>
                    <span className="font-mono">{project.projectId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate ID:</span>
                    <span className="font-mono">NCCR-CERT-2024-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credits Generated:</span>
                    <span className="font-bold text-primary">{project.estimatedCredits.toLocaleString()} tCO2e</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCloseSuccessAlert}
              className="w-full bg-primary hover:bg-primary/90"
            >
              See Carbon Credit Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
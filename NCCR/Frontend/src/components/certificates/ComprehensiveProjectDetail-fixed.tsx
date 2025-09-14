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
    }
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

          {/* Content with Generate Button */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <EcosystemIcon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm text-gray-600">Ecosystem</p>
                        <p className="font-semibold">{project.ecosystemType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Area Restored</p>
                        <p className="font-semibold">{project.hectaresRestored.toFixed(1)} ha</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm text-gray-600">Credits</p>
                        <p className="font-semibold">{getCreditsAmount().toLocaleString()} tCO₂e</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Generate Credits Button */}
              {isReadyProject && (
                <div className="flex justify-center">
                  <Button 
                    onClick={handleGenerateClick}
                    className="bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    Generate Carbon Credits
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate Carbon Credits</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to generate carbon credits for project {project.projectId}? 
              This will create {getCreditsAmount().toLocaleString()} tCO₂e credits and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmGenerate}>
              Generate Credits
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Progress Dialog */}
      <Dialog open={generatingCredits} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Generating Carbon Credits</DialogTitle>
            <DialogDescription>
              Progress dialog showing the current step of carbon credit generation process
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Generating Carbon Credits</h3>
            <p className="text-center text-gray-600 mb-4">
              {generationSteps[currentStep]}
            </p>
            <Progress value={((currentStep + 1) / generationSteps.length) * 100} className="w-full" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Carbon Credits Successfully Generated</DialogTitle>
            <DialogDescription>
              Success confirmation dialog showing that carbon credits have been generated for the project
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Carbon Credits Successfully Generated!</h3>
            <p className="text-center text-gray-600 mb-6">
              {getCreditsAmount().toLocaleString()} tCO₂e credits have been successfully generated for project {project.projectId}.
              The certificate is now ready for download and distribution.
            </p>
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                onClick={() => setShowSuccessDialog(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button 
                onClick={handleViewCarbonCredit}
                className="flex-1"
              >
                See Carbon Credit Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
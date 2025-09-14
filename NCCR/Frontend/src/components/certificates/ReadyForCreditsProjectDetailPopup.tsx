import React, { useState } from 'react';
import {
  Activity,
  Award,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Leaf,
  MapPin,
  Users,
  Loader2,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { VisuallyHidden } from '../ui/visually-hidden';
import { toast } from 'sonner@2.0.3';

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

interface ReadyForCreditsProjectDetailPopupProps {
  project: ReadyForCreditsProject;
  isOpen: boolean;
  onClose: () => void;
  onGenerateCredits: (project: ReadyForCreditsProject) => void;
}

const ecosystemCreditFactors = {
  'Mangrove': 10,
  'Seagrass': 5,
  'Salt Marsh': 8,
  'Coral Reef': 3.5,
  'Estuary': 7.5
};

const ecosystemConfig = {
  'Mangrove': { color: 'bg-emerald-100 text-emerald-800', icon: Leaf },
  'Seagrass': { color: 'bg-teal-100 text-teal-800', icon: Leaf },
  'Salt Marsh': { color: 'bg-cyan-100 text-cyan-800', icon: Leaf },
  'Coral Reef': { color: 'bg-rose-100 text-rose-800', icon: Leaf },
  'Estuary': { color: 'bg-indigo-100 text-indigo-800', icon: Leaf }
};

const timelineSteps = [
  { step: 'Panchayat Request', status: 'completed', date: '2023-12-15' },
  { step: 'NCCR Review', status: 'completed', date: '2023-12-22' },
  { step: 'NGO Collaboration', status: 'completed', date: '2024-01-05' },
  { step: 'Expert Verification', status: 'completed', date: '2024-01-20' },
  { step: 'Compliance Tests Passed', status: 'completed', date: '2024-01-28' },
  { step: 'Ready for Carbon Credits', status: 'current', date: 'Current' }
];

const complianceTests = [
  { name: 'GIS Match', status: 'passed' },
  { name: 'Drone Validation', status: 'passed' },
  { name: 'Expert Review', status: 'passed' },
  { name: 'Environmental Impact', status: 'passed' },
  { name: 'Community Verification', status: 'passed' },
  { name: 'Data Integrity Check', status: 'passed' }
];

// Mock data for comprehensive project details
const mockProjectPhotos = [
  { id: 1, title: 'Before Restoration', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', date: '2023-12-10' },
  { id: 2, title: 'Planting Phase 1', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', date: '2024-01-15' },
  { id: 3, title: 'Growth Progress', url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400', date: '2024-02-20' },
  { id: 4, title: 'Current State', url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400', date: '2024-03-01' }
];

const mockReports = [
  { id: 1, title: 'Environmental Impact Assessment', type: 'PDF', size: '2.4 MB', date: '2023-12-15' },
  { id: 2, title: 'Community Engagement Report', type: 'PDF', size: '1.8 MB', date: '2024-01-10' },
  { id: 3, title: 'Biodiversity Survey', type: 'PDF', size: '3.2 MB', date: '2024-02-05' },
  { id: 4, title: 'Progress Monitoring Report', type: 'PDF', size: '2.1 MB', date: '2024-02-28' }
];

const mockDroneData = [
  { id: 1, title: 'Site Mapping - Phase 1', type: 'Aerial Survey', date: '2024-01-20', coverage: '85%' },
  { id: 2, title: 'Growth Monitoring', type: 'Vegetation Analysis', date: '2024-02-15', coverage: '92%' },
  { id: 3, title: 'Final Assessment', type: 'Comprehensive Scan', date: '2024-03-01', coverage: '98%' }
];

const mockGISMaps = [
  { id: 1, title: 'Land Use Classification', type: 'Satellite Data', date: '2024-01-05', accuracy: '96%' },
  { id: 2, title: 'Vegetation Index Map', type: 'NDVI Analysis', date: '2024-02-10', accuracy: '94%' },
  { id: 3, title: 'Carbon Stock Assessment', type: 'Biomass Map', date: '2024-02-25', accuracy: '97%' }
];

const mockExpertReviews = [
  { id: 1, expert: 'Dr. Priya Sharma', role: 'Marine Ecologist', rating: 9.2, date: '2024-01-25', comment: 'Excellent restoration progress with high survival rates.' },
  { id: 2, expert: 'Prof. Rajesh Kumar', role: 'GIS Specialist', rating: 9.5, date: '2024-02-12', comment: 'Spatial analysis confirms accurate project boundaries and growth patterns.' },
  { id: 3, expert: 'Dr. Meera Nair', role: 'Environmental Scientist', rating: 9.0, date: '2024-02-28', comment: 'Strong environmental compliance and community engagement.' }
];

export function ReadyForCreditsProjectDetailPopup({
  project,
  isOpen,
  onClose,
  onGenerateCredits
}: ReadyForCreditsProjectDetailPopupProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const EcosystemIcon = ecosystemConfig[project.ecosystemType].icon;
  const carbonSequestrationRate = ecosystemCreditFactors[project.ecosystemType];
  const estimatedCredits = Math.round(project.hectaresRestored * carbonSequestrationRate);

  const getProgressValue = () => {
    const completedSteps = timelineSteps.filter(step => step.status === 'completed').length;
    return (completedSteps / timelineSteps.length) * 100;
  };

  const handleGenerateCredits = async () => {
    setIsGenerating(true);
    
    // Show loading for 3 seconds
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      
      // Show success for 2 seconds then trigger callback
      setTimeout(() => {
        setShowSuccess(false);
        onGenerateCredits(project);
      }, 2000);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-gradient-to-br from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Carbon Credits Generated Successfully</DialogTitle>
              <DialogDescription>
                Carbon credits have been successfully generated for the restoration project
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Successfully Created {estimatedCredits} Carbon Credits</h3>
            <p className="text-blue-100 mb-6">
              for this Project
            </p>
            <Button 
              className="w-full bg-white text-blue-900 hover:bg-white/90"
              onClick={() => {
                setShowSuccess(false);
                onGenerateCredits(project);
              }}
            >
              See Carbon Credit Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-gradient-to-br from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)]">
        <DialogHeader className="text-white">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Award className="w-5 h-5" />
            Project Ready for Carbon Credit Generation
          </DialogTitle>
          <DialogDescription className="text-blue-100">
            Review comprehensive project details and generate carbon credits for verified restoration project
          </DialogDescription>
        </DialogHeader>

        <div className="modal-scrollbar overflow-y-auto max-h-[calc(90vh-140px)] space-y-6 pb-6">
          {/* Project Header */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{project.projectId}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Project submitted on 15th December 2023
                  </p>
                </div>
                <Badge className={ecosystemConfig[project.ecosystemType].color}>
                  <EcosystemIcon className="w-3 h-3 mr-1" />
                  {project.ecosystemType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium break-words">{project.panchayat}</p>
                    <p className="text-xs text-muted-foreground">Applied: 15 Dec 2023, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium break-words">{project.ngo}</p>
                    <p className="text-xs text-muted-foreground">Collaboration Started: 22 Dec 2023</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium break-words">{project.location}</p>
                    <p className="text-xs text-muted-foreground">{project.state}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Progress */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Project Timeline & Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(getProgressValue())}% Complete</span>
                </div>
                <Progress value={getProgressValue()} className="h-3" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : step.status === 'current' ? (
                        <Clock className="w-4 h-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{step.step}</p>
                        <p className="text-xs text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos & Documentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Project Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="modal-scrollbar overflow-y-auto max-h-64 space-y-3">
                  {mockProjectPhotos.map((photo) => (
                    <div key={photo.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                      <img src={photo.url} alt={photo.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium break-words">{photo.title}</p>
                        <p className="text-xs text-muted-foreground">{photo.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Reports & Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="modal-scrollbar overflow-y-auto max-h-64 space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium break-words">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.type} • {report.size} • {report.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expert Reviews & Technical Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Expert Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                  {mockExpertReviews.map((review) => (
                    <div key={review.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium break-words">{review.expert}</p>
                          <p className="text-xs text-muted-foreground">{review.role}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {review.rating}/10
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground break-words">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Technical Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Drone Surveys</h4>
                    {mockDroneData.map((drone) => (
                      <div key={drone.id} className="text-xs p-2 bg-gray-50 rounded mb-2">
                        <p className="font-medium break-words">{drone.title}</p>
                        <p className="text-muted-foreground">{drone.type} • {drone.date} • Coverage: {drone.coverage}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">GIS Analysis</h4>
                    {mockGISMaps.map((gis) => (
                      <div key={gis.id} className="text-xs p-2 bg-gray-50 rounded mb-2">
                        <p className="font-medium break-words">{gis.title}</p>
                        <p className="text-muted-foreground">{gis.type} • {gis.date} • Accuracy: {gis.accuracy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Tests */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Compliance Tests Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {complianceTests.map((test, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{test.name}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      ✅
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carbon Credit Calculation */}
          <Card className="bg-white/95 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Leaf className="w-4 h-4" />
                Carbon Credit Calculation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">
                    {project.hectaresRestored.toFixed(1)}
                  </div>
                  <p className="text-sm text-blue-700">Hectares Restored</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    {carbonSequestrationRate}
                  </div>
                  <p className="text-sm text-green-700">tCO₂e/ha/year</p>
                  <p className="text-xs text-green-600">Carbon Sequestration Rate</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-900">
                    {estimatedCredits.toLocaleString()}
                  </div>
                  <p className="text-sm text-yellow-700">Estimated Credits</p>
                  <p className="text-xs text-yellow-600">tCO₂e for this project</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Carbon Credits Button - Now inside scrollable content */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleGenerateCredits}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Carbon Credits...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Generate Carbon Credits
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
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
  Download,
  Share2,
  Printer,
  Clock,
  Leaf,
  X,
  ExternalLink,
  Hash,
  Activity,
  Eye,
  TrendingUp
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
import { toast } from 'sonner@2.0.3';

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

interface CarbonCreditCertificateProps {
  project: ProjectData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Ecosystem carbon sequestration rates (tCO2e per hectare per year)
const ecosystemRates = {
  'Mangrove': 10,
  'Seagrass': 5,
  'Salt Marsh': 8,
  'Coral Reef': 3,
  'Estuary': 7
};

const ecosystemConfig = {
  'Mangrove': { color: 'bg-emerald-100 text-emerald-800', icon: Leaf },
  'Seagrass': { color: 'bg-teal-100 text-teal-800', icon: Leaf },
  'Salt Marsh': { color: 'bg-cyan-100 text-cyan-800', icon: Leaf },
  'Coral Reef': { color: 'bg-rose-100 text-rose-800', icon: Leaf },
  'Estuary': { color: 'bg-indigo-100 text-indigo-800', icon: Leaf }
};

const mockCertificateData = {
  projectName: 'Kannur Mangrove Restoration Initiative',
  timeline: [
    { step: 'Project Submission', status: 'completed', date: '2023-12-05' },
    { step: 'Initial Verification', status: 'completed', date: '2023-12-15' },
    { step: 'Expert Review', status: 'completed', date: '2024-01-10' },
    { step: 'Compliance Check', status: 'completed', date: '2024-01-25' },
    { step: 'Credits Issued', status: 'completed', date: '2024-01-30' }
  ],
  supportingFiles: {
    panchayatReports: [
      { id: 1, title: 'Monthly Progress Report - January', type: 'report', date: '2024-01-30', photos: 12, verified: true },
      { id: 2, title: 'Site Preparation Documentation', type: 'baseline', date: '2024-01-12', photos: 15, verified: true },
      { id: 3, title: 'Community Training Records', type: 'training', date: '2024-01-05', photos: 6, verified: true }
    ],
    expertReports: [
      { id: 1, expert: 'Dr. Rajesh Kumar', specialty: 'Marine Biology', score: 96, status: 'Approved' },
      { id: 2, expert: 'Prof. Meera Patel', specialty: 'Environmental Science', score: 94, status: 'Approved' },
      { id: 3, expert: 'Dr. Arun Sharma', specialty: 'Remote Sensing & GIS', score: 98, status: 'Approved' }
    ],
    droneData: {
      baselineDate: '2023-12-10',
      latestDate: '2024-01-30',
      totalFlights: 7,
      totalImages: 445,
      vegetationIncrease: 18.4,
      areaAnalyzed: '100%'
    },
    gisData: {
      layers: ['Vegetation Cover', 'Water Bodies', 'Restoration Zones', 'Infrastructure'],
      lastUpdated: '2024-01-30',
      accuracy: '98.3%'
    }
  }
};

export function CarbonCreditCertificate({
  project,
  open,
  onOpenChange
}: CarbonCreditCertificateProps) {
  const EcosystemIcon = ecosystemConfig[project.ecosystemType].icon;
  const isIssuedProject = project.type === 'issued';
  
  // Calculate carbon sequestration based on ecosystem type
  const carbonSequestrationRate = ecosystemRates[project.ecosystemType];
  const calculatedCredits = Math.round(project.hectaresRestored * carbonSequestrationRate);
  const actualCredits = isIssuedProject ? (project as IssuedCertificate).creditsGenerated : (project as ReadyForCreditsProject).estimatedCredits;

  const handleDownloadCertificate = () => {
    toast.success('Certificate PDF downloaded successfully');
  };

  const handleShareCertificate = () => {
    toast.success('Certificate link copied to clipboard');
  };

  const handlePrintCertificate = () => {
    toast.success('Certificate sent to printer');
  };

  const getTimelineProgress = () => {
    const completedSteps = mockCertificateData.timeline.filter(step => step.status === 'completed').length;
    return (completedSteps / mockCertificateData.timeline.length) * 100;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 gap-0 flex flex-col overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>
            Verified Carbon Credit Certificate - {project.projectId}
          </DialogTitle>
          <DialogDescription>
            Carbon credit certificate details for project {project.projectId} showing {actualCredits.toLocaleString()} tCO₂e credits
          </DialogDescription>
        </DialogHeader>
        
        {/* Header with Blue Gradient */}
        <div className="bg-gradient-to-r from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)] text-white p-6 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Verified Carbon Credit Certificate</h1>
              <div className="flex items-center gap-4 text-blue-100">
                <span className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Certificate ID: {isIssuedProject ? (project as IssuedCertificate).certificateId : 'NCCR-CERT-PENDING'}
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Project ID: {project.projectId}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{actualCredits.toLocaleString()}</div>
              <div className="text-blue-100">tCO₂e Credits</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 modal-scrollbar">
          <div className="p-6 space-y-6">

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Project Information */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">Project Name</p>
                    <p className="font-semibold">{mockCertificateData.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Panchayat</p>
                    <p className="font-semibold break-words">{project.panchayat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">NGO Partner</p>
                    <p className="font-semibold break-words">{project.ngo}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Ecosystem */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Location & Ecosystem
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">Location</p>
                    <p className="font-semibold">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">State</p>
                    <p className="font-semibold">{project.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Ecosystem Type</p>
                    <Badge className={`${ecosystemConfig[project.ecosystemType].color} w-fit`}>
                      <EcosystemIcon className="w-3 h-3 mr-1" />
                      {project.ecosystemType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Area & Sequestration */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    Restoration Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">Total Area Restored</p>
                    <p className="text-2xl font-bold text-emerald-600">{project.hectaresRestored.toFixed(1)}</p>
                    <p className="text-sm text-gray-700">hectares</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Sequestration Rate</p>
                    <p className="font-semibold">{carbonSequestrationRate} tCO₂e/ha/year</p>
                  </div>
                </CardContent>
              </Card>

              {/* Certificate Status */}
              <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Certificate Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center space-y-2">
                  {isIssuedProject ? (
                    <>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Issued
                      </Badge>
                      <div>
                        <p className="text-sm text-gray-700">Issue Date</p>
                        <p className="font-semibold">{new Date((project as IssuedCertificate).dateIssued).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">Status</p>
                        <Badge className="bg-blue-100 text-blue-800">
                          {(project as IssuedCertificate).status}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Ready for Issuance
                      </Badge>
                      <div>
                        <p className="text-sm text-gray-700">Verification Completed</p>
                        <p className="font-semibold">{new Date((project as ReadyForCreditsProject).verificationCompletedOn).toLocaleDateString('en-IN')}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Timeline Progress */}
            <Card className="p-4 rounded-xl shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Project Timeline & Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Overall Progress</span>
                    <span className="font-semibold">{getTimelineProgress().toFixed(0)}% Complete</span>
                  </div>
                  <Progress value={getTimelineProgress()} className="h-2" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                    {mockCertificateData.timeline.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                          step.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        <p className="text-sm font-semibold">{step.step}</p>
                        <p className="text-xs text-gray-600">{new Date(step.date).toLocaleDateString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supporting Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Panchayat Reports */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Panchayat Reports & Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="max-h-64 overflow-y-auto modal-scrollbar space-y-3">
                    {mockCertificateData.supportingFiles.panchayatReports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{report.title}</h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {report.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(report.date).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <Camera className="w-3 h-3" />
                            <span>{report.photos} photos</span>
                          </div>
                          {report.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Expert Reviews */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Expert Reviews & Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {mockCertificateData.supportingFiles.expertReports.map((review) => (
                      <div key={review.id} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-sm">{review.expert}</h4>
                            <p className="text-xs text-gray-600">{review.specialty}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {review.status}
                            </Badge>
                            <div className="text-sm font-semibold text-primary mt-1">
                              {review.score}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    <FileText className="w-4 h-4 mr-2" />
                    View Detailed Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Drone Data */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-green-600" />
                    Drone Survey Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center relative mb-4">
                    <Satellite className="w-12 h-12 text-green-600" />
                    <div className="absolute top-2 left-2 right-2">
                      <div className="bg-white/90 p-2 rounded text-xs">
                        <p className="font-semibold">Latest Survey: {mockCertificateData.supportingFiles.droneData.latestDate}</p>
                        <p className="text-green-600">+{mockCertificateData.supportingFiles.droneData.vegetationIncrease}% vegetation increase</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-700">Total Flights</p>
                      <p className="font-semibold">{mockCertificateData.supportingFiles.droneData.totalFlights}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-700">Total Images</p>
                      <p className="font-semibold">{mockCertificateData.supportingFiles.droneData.totalImages}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GIS Analysis */}
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    GIS Analysis & Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Analysis Accuracy</span>
                        <span className="text-lg font-bold text-blue-600">
                          {mockCertificateData.supportingFiles.gisData.accuracy}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-2">GIS Layers Analyzed</p>
                      <div className="space-y-1">
                        {mockCertificateData.supportingFiles.gisData.layers.map((layer, index) => (
                          <div key={index} className="flex items-center justify-between text-xs bg-gray-50 rounded p-2">
                            <span>{layer}</span>
                            <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Interactive Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Final Credits Section */}
            <Card className="p-4 rounded-xl shadow-md bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20">
              <CardContent className="pt-4">
                <div className="text-center space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Carbon Credits Generated</h2>
                    <div className="text-6xl font-bold text-primary mb-2">
                      {actualCredits.toLocaleString()}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      tCO₂e Credits Generated
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-gray-700 mb-1">Ecosystem Breakdown</div>
                      <div className="flex items-center gap-2">
                        <EcosystemIcon className="w-4 h-4" />
                        <span className="font-semibold">{project.hectaresRestored.toFixed(1)} ha {project.ecosystemType}</span>
                      </div>
                      <div className="text-primary font-semibold">
                        → {actualCredits.toLocaleString()} credits
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-gray-700 mb-1">Sequestration Rate</div>
                      <div className="font-semibold">
                        {carbonSequestrationRate} tCO₂e/ha/year
                      </div>
                      <div className="text-gray-600 text-xs">
                        Based on {project.ecosystemType} standards
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="text-gray-700 mb-1">Project Impact</div>
                      <div className="font-semibold text-green-600">
                        High Impact
                      </div>
                      <div className="text-gray-600 text-xs">
                        Verified blue carbon restoration
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button onClick={handleDownloadCertificate} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" onClick={handleShareCertificate} className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button variant="outline" onClick={handlePrintCertificate} className="flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Information for Issued Certificates */}
            {isIssuedProject && (
              <Card className="p-4 rounded-xl shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-1">Blockchain Hash</p>
                      <p className="font-mono text-xs break-all">{(project as IssuedCertificate).blockchainHash}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-1">Methodology</p>
                      <p className="text-sm font-semibold">{(project as IssuedCertificate).methodology}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-1">Vintage Year</p>
                      <p className="text-sm font-semibold">{(project as IssuedCertificate).vintage}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-1">Registry Status</p>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
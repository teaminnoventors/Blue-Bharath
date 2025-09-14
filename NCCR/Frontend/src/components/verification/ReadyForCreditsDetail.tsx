import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle, 
  XCircle,
  Users,
  Building,
  MapPin,
  Leaf,
  Shield,
  Activity,
  TrendingUp,
  Calendar,
  Hash,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface ReadyForCreditsDetailProps {
  project: any;
  onBack: () => void;
  onStatusUpdate: (status: string) => void;
}

const mockCarbonData = {
  totalCarbonStored: 3420, // tCO2e
  ecosystemBreakdown: {
    'Above Ground Biomass': 1890,
    'Below Ground Biomass': 980,
    'Soil Carbon': 550
  },
  methodology: 'VM0033 - Methodology for Tidal Wetland and Seagrass Restoration',
  verificationStandard: 'Verified Carbon Standard (VCS)',
  certificationBody: 'NCCR - Government of India',
  issuanceDate: new Date().toISOString().split('T')[0],
  vintageYear: '2024',
  serialNumber: 'NCCR-2024-BC-001'
};

const verificationPasses = [
  {
    stage: 'Initial Project Review',
    status: 'passed',
    date: '2023-12-15',
    score: 96,
    verifier: 'NCCR Primary Review Team'
  },
  {
    stage: 'Panchayat Data Verification',
    status: 'passed',
    date: '2024-01-30',
    score: 92,
    verifier: 'Data Integrity Team'
  },
  {
    stage: 'Expert Field Assessment',
    status: 'passed',
    date: '2024-01-28',
    score: 94,
    verifier: 'Dr. Rajesh Kumar & Team'
  },
  {
    stage: 'GIS & Satellite Validation',
    status: 'passed',
    date: '2024-01-29',
    score: 98,
    verifier: 'GIS Analysis Team'
  },
  {
    stage: 'AI Compliance Check',
    status: 'passed',
    date: '2024-01-30',
    score: 95,
    verifier: 'Automated Compliance System'
  },
  {
    stage: 'Final Compliance Review',
    status: 'passed',
    date: '2024-01-30',
    score: 97,
    verifier: 'Senior Verification Officer'
  }
];

const expertConfirmations = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Lead Marine Biologist',
    organization: 'NCCR Field Operations',
    confirmationDate: '2024-01-28',
    rating: 4.8,
    comments: 'Excellent restoration progress with healthy mangrove growth and proper community engagement.'
  },
  {
    name: 'Dr. Meera Patel',
    role: 'Soil & Water Quality Expert',
    organization: 'NCCR Environmental Division',
    confirmationDate: '2024-01-29',
    rating: 4.9,
    comments: 'Soil parameters show significant improvement. Water quality monitoring indicates successful restoration.'
  },
  {
    name: 'Prof. Arun Sharma',
    role: 'GIS & Remote Sensing Specialist',
    organization: 'NCCR Technology Division',
    confirmationDate: '2024-01-29',
    rating: 4.7,
    comments: 'Satellite analysis confirms vegetation coverage increase and successful project implementation.'
  }
];

export function ReadyForCreditsDetail({ project, onBack, onStatusUpdate }: ReadyForCreditsDetailProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCredits = async () => {
    setIsGenerating(true);
    
    // Simulate credit generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success('Carbon credits generated successfully! Moving to Certificates page.');
    onStatusUpdate('Credits Generated');
    setIsGenerating(false);
  };

  const handleCancel = () => {
    toast.success('Project sent back for additional review.');
    onStatusUpdate('Sent for Review');
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const averageScore = Math.round(
    verificationPasses.reduce((sum, pass) => sum + pass.score, 0) / verificationPasses.length
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Queue
            </Button>
            <div>
              <h1 className="text-white text-2xl font-medium">Final Step: Carbon Credit Certification</h1>
              <p className="text-green-100">{project.title} • {project.projectId}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            Ready for Credits
          </Badge>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Panchayat</p>
              <p className="font-medium">{project.panchayat}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">NGO Partner</p>
              <p className="font-medium">{project.ngo}</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm">{project.location.address}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {project.location.coordinates.lat.toFixed(4)}, {project.location.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {averageScore}%
              </div>
              <p className="text-sm text-muted-foreground">Average Verification Score</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Total Checks</p>
                <p className="font-medium">{verificationPasses.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">All Passed</p>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Carbon Credit Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {mockCarbonData.totalCarbonStored.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">tCO2e Credits</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Serial Number</p>
              <p className="font-mono text-xs">{mockCarbonData.serialNumber}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline - All Green Completed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Project Timeline - All Stages Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: 'Project Initiated', date: '2023-12-15', status: 'completed' },
              { stage: 'Panchayat Updates Verified', date: '2024-01-30', status: 'completed' },
              { stage: 'Expert Review Completed', date: '2024-01-28', status: 'completed' },
              { stage: 'Compliance Check Passed', date: '2024-01-30', status: 'completed' },
              { stage: 'Ready for Credits', date: '2024-01-30', status: 'current' },
              { stage: 'Carbon Credits Generated', date: 'Pending', status: 'pending' }
            ].map((item, index) => (
              <div key={item.stage} className="relative flex items-center gap-4">
                {/* Timeline Line */}
                {index < 5 && (
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-green-300" />
                )}
                
                {/* Timeline Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : item.status === 'current'
                    ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-100'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                
                {/* Timeline Content */}
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    item.status === 'current' ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {item.stage}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.date === 'Pending' ? 'Pending generation' : new Date(item.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Panel */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <TrendingUp className="w-5 h-5" />
            Carbon Credit Generation Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Carbon Breakdown */}
          <div>
            <h3 className="font-medium mb-4">Total Carbon Stored: {mockCarbonData.totalCarbonStored.toLocaleString()} tCO2e</h3>
            <div className="space-y-3">
              {Object.entries(mockCarbonData.ecosystemBreakdown).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{type}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{amount.toLocaleString()} tCO2e</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${(amount / mockCarbonData.totalCarbonStored) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Verification Passes */}
          <div>
            <h3 className="font-medium mb-4">Verification Passes ({verificationPasses.length}/6)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationPasses.map((pass) => (
                <div key={pass.stage} className="border rounded-lg p-3 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{pass.stage}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(pass.score)}`}>
                        {pass.score}%
                      </span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{pass.verifier}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(pass.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Expert Confirmations */}
          <div>
            <h3 className="font-medium mb-4">Expert Confirmations</h3>
            <div className="space-y-3">
              {expertConfirmations.map((expert) => (
                <div key={expert.name} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                      <p className="text-xs text-muted-foreground">{expert.organization}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < Math.floor(expert.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(expert.confirmationDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{expert.comments}"</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Certification Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium">Certification Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Methodology:</span>
                  <span className="font-medium text-right">{mockCarbonData.methodology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard:</span>
                  <span className="font-medium">{mockCarbonData.verificationStandard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certifying Body:</span>
                  <span className="font-medium">{mockCarbonData.certificationBody}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Issuance Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vintage Year:</span>
                  <span className="font-medium">{mockCarbonData.vintageYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issuance Date:</span>
                  <span className="font-medium">{mockCarbonData.issuanceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number:</span>
                  <span className="font-mono text-xs">{mockCarbonData.serialNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate Credits */}
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-green-800">✅ Generate Carbon Credits</h3>
              <p className="text-sm text-muted-foreground mt-2">
                All verification checks have passed. Ready to generate and issue carbon credits.
              </p>
            </div>
            
            <div className="bg-white border border-green-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Hash className="w-4 h-4 text-green-600" />
                <span>Blockchain registration included</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Immutable certificate generation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Download className="w-4 h-4 text-green-600" />
                <span>PDF certificate download</span>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateCredits}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Generating Credits...
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

        {/* Cancel Option */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-medium text-orange-800">❌ Send Back for Review</h3>
              <p className="text-sm text-muted-foreground mt-2">
                If you need additional verification or have concerns about the project data.
              </p>
            </div>
            
            <div className="bg-white border border-orange-200 rounded-lg p-4 space-y-2 text-sm text-muted-foreground">
              <p>• Additional expert review</p>
              <p>• Request more documentation</p>
              <p>• Clarify carbon calculations</p>
            </div>
            
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              size="lg"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel & Send for Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
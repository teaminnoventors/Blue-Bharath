import React from 'react';
import {
  Award,
  Building,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  Hash,
  Leaf,
  MapPin,
  Users,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { VisuallyHidden } from '../ui/visually-hidden';
import { toast } from 'sonner@2.0.3';

interface CarbonCredit {
  id: string;
  projectId: string;
  panchayat: string;
  ngo: string;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Salt Marsh' | 'Coral Reef' | 'Estuary';
  hectaresRestored: number;
  creditsGenerated: number;
  dateIssued: string;
  certificateId: string;
  blockchainHash: string;
  status: 'Active' | 'Retired' | 'Transferred';
  vintage: string;
  methodology: string;
  location: string;
  state: string;
}

interface CarbonCreditCertificatePopupProps {
  certificate: CarbonCredit;
  isOpen: boolean;
  onClose: () => void;
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

const statusConfig = {
  'Active': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'Retired': { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  'Transferred': { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' }
};

export function CarbonCreditCertificatePopup({
  certificate,
  isOpen,
  onClose
}: CarbonCreditCertificatePopupProps) {
  const EcosystemIcon = ecosystemConfig[certificate.ecosystemType].icon;
  const carbonSequestrationRate = ecosystemCreditFactors[certificate.ecosystemType];

  const handleDownloadPDF = () => {
    toast.success(`Certificate ${certificate.certificateId} downloaded as PDF`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] w-[80vw] max-h-[90vh] p-0 bg-gradient-to-br from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)] overflow-hidden [&>button]:hidden">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Blue Carbon Credit Certificate</DialogTitle>
            <DialogDescription>
              Certificate details for carbon credits generated from blue carbon ecosystem restoration project
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        
        {/* Fixed Header with Close Button and Credits */}
        <div className="relative p-6 pb-4">
          {/* Top Right Controls */}
          <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
            {/* Download PDF Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={handleDownloadPDF}
            >
              <Download className="w-4 h-4" />
            </Button>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Header with Credits Number */}
          <div className="flex items-center justify-between pr-20">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Blue Carbon Credit Certificate</h1>
                <p className="text-blue-100 text-sm">
                  National Coastal and Marine Conservation Registry (NCCR)
                </p>
              </div>
            </div>
            
            {/* Big Bold Credits Number - Always Visible */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-white">
                {certificate.creditsGenerated.toLocaleString()}
              </div>
              <p className="text-blue-100 text-sm">tCO₂e Credits</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="modal-scrollbar overflow-y-auto px-6 pb-8 max-h-[calc(90vh-140px)]">
          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
            
            {/* Row 1, Col 1: Project Info */}
            <Card className="bg-white/95 backdrop-blur-sm h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificate ID</p>
                  <p className="font-mono text-sm break-all">{certificate.certificateId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project ID</p>
                  <p className="font-mono text-sm break-all">{certificate.projectId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Implementing Panchayat</p>
                  <p className="text-sm break-words">{certificate.panchayat}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">NGO Partner</p>
                  <p className="text-sm break-words">{certificate.ngo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
                  <p className="text-sm">{new Date(certificate.dateIssued).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vintage</p>
                  <p className="text-sm">{certificate.vintage}</p>
                </div>
              </CardContent>
            </Card>

            {/* Row 1, Col 2: Location & Ecosystem */}
            <Card className="bg-white/95 backdrop-blur-sm h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location & Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-sm break-words">{certificate.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">State</p>
                  <p className="text-sm">{certificate.state}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ecosystem Type</p>
                  <Badge className={`${ecosystemConfig[certificate.ecosystemType].color} text-sm px-3 py-1 mt-1`}>
                    <EcosystemIcon className="w-4 h-4 mr-2" />
                    {certificate.ecosystemType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Methodology</p>
                  <p className="text-sm break-words">{certificate.methodology}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-900">
                      {certificate.hectaresRestored.toFixed(1)}
                    </div>
                    <p className="text-xs text-blue-700">Hectares Restored</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-900">
                      {carbonSequestrationRate}
                    </div>
                    <p className="text-xs text-green-700">tCO₂e/ha/year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 2, Col 1: Restoration Details */}
            <Card className="bg-white/95 backdrop-blur-sm h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Restoration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Verification Complete</span>
                  </div>
                  <p className="text-sm text-green-700">
                    This project has passed all verification requirements including GIS validation, 
                    drone surveys, expert review, and community verification.
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Impact Summary</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Carbon Sequestered:</span>
                      <span className="text-sm font-medium">{certificate.creditsGenerated.toLocaleString()} tCO₂e</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ecosystem Protected:</span>
                      <span className="text-sm font-medium">{certificate.hectaresRestored.toFixed(1)} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Biodiversity Enhanced:</span>
                      <span className="text-sm font-medium">✅ Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Community Benefit:</span>
                      <span className="text-sm font-medium">✅ Confirmed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certification Standard</p>
                  <p className="text-sm">VCS (Verified Carbon Standard)</p>
                </div>
              </CardContent>
            </Card>

            {/* Row 2, Col 2: Certificate Status */}
            <Card className="bg-white/95 backdrop-blur-sm h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certificate Status
                </CardTitle>
              </CardHeader>
              <CardContent className="modal-scrollbar overflow-y-auto max-h-64 space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                  <Badge className={`${statusConfig[certificate.status].color} text-sm px-3 py-1 mt-1`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[certificate.status].dot}`} />
                    {certificate.status}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blockchain Record</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-1">
                    <p className="text-xs font-mono break-all">{certificate.blockchainHash}</p>
                    <p className="text-xs text-muted-foreground mt-1">Polygon Mainnet</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-blue-900">NCCR India</p>
                    <p className="text-xs text-blue-700">
                      National Coastal and Marine Conservation Registry
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Authorized by Ministry of Environment, Forest and Climate Change
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
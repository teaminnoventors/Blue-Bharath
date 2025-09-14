import React, { useState } from 'react';
import {
  Award,
  Download,
  Eye,
  ExternalLink,
  Filter,
  Hash,
  Search,
  TrendingUp,
  Users,
  Leaf,
  MapPin,
  Calendar,
  Building,
  Activity,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

// Import the enhanced popup components
import { ReadyForCreditsProjectDetailPopup } from './ReadyForCreditsProjectDetailPopup';
import { CarbonCreditCertificatePopup } from './CarbonCreditCertificatePopup';

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

// Ecosystem credit calculation factors (tCO2e per hectare per year)
const ecosystemCreditFactors = {
  'Mangrove': 12.5, // 10-15 range, using 12.5 average
  'Seagrass': 6.5,  // 5-8 range, using 6.5 average
  'Salt Marsh': 9,  // 8-10 range, using 9 average
  'Coral Reef': 3.5, // 2-5 range, using 3.5 average
  'Estuary': 7.5    // 6-9 range, using 7.5 average
};

const mockIssuedCertificates: CarbonCredit[] = [
  {
    id: 'CC-001',
    projectId: 'NCCR-MAN-2024-001',
    panchayat: 'Kottapuram Grama Panchayat',
    ngo: 'Kerala Mangrove Foundation',
    ecosystemType: 'Mangrove',
    hectaresRestored: 45.8,
    creditsGenerated: 573,
    dateIssued: '2024-01-15',
    certificateId: 'NCCR-CERT-2024-001',
    blockchainHash: '0x1a2b3c4d5e6f789a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7890abcdef1234',
    status: 'Active',
    vintage: '2024',
    methodology: 'Mangrove Restoration and Conservation - V1.0',
    location: 'Vembanad Lake, Kochi',
    state: 'Kerala'
  },
  {
    id: 'CC-002',
    projectId: 'NCCR-SEA-2024-003',
    panchayat: 'Rameswaram Grama Panchayat',
    ngo: 'Tamil Nadu Marine Conservation Society',
    ecosystemType: 'Seagrass',
    hectaresRestored: 32.4,
    creditsGenerated: 211,
    dateIssued: '2024-01-20',
    certificateId: 'NCCR-CERT-2024-002',
    blockchainHash: '0x2b3c4d5e6f7890a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8901bcdef2345',
    status: 'Active',
    vintage: '2024',
    methodology: 'Seagrass Meadow Restoration - V1.2',
    location: 'Palk Bay',
    state: 'Tamil Nadu'
  },
  {
    id: 'CC-003',
    projectId: 'NCCR-SAL-2023-012',
    panchayat: 'Kutch Salt Works Collective',
    ngo: 'Gujarat Coastal Restoration Initiative',
    ecosystemType: 'Salt Marsh',
    hectaresRestored: 67.2,
    creditsGenerated: 605,
    dateIssued: '2023-12-28',
    certificateId: 'NCCR-CERT-2023-045',
    blockchainHash: '0x3c4d5e6f7890a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8901bcdef3456',
    status: 'Retired',
    vintage: '2023',
    methodology: 'Salt Marsh Ecosystem Restoration - V2.1',
    location: 'Kutch District',
    state: 'Gujarat'
  },
  {
    id: 'CC-004',
    projectId: 'NCCR-MAN-2024-007',
    panchayat: 'Bhitarkanika Gram Panchayat',
    ngo: 'Odisha Mangrove Conservation Trust',
    ecosystemType: 'Mangrove',
    hectaresRestored: 89.5,
    creditsGenerated: 1119,
    dateIssued: '2024-02-05',
    certificateId: 'NCCR-CERT-2024-008',
    blockchainHash: '0x4d5e6f7890a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8901bcdef4567',
    status: 'Active',
    vintage: '2024',
    methodology: 'Mangrove Restoration and Conservation - V1.0',
    location: 'Bhitarkanika National Park',
    state: 'Odisha'
  },
  {
    id: 'CC-005',
    projectId: 'NCCR-COR-2024-002',
    panchayat: 'Lakshadweep Coral Island Council',
    ngo: 'Indian Ocean Coral Foundation',
    ecosystemType: 'Coral Reef',
    hectaresRestored: 15.7,
    creditsGenerated: 55,
    dateIssued: '2024-01-30',
    certificateId: 'NCCR-CERT-2024-006',
    blockchainHash: '0x5e6f7890a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8901bcdef5678',
    status: 'Transferred',
    vintage: '2024',
    methodology: 'Coral Reef Restoration - V1.5',
    location: 'Kadmat Island',
    state: 'Lakshadweep'
  },
  {
    id: 'CC-006',
    projectId: 'NCCR-EST-2023-018',
    panchayat: 'Chilika Development Authority',
    ngo: 'Chilika Environmental Society',
    ecosystemType: 'Estuary',
    hectaresRestored: 156.3,
    creditsGenerated: 1172,
    dateIssued: '2023-11-22',
    certificateId: 'NCCR-CERT-2023-032',
    blockchainHash: '0x6f7890a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8901bcdef6789',
    status: 'Active',
    vintage: '2023',
    methodology: 'Estuarine Ecosystem Restoration - V1.8',
    location: 'Chilika Lake',
    state: 'Odisha'
  }
];

const mockReadyForCredits: ReadyForCreditsProject[] = [
  {
    id: 'RFC-001',
    projectId: 'NCCR-MAN-2024-009',
    panchayat: 'Kannur Coastal Panchayat',
    ngo: 'Malabar Mangrove Initiative',
    ecosystemType: 'Mangrove',
    hectaresRestored: 28.6,
    estimatedCredits: 358,
    verificationCompletedOn: '2024-01-30',
    location: 'Kannur Backwaters',
    state: 'Kerala',
    complianceScore: 96
  },
  {
    id: 'RFC-002',
    projectId: 'NCCR-SEA-2024-011',
    panchayat: 'Mandapam Fisher Collective',
    ngo: 'Gulf of Mannar Research Foundation',
    ecosystemType: 'Seagrass',
    hectaresRestored: 41.2,
    estimatedCredits: 268,
    verificationCompletedOn: '2024-01-28',
    location: 'Gulf of Mannar',
    state: 'Tamil Nadu',
    complianceScore: 94
  },
  {
    id: 'RFC-003',
    projectId: 'NCCR-SAL-2024-005',
    panchayat: 'Little Rann Development Council',
    ngo: 'Gujarat Salt Desert Foundation',
    ecosystemType: 'Salt Marsh',
    hectaresRestored: 73.8,
    estimatedCredits: 664,
    verificationCompletedOn: '2024-01-25',
    location: 'Little Rann of Kutch',
    state: 'Gujarat',
    complianceScore: 98
  },
  {
    id: 'RFC-004', 
    projectId: 'NCCR-EST-2024-008',
    panchayat: 'Pulicat Lake Fishermen Association',
    ngo: 'Andhra Coastal Conservation Alliance',
    ecosystemType: 'Estuary',
    hectaresRestored: 52.1,
    estimatedCredits: 391,
    verificationCompletedOn: '2024-01-27',
    location: 'Pulicat Lake',
    state: 'Andhra Pradesh',
    complianceScore: 92
  }
];

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

export function CarbonCreditCertificates() {
  const [activeTab, setActiveTab] = useState<'issued' | 'ready'>('issued');
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ecosystemFilter, setEcosystemFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<(CarbonCredit & {type: 'issued'}) | (ReadyForCreditsProject & {type: 'ready'}) | null>(null);
  const [projectDetailOpen, setProjectDetailOpen] = useState(false);
  const [certificateViewOpen, setCertificateViewOpen] = useState(false);

  const filteredIssuedCertificates = mockIssuedCertificates.filter(cert => {
    const matchesSearch = 
      cert.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.panchayat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.ngo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === 'all' || cert.state === stateFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesEcosystem = ecosystemFilter === 'all' || cert.ecosystemType === ecosystemFilter;
    
    return matchesSearch && matchesState && matchesStatus && matchesEcosystem;
  });

  const filteredReadyProjects = mockReadyForCredits.filter(project => {
    const matchesSearch = 
      project.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.panchayat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.ngo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === 'all' || project.state === stateFilter;
    const matchesEcosystem = ecosystemFilter === 'all' || project.ecosystemType === ecosystemFilter;
    
    return matchesSearch && matchesState && matchesEcosystem;
  });

  const totalCreditsIssued = mockIssuedCertificates.reduce((sum, cert) => sum + cert.creditsGenerated, 0);
  const totalCreditsReady = mockReadyForCredits.reduce((sum, project) => sum + project.estimatedCredits, 0);
  const totalHectares = [...mockIssuedCertificates, ...mockReadyForCredits].reduce((sum, item) => sum + item.hectaresRestored, 0);

  const handleDownloadCertificate = (certificate: CarbonCredit) => {
    toast.success(`Certificate ${certificate.certificateId} downloaded`);
  };

  const handleViewCertificate = (certificate: CarbonCredit) => {
    setSelectedProject({...certificate, type: 'issued'});
    setCertificateViewOpen(true);
  };

  const handleViewReadyProject = (project: ReadyForCreditsProject) => {
    setSelectedProject({...project, type: 'ready'});
    setProjectDetailOpen(true);
  };

  const handleShowCertificateAfterGeneration = (project: ReadyForCreditsProject) => {
    // Convert the ready project to an issued certificate format for display
    const newCertificate = {
      ...project,
      type: 'issued' as const,
      creditsGenerated: project.estimatedCredits,
      dateIssued: new Date().toISOString().split('T')[0],
      certificateId: `NCCR-CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      status: 'Active' as const,
      vintage: new Date().getFullYear().toString(),
      methodology: `${project.ecosystemType} Restoration and Conservation - V1.0`
    };
    
    setSelectedProject(newCertificate);
    setProjectDetailOpen(false);
    setCertificateViewOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)] text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white text-2xl font-medium">Carbon Credit Certificates</h1>
            <p className="text-blue-100 mt-1">
              Manage and monitor blue carbon credit certificates and generation pipeline
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Credits Issued</CardTitle>
            <Award className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalCreditsIssued.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              tCO2e verified and issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Ready for Generation</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalCreditsReady.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              tCO2e pending issuance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Area Restored</CardTitle>
            <Leaf className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {totalHectares.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              hectares of blue carbon ecosystems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Active Certificates</CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockIssuedCertificates.filter(cert => cert.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              certificates currently active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by project ID, panchayat, NGO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Odisha">Odisha</SelectItem>
                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ecosystem</label>
            <Select value={ecosystemFilter} onValueChange={setEcosystemFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All ecosystems" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ecosystems</SelectItem>
                <SelectItem value="Mangrove">Mangrove</SelectItem>
                <SelectItem value="Seagrass">Seagrass</SelectItem>
                <SelectItem value="Salt Marsh">Salt Marsh</SelectItem>
                <SelectItem value="Coral Reef">Coral Reef</SelectItem>
                <SelectItem value="Estuary">Estuary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeTab === 'issued' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Transferred">Transferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setStateFilter('all');
              setStatusFilter('all');
              setEcosystemFilter('all');
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Tabs for Issued vs Ready for Credits */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'issued' | 'ready')} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="issued" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Issued Certificates ({filteredIssuedCertificates.length})
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Ready for Carbon Credits ({filteredReadyProjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issued">
          {/* Issued Certificates Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Panchayat</TableHead>
                  <TableHead>NGO Partner</TableHead>
                  <TableHead>Ecosystem Type</TableHead>
                  <TableHead>Credits Generated</TableHead>
                  <TableHead>Date Issued</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssuedCertificates.map((certificate) => {
                  const EcosystemIcon = ecosystemConfig[certificate.ecosystemType].icon;
                  return (
                    <TableRow 
                      key={certificate.id} 
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleViewCertificate(certificate)}
                    >
                      <TableCell>
                        <div className="font-mono text-sm">{certificate.certificateId}</div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="font-mono text-sm">{certificate.projectId}</div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{certificate.panchayat}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{certificate.ngo}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={ecosystemConfig[certificate.ecosystemType].color}
                        >
                          <EcosystemIcon className="w-3 h-3 mr-1" />
                          {certificate.ecosystemType}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">
                            {certificate.creditsGenerated.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">tCO2e</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(certificate.dateIssued).toLocaleDateString('en-IN')}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={statusConfig[certificate.status].color}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[certificate.status].dot}`} />
                          {certificate.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCertificate(certificate);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadCertificate(certificate);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="ready">
          {/* Ready for Carbon Credits Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Panchayat</TableHead>
                  <TableHead>NGO Partner</TableHead>
                  <TableHead>Ecosystem Type</TableHead>
                  <TableHead>Hectares Restored</TableHead>
                  <TableHead>Estimated Credits</TableHead>
                  <TableHead>Verification Completed</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReadyProjects.map((project) => {
                  const EcosystemIcon = ecosystemConfig[project.ecosystemType].icon;
                  return (
                    <TableRow 
                      key={project.id} 
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleViewReadyProject(project)}
                    >
                      <TableCell>
                        <div className="font-mono text-sm">{project.projectId}</div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{project.panchayat}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{project.ngo}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={ecosystemConfig[project.ecosystemType].color}
                        >
                          <EcosystemIcon className="w-3 h-3 mr-1" />
                          {project.ecosystemType}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{project.hectaresRestored.toFixed(1)} ha</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-600">
                            {project.estimatedCredits.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">tCO2e estimated</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{new Date(project.verificationCompletedOn).toLocaleDateString('en-IN')}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-green-600">{project.complianceScore}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-green-600 h-1.5 rounded-full" 
                                style={{ width: `${project.complianceScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewReadyProject(project);
                          }}
                        >
                          <Award className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Popups */}
      {selectedProject && selectedProject.type === 'ready' && (
        <ReadyForCreditsProjectDetailPopup
          project={selectedProject as ReadyForCreditsProject}
          isOpen={projectDetailOpen}
          onClose={() => {
            setProjectDetailOpen(false);
            setSelectedProject(null);
          }}
          onGenerateCredits={handleShowCertificateAfterGeneration}
        />
      )}

      {selectedProject && selectedProject.type === 'issued' && (
        <CarbonCreditCertificatePopup
          certificate={selectedProject as CarbonCredit}
          isOpen={certificateViewOpen}
          onClose={() => {
            setCertificateViewOpen(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
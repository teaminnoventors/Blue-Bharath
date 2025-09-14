import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  Shield, 
  Award,
  MapPin,
  Building,
  Users,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Import detail page components
import { PanchayatUpdatesDetail } from './PanchayatUpdatesDetail';
import { TamperedDataDetail } from './TamperedDataDetail';
import { ExpertReviewDetail } from './ExpertReviewDetail';
import { ComplianceCheckDetail } from './ComplianceCheckDetail';
import { ReadyForCreditsDetail } from './ReadyForCreditsDetail';

interface VerificationProject {
  id: string;
  title: string;
  projectId: string;
  panchayat: string;
  ngo: string;
  location: {
    coordinates: { lat: number; lng: number };
    address: string;
  };
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  stage: 'Panchayat Updates' | 'Tampered Data' | 'Expert Review' | 'Compliance Check' | 'Ready for Credits';
  progress: number;
  lastUpdate: string;
  urgency?: boolean;
  metadata?: any;
}

type FilterType = 'all' | 'panchayat-updates' | 'tampered-data' | 'expert-review' | 'compliance-check' | 'ready-credits';

const mockProjects: VerificationProject[] = [
  {
    id: 'VER-001',
    title: 'Mangrove Restoration - Sundarbans East',
    projectId: 'NCCR-2024-006',
    panchayat: 'Patharpratima Gram Panchayat',
    ngo: 'Sundarbans Green Initiative',
    location: {
      coordinates: { lat: 21.8162, lng: 88.5431 },
      address: 'Patharpratima, South 24 Parganas, West Bengal'
    },
    status: 'Update Received',
    priority: 'High',
    stage: 'Panchayat Updates',
    progress: 45,
    lastUpdate: '2024-01-30T14:30:00Z',
    metadata: {
      updateType: 'Monthly Progress',
      photosCount: 12,
      hasGPSData: true
    }
  },
  {
    id: 'VER-002',
    title: 'Coral Reef Restoration - Lakshadweep',
    projectId: 'NCCR-2024-009',
    panchayat: 'Kavaratti Island Panchayat',
    ngo: 'Marine Conservation Trust',
    location: {
      coordinates: { lat: 10.5593, lng: 72.6422 },
      address: 'Kavaratti, Lakshadweep'
    },
    status: 'Tampered',
    priority: 'High',
    stage: 'Tampered Data',
    progress: 35,
    lastUpdate: '2024-01-30T12:15:00Z',
    urgency: true,
    metadata: {
      tampering: {
        type: 'GPS Mismatch',
        confidence: 94,
        details: 'Location metadata inconsistent with uploaded photos'
      }
    }
  },
  {
    id: 'VER-003',
    title: 'Salt Marsh Conservation - Kutch',
    projectId: 'NCCR-2024-010',
    panchayat: 'Mandvi Gram Panchayat',
    ngo: 'Gujarat Coastal Foundation',
    location: {
      coordinates: { lat: 22.8395, lng: 69.3530 },
      address: 'Mandvi, Kutch, Gujarat'
    },
    status: 'Expert Review',
    priority: 'Medium',
    stage: 'Expert Review',
    progress: 78,
    lastUpdate: '2024-01-30T10:45:00Z',
    metadata: {
      expertRequired: 'Marine Biologist',
      estimatedDuration: '5 days'
    }
  },
  {
    id: 'VER-004',
    title: 'Backwater Restoration - Alappuzha',
    projectId: 'NCCR-2024-011',
    panchayat: 'Kummakom Gram Panchayat',
    ngo: 'Kerala Backwater Alliance',
    location: {
      coordinates: { lat: 9.4981, lng: 76.3388 },
      address: 'Kummakom, Alappuzha, Kerala'
    },
    status: 'Final Check',
    priority: 'Medium',
    stage: 'Compliance Check',
    progress: 92,
    lastUpdate: '2024-01-30T09:20:00Z',
    metadata: {
      complianceScore: 94,
      readyForTest: true
    }
  },
  {
    id: 'VER-005',
    title: 'Seagrass Meadow - Palk Bay',
    projectId: 'NCCR-2024-002',
    panchayat: 'Rameswaram Gram Panchayat',
    ngo: 'Marine Conservation Foundation',
    location: {
      coordinates: { lat: 9.2876, lng: 79.3129 },
      address: 'Rameswaram, Tamil Nadu'
    },
    status: 'Credits Ready',
    priority: 'Low',
    stage: 'Ready for Credits',
    progress: 100,
    lastUpdate: '2024-01-30T08:00:00Z',
    metadata: {
      carbonEstimate: 3420,
      finalScore: 98
    }
  }
];

const stageConfig = {
  'Panchayat Updates': { 
    color: 'bg-blue-100 text-blue-800', 
    icon: Users,
    description: 'Panchayat has submitted updates for review'
  },
  'Tampered Data': { 
    color: 'bg-red-100 text-red-800', 
    icon: AlertTriangle,
    description: 'AI has detected data inconsistencies'
  },
  'Expert Review': { 
    color: 'bg-purple-100 text-purple-800', 
    icon: UserCheck,
    description: 'Awaiting expert assignment and review'
  },
  'Compliance Check': { 
    color: 'bg-orange-100 text-orange-800', 
    icon: Shield,
    description: 'Ready for final compliance verification'
  },
  'Ready for Credits': { 
    color: 'bg-green-100 text-green-800', 
    icon: Award,
    description: 'Verified and ready for carbon credit generation'
  }
};

const priorityConfig = {
  'High': { color: 'bg-red-100 text-red-800' },
  'Medium': { color: 'bg-yellow-100 text-yellow-800' },
  'Low': { color: 'bg-green-100 text-green-800' }
};

export function VerificationQueue() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<VerificationProject | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredProjects = mockProjects.filter(project => {
    if (selectedFilter === 'all') return true;
    
    const stageMap = {
      'panchayat-updates': 'Panchayat Updates',
      'tampered-data': 'Tampered Data',
      'expert-review': 'Expert Review',
      'compliance-check': 'Compliance Check',
      'ready-credits': 'Ready for Credits'
    };
    
    return project.stage === stageMap[selectedFilter];
  });

  const handleProjectClick = (project: VerificationProject) => {
    setSelectedProject(project);
    setShowDetail(true);
  };

  const handleBackToQueue = () => {
    setShowDetail(false);
    setSelectedProject(null);
  };

  const getProgressStages = (currentStage: string) => {
    const stages = ['Initiated', 'Approved', 'Ongoing', 'Expert Review', 'Compliance', 'Credits'];
    const stageMap = {
      'Panchayat Updates': 2,
      'Tampered Data': 2,
      'Expert Review': 3,
      'Compliance Check': 4,
      'Ready for Credits': 5
    };
    
    const currentIndex = stageMap[currentStage as keyof typeof stageMap] || 0;
    return { stages, currentIndex };
  };

  const renderDetailPage = () => {
    if (!selectedProject) return null;

    const commonProps = {
      project: selectedProject,
      onBack: handleBackToQueue,
      onStatusUpdate: (newStatus: string) => {
        // Update project status and potentially move to different filter
        console.log('Status updated:', newStatus);
        handleBackToQueue();
      }
    };

    switch (selectedProject.stage) {
      case 'Panchayat Updates':
        return <PanchayatUpdatesDetail {...commonProps} />;
      case 'Tampered Data':
        return <TamperedDataDetail {...commonProps} />;
      case 'Expert Review':
        return <ExpertReviewDetail {...commonProps} />;
      case 'Compliance Check':
        return <ComplianceCheckDetail {...commonProps} />;
      case 'Ready for Credits':
        return <ReadyForCreditsDetail {...commonProps} />;
      default:
        return null;
    }
  };

  if (showDetail) {
    return renderDetailPage();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[var(--blue-gradient-from)] to-[var(--blue-gradient-to)] text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white">Verification Queue</h1>
            <p className="text-blue-100 mt-1">
              Review and process project submissions through verification workflow
            </p>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{filteredProjects.length}</div>
              <div className="text-xs text-blue-100">Projects in Queue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-medium">Filter by Verification Stage:</h3>
              <Select value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as FilterType)}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects ({mockProjects.length})</SelectItem>
                  <SelectItem value="panchayat-updates">
                    Panchayat Updates ({mockProjects.filter(p => p.stage === 'Panchayat Updates').length})
                  </SelectItem>
                  <SelectItem value="tampered-data">
                    Tampered Data Detected ({mockProjects.filter(p => p.stage === 'Tampered Data').length})
                  </SelectItem>
                  <SelectItem value="expert-review">
                    Expert Review Pending ({mockProjects.filter(p => p.stage === 'Expert Review').length})
                  </SelectItem>
                  <SelectItem value="compliance-check">
                    Final Compliance Check ({mockProjects.filter(p => p.stage === 'Compliance Check').length})
                  </SelectItem>
                  <SelectItem value="ready-credits">
                    Ready for Credits ({mockProjects.filter(p => p.stage === 'Ready for Credits').length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedFilter !== 'all' && (
              <div className="text-sm text-muted-foreground">
                {stageConfig[filteredProjects[0]?.stage]?.description}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const StageIcon = stageConfig[project.stage].icon;
          const { stages, currentIndex } = getProgressStages(project.stage);
          
          return (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-all cursor-pointer border-primary/20 hover:border-primary/40"
              onClick={() => handleProjectClick(project)}
            >
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate text-[15px]">{project.title}</h3>
                      {project.urgency && (
                        <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{project.projectId}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>

                {/* Organizations */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">{project.panchayat}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-green-600" />
                    <span>{project.ngo}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-muted-foreground">{project.location.address}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {project.location.coordinates.lat.toFixed(4)}, {project.location.coordinates.lng.toFixed(4)}
                    </div>
                  </div>
                </div>

                {/* Status and Priority */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={stageConfig[project.stage].color}
                  >
                    <StageIcon className="w-3 h-3 mr-1" />
                    {project.status}
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className={priorityConfig[project.priority].color}
                  >
                    {project.priority}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  
                  {/* Progress Stages */}
                  <div className="flex justify-between text-xs">
                    {stages.map((stage, index) => (
                      <span 
                        key={stage}
                        className={`${
                          index <= currentIndex 
                            ? 'text-primary font-medium' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Last Update */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Updated {new Date(project.lastUpdate).toLocaleDateString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">No Projects in This Stage</h3>
            <p className="text-muted-foreground">
              {selectedFilter === 'all' 
                ? 'No projects are currently in the verification queue.'
                : `No projects are currently in the ${selectedFilter.replace('-', ' ')} stage.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
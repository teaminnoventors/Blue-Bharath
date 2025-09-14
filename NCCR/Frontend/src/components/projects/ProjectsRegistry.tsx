import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  FileText,
  Calendar,
  Users,
  Building,
  Leaf,
  X,
  ExternalLink,
  Image as ImageIcon,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ProjectsRegistryProps {
  onViewProject: (projectId: string) => void;
}

interface Project {
  id: string;
  panchayatName: string;
  ngoPartner: string;
  projectType: 'Plantation' | 'Restoration';
  startDate: string;
  currentStage: string;
  status: 'Pending' | 'Ongoing' | 'Completed' | 'Carbon Credit Verified';
  progress: number;
  area: number;
  location: string;
  description: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
  }>;
  images: Array<{
    id: string;
    name: string;
    uploadDate: string;
    description: string;
  }>;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
  }>;
}

const mockProjects: Project[] = [
  {
    id: 'NCCR-2024-001',
    panchayatName: 'Gosaba Gram Panchayat',
    ngoPartner: 'Sundarbans Conservation Society',
    projectType: 'Restoration',
    startDate: '2024-01-15',
    currentStage: 'Field Verification',
    status: 'Ongoing',
    progress: 65,
    area: 45.2,
    location: 'Sundarbans, West Bengal',
    description: 'Mangrove ecosystem restoration project covering 45.2 hectares in the Sundarbans delta region.',
    documents: [
      { id: 'doc1', name: 'Project Proposal.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '2.4 MB' },
      { id: 'doc2', name: 'Environmental Impact Assessment.pdf', type: 'PDF', uploadDate: '2024-01-18', size: '5.1 MB' },
      { id: 'doc3', name: 'Budget Breakdown.xlsx', type: 'Excel', uploadDate: '2024-01-20', size: '186 KB' }
    ],
    images: [
      { id: 'img1', name: 'Site Overview.jpg', uploadDate: '2024-01-15', description: 'Aerial view of restoration site' },
      { id: 'img2', name: 'Mangrove Saplings.jpg', uploadDate: '2024-01-16', description: 'Newly planted mangrove saplings' },
      { id: 'img3', name: 'Community Participation.jpg', uploadDate: '2024-01-18', description: 'Local community involvement' }
    ],
    timeline: [
      { date: '2024-01-15', title: 'Project Submitted', description: 'Initial project proposal submitted', status: 'completed' },
      { date: '2024-01-20', title: 'Document Review', description: 'Technical documentation reviewed and approved', status: 'completed' },
      { date: '2024-01-25', title: 'Field Verification', description: 'On-site verification in progress', status: 'current' },
      { date: '2024-02-01', title: 'Implementation Phase', description: 'Begin restoration activities', status: 'pending' },
      { date: '2024-06-01', title: 'Carbon Credit Assessment', description: 'Final assessment for carbon credit issuance', status: 'pending' }
    ]
  },
  {
    id: 'NCCR-2024-002',
    panchayatName: 'Rameswaram Gram Panchayat',
    ngoPartner: 'Marine Conservation Foundation',
    projectType: 'Plantation',
    startDate: '2024-01-12',
    currentStage: 'Implementation',
    status: 'Ongoing',
    progress: 80,
    area: 23.8,
    location: 'Palk Bay, Tamil Nadu',
    description: 'Seagrass plantation initiative to restore marine ecosystem in Palk Bay.',
    documents: [
      { id: 'doc4', name: 'Marine Survey Report.pdf', type: 'PDF', uploadDate: '2024-01-12', size: '3.2 MB' },
      { id: 'doc5', name: 'Species Selection Plan.pdf', type: 'PDF', uploadDate: '2024-01-14', size: '1.8 MB' }
    ],
    images: [
      { id: 'img4', name: 'Underwater Survey.jpg', uploadDate: '2024-01-12', description: 'Pre-plantation site survey' },
      { id: 'img5', name: 'Seagrass Planting.jpg', uploadDate: '2024-01-20', description: 'Seagrass plantation in progress' }
    ],
    timeline: [
      { date: '2024-01-12', title: 'Project Initiated', description: 'Project approved and initiated', status: 'completed' },
      { date: '2024-01-18', title: 'Site Preparation', description: 'Marine site prepared for plantation', status: 'completed' },
      { date: '2024-01-22', title: 'Plantation Phase', description: 'Seagrass plantation ongoing', status: 'current' },
      { date: '2024-03-01', title: 'Monitoring Phase', description: 'Growth monitoring and maintenance', status: 'pending' }
    ]
  },
  {
    id: 'NCCR-2024-003',
    panchayatName: 'Balugaon Gram Panchayat',
    ngoPartner: 'Odisha Wetland Initiative',
    projectType: 'Restoration',
    startDate: '2023-12-01',
    currentStage: 'Carbon Credit Assessment',
    status: 'Carbon Credit Verified',
    progress: 100,
    area: 67.5,
    location: 'Chilika Lake, Odisha',
    description: 'Comprehensive wetland restoration project at Chilika Lake ecosystem.',
    documents: [
      { id: 'doc6', name: 'Final Assessment Report.pdf', type: 'PDF', uploadDate: '2024-01-25', size: '4.7 MB' },
      { id: 'doc7', name: 'Carbon Credit Certificate.pdf', type: 'PDF', uploadDate: '2024-01-30', size: '892 KB' }
    ],
    images: [
      { id: 'img6', name: 'Before Restoration.jpg', uploadDate: '2023-12-01', description: 'Site condition before restoration' },
      { id: 'img7', name: 'After Restoration.jpg', uploadDate: '2024-01-25', description: 'Restored wetland ecosystem' }
    ],
    timeline: [
      { date: '2023-12-01', title: 'Project Started', description: 'Restoration work began', status: 'completed' },
      { date: '2024-01-15', title: 'Restoration Completed', description: 'Physical restoration work finished', status: 'completed' },
      { date: '2024-01-25', title: 'Assessment Complete', description: 'Final environmental assessment', status: 'completed' },
      { date: '2024-01-30', title: 'Carbon Credits Issued', description: 'Carbon credits verified and issued', status: 'completed' }
    ]
  },
  {
    id: 'NCCR-2024-004',
    panchayatName: 'Okha Gram Panchayat',
    ngoPartner: 'Gujarat Marine Trust',
    projectType: 'Restoration',
    startDate: '2024-01-20',
    currentStage: 'Initial Review',
    status: 'Pending',
    progress: 25,
    area: 12.3,
    location: 'Gulf of Kachchh, Gujarat',
    description: 'Coral reef restoration project in the Gulf of Kachchh marine sanctuary.',
    documents: [
      { id: 'doc8', name: 'Project Outline.pdf', type: 'PDF', uploadDate: '2024-01-20', size: '1.5 MB' }
    ],
    images: [
      { id: 'img8', name: 'Coral Site Assessment.jpg', uploadDate: '2024-01-20', description: 'Initial site assessment' }
    ],
    timeline: [
      { date: '2024-01-20', title: 'Project Submitted', description: 'Initial project submission', status: 'completed' },
      { date: '2024-01-28', title: 'Document Review', description: 'Technical review in progress', status: 'current' },
      { date: '2024-02-05', title: 'Site Inspection', description: 'Scheduled site inspection', status: 'pending' }
    ]
  },
  {
    id: 'NCCR-2024-005',
    panchayatName: 'Kummakom Gram Panchayat',
    ngoPartner: 'Kerala Backwater Foundation',
    projectType: 'Plantation',
    startDate: '2023-11-15',
    currentStage: 'Monitoring',
    status: 'Completed',
    progress: 95,
    area: 89.1,
    location: 'Vembanad Lake, Kerala',
    description: 'Backwater ecosystem plantation and restoration in Vembanad Lake region.',
    documents: [
      { id: 'doc9', name: 'Completion Report.pdf', type: 'PDF', uploadDate: '2024-01-21', size: '6.3 MB' },
      { id: 'doc10', name: 'Biodiversity Assessment.pdf', type: 'PDF', uploadDate: '2024-01-18', size: '3.9 MB' }
    ],
    images: [
      { id: 'img9', name: 'Plantation Progress.jpg', uploadDate: '2024-01-10', description: 'Mature plantations after 2 months' },
      { id: 'img10', name: 'Ecosystem Recovery.jpg', uploadDate: '2024-01-21', description: 'Evidence of ecosystem recovery' }
    ],
    timeline: [
      { date: '2023-11-15', title: 'Project Started', description: 'Plantation activities commenced', status: 'completed' },
      { date: '2023-12-20', title: 'Phase 1 Complete', description: 'First phase plantation completed', status: 'completed' },
      { date: '2024-01-15', title: 'Implementation Finished', description: 'All plantation work completed', status: 'completed' },
      { date: '2024-01-21', title: 'Final Monitoring', description: 'Final assessment and monitoring', status: 'current' }
    ]
  }
];

const statusConfig = {
  'Pending': { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-500'
  },
  'Ongoing': { 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-500'
  },
  'Completed': { 
    color: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500'
  },
  'Carbon Credit Verified': { 
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500'
  }
};

const projectTypeConfig = {
  'Plantation': { 
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: Leaf
  },
  'Restoration': { 
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Building
  }
};

export function ProjectsRegistry({ onViewProject }: ProjectsRegistryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = 
        project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.panchayatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.ngoPartner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.currentStage.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['Project ID', 'Panchayat Name', 'NGO Partner', 'Project Type', 'Start Date', 'Current Stage', 'Status', 'Progress'];
    const csvContent = [
      headers.join(','),
      ...filteredProjects.map(project => [
        project.id,
        project.panchayatName,
        project.ngoPartner,
        project.projectType,
        project.startDate,
        project.currentStage,
        project.status,
        `${project.progress}%`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nccr-projects-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1>Projects Registry</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProjects.length} of {mockProjects.length} projects
            </p>
          </div>
          
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, panchayats, NGOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {['all', 'Pending', 'Ongoing', 'Completed', 'Carbon Credit Verified'].map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? "bg-primary text-primary-foreground" : ""}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project ID</TableHead>
                <TableHead>Panchayat Name</TableHead>
                <TableHead>NGO Partner</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => {
                const TypeIcon = projectTypeConfig[project.projectType].icon;
                return (
                  <TableRow 
                    key={project.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <TableCell>
                      <div className="font-mono text-sm">{project.id}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{project.panchayatName}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{project.ngoPartner}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={projectTypeConfig[project.projectType].color}
                      >
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {project.projectType}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(project.startDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-20" />
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{project.currentStage}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={statusConfig[project.status].color}
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[project.status].dot}`} />
                        {project.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Project Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:w-[600px] sm:max-w-none overflow-y-auto">
          {selectedProject && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between pr-6">
                  <div>
                    <SheetTitle>{selectedProject.id}</SheetTitle>
                    <SheetDescription className="mt-1">
                      {selectedProject.location} • {selectedProject.area} hectares
                    </SheetDescription>
                  </div>
                  <Badge 
                    variant="outline"
                    className={statusConfig[selectedProject.status].color}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[selectedProject.status].dot}`} />
                    {selectedProject.status}
                  </Badge>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Project Overview */}
                <div className="space-y-4">
                  <h3 className="font-medium">Project Overview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Panchayat:</span>
                      <p className="font-medium">{selectedProject.panchayatName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NGO Partner:</span>
                      <p className="font-medium">{selectedProject.ngoPartner}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Project Type:</span>
                      <p className="font-medium">{selectedProject.projectType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1">{selectedProject.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} />
                  </div>
                </div>

                <Separator />

                {/* Tabs for Documents, Images, Timeline */}
                <Tabs defaultValue="documents" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="documents">
                      <FileText className="w-4 h-4 mr-2" />
                      Documents ({selectedProject.documents.length})
                    </TabsTrigger>
                    <TabsTrigger value="images">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Images ({selectedProject.images.length})
                    </TabsTrigger>
                    <TabsTrigger value="timeline">
                      <Clock className="w-4 h-4 mr-2" />
                      Timeline
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="documents" className="space-y-3">
                    {selectedProject.documents.map((doc) => (
                      <div key={doc.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{doc.name}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center justify-between">
                          <span>{doc.type} • {doc.size}</span>
                          <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="images" className="space-y-3">
                    {selectedProject.images.map((img) => (
                      <div key={img.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{img.name}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{img.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Uploaded {new Date(img.uploadDate).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    {selectedProject.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{item.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
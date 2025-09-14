import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Filter,
  Plus,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  FileText,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface ExpertAssignment {
  id: string;
  projectId: string;
  projectTitle: string;
  expertName: string;
  expertId: string;
  role: 'Drone Specialist' | 'Soil Expert' | 'Water Quality Expert' | 'GPS Surveyor' | 'Marine Biologist';
  assignmentDate: string;
  status: 'Assigned' | 'In Progress' | 'Report Uploaded' | 'Completed';
  contact: {
    phone: string;
    email: string;
  };
  specialization: string;
  experience: string;
  location: string;
  estimatedDuration: string;
  notes: string;
  reports?: Array<{
    id: string;
    title: string;
    uploadDate: string;
    status: 'Draft' | 'Final';
  }>;
}

interface Expert {
  id: string;
  name: string;
  role: 'Drone Specialist' | 'Soil Expert' | 'Water Quality Expert' | 'GPS Surveyor' | 'Marine Biologist';
  specialization: string;
  experience: string;
  location: string;
  availability: 'Available' | 'Busy' | 'On Leave';
  contact: {
    phone: string;
    email: string;
  };
  currentAssignments: number;
  completedProjects: number;
  rating: number;
}

const mockAssignments: ExpertAssignment[] = [
  {
    id: 'ASSIGN-001',
    projectId: 'NCCR-2024-001',
    projectTitle: 'Mangrove Restoration - Sundarbans West',
    expertName: 'Dr. Rajesh Kumar',
    expertId: 'EXP-001',
    role: 'Drone Specialist',
    assignmentDate: '2024-01-25',
    status: 'In Progress',
    contact: {
      phone: '+91-9876543210',
      email: 'rajesh.kumar@nccr.gov.in'
    },
    specialization: 'Aerial Survey & Mapping',
    experience: '8 years',
    location: 'Kolkata, West Bengal',
    estimatedDuration: '5 days',
    notes: 'Focus on mangrove canopy coverage analysis',
    reports: [
      {
        id: 'RPT-001',
        title: 'Preliminary Drone Survey Report',
        uploadDate: '2024-01-28',
        status: 'Draft'
      }
    ]
  },
  {
    id: 'ASSIGN-002',
    projectId: 'NCCR-2024-001',
    projectTitle: 'Mangrove Restoration - Sundarbans West',
    expertName: 'Dr. Meera Patel',
    expertId: 'EXP-002',
    role: 'Soil Expert',
    assignmentDate: '2024-01-26',
    status: 'Report Uploaded',
    contact: {
      phone: '+91-9876543211',
      email: 'meera.patel@nccr.gov.in'
    },
    specialization: 'Coastal Soil Analysis',
    experience: '12 years',
    location: 'Bhubaneswar, Odisha',
    estimatedDuration: '3 days',
    notes: 'Soil pH and salinity analysis required',
    reports: [
      {
        id: 'RPT-002',
        title: 'Soil Quality Assessment Report',
        uploadDate: '2024-01-29',
        status: 'Final'
      }
    ]
  },
  {
    id: 'ASSIGN-003',
    projectId: 'NCCR-2024-002',
    projectTitle: 'Seagrass Conservation - Palk Bay',
    expertName: 'Dr. Arun Sharma',
    expertId: 'EXP-003',
    role: 'Marine Biologist',
    assignmentDate: '2024-01-24',
    status: 'Completed',
    contact: {
      phone: '+91-9876543212',
      email: 'arun.sharma@nccr.gov.in'
    },
    specialization: 'Marine Ecosystem Assessment',
    experience: '15 years',
    location: 'Chennai, Tamil Nadu',
    estimatedDuration: '7 days',
    notes: 'Seagrass species identification and health assessment',
    reports: [
      {
        id: 'RPT-003',
        title: 'Marine Biodiversity Assessment',
        uploadDate: '2024-01-30',
        status: 'Final'
      },
      {
        id: 'RPT-004',
        title: 'Seagrass Health Report',
        uploadDate: '2024-01-30',
        status: 'Final'
      }
    ]
  },
  {
    id: 'ASSIGN-004',
    projectId: 'NCCR-2024-003',
    projectTitle: 'Coastal Wetland Protection - Chilika',
    expertName: 'Prof. Lakshmi Iyer',
    expertId: 'EXP-004',
    role: 'Water Quality Expert',
    assignmentDate: '2024-01-22',
    status: 'Assigned',
    contact: {
      phone: '+91-9876543213',
      email: 'lakshmi.iyer@nccr.gov.in'
    },
    specialization: 'Wetland Water Chemistry',
    experience: '10 years',
    location: 'Bhubaneswar, Odisha',
    estimatedDuration: '4 days',
    notes: 'Water quality parameters and pollution assessment'
  },
  {
    id: 'ASSIGN-005',
    projectId: 'NCCR-2024-004',
    projectTitle: 'Coral Reef Restoration - Gulf of Kachchh',
    expertName: 'Dr. Vikram Singh',
    expertId: 'EXP-005',
    role: 'GPS Surveyor',
    assignmentDate: '2024-01-28',
    status: 'In Progress',
    contact: {
      phone: '+91-9876543214',
      email: 'vikram.singh@nccr.gov.in'
    },
    specialization: 'Precision Mapping & GIS',
    experience: '6 years',
    location: 'Gandhinagar, Gujarat',
    estimatedDuration: '3 days',
    notes: 'High-precision GPS mapping of coral reef boundaries'
  }
];

const mockExperts: Expert[] = [
  {
    id: 'EXP-006',
    name: 'Dr. Sanya Gupta',
    role: 'Drone Specialist',
    specialization: 'Multispectral Imaging',
    experience: '5 years',
    location: 'Mumbai, Maharashtra',
    availability: 'Available',
    contact: {
      phone: '+91-9876543215',
      email: 'sanya.gupta@nccr.gov.in'
    },
    currentAssignments: 0,
    completedProjects: 23,
    rating: 4.8
  },
  {
    id: 'EXP-007',
    name: 'Dr. Ravi Nair',
    role: 'Marine Biologist',
    specialization: 'Coral Reef Ecology',
    experience: '18 years',
    location: 'Kochi, Kerala',
    availability: 'Available',
    contact: {
      phone: '+91-9876543216',
      email: 'ravi.nair@nccr.gov.in'
    },
    currentAssignments: 1,
    completedProjects: 67,
    rating: 4.9
  },
  {
    id: 'EXP-008',
    name: 'Prof. Anita Desai',
    role: 'Soil Expert',
    specialization: 'Mangrove Soil Chemistry',
    experience: '14 years',
    location: 'Goa',
    availability: 'Busy',
    contact: {
      phone: '+91-9876543217',
      email: 'anita.desai@nccr.gov.in'
    },
    currentAssignments: 3,
    completedProjects: 45,
    rating: 4.7
  }
];

const statusConfig = {
  'Assigned': { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  'In Progress': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  'Report Uploaded': { color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500' },
  'Completed': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' }
};

const roleConfig = {
  'Drone Specialist': { color: 'bg-sky-100 text-sky-800' },
  'Soil Expert': { color: 'bg-amber-100 text-amber-800' },
  'Water Quality Expert': { color: 'bg-blue-100 text-blue-800' },
  'GPS Surveyor': { color: 'bg-emerald-100 text-emerald-800' },
  'Marine Biologist': { color: 'bg-teal-100 text-teal-800' }
};

export function FieldExpertAssignments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = 
      assignment.expertName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || assignment.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesProject = projectFilter === 'all' || assignment.projectId === projectFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesProject;
  });

  const uniqueProjects = [...new Set(mockAssignments.map(a => a.projectId))];
  const uniqueRoles = [...new Set(mockAssignments.map(a => a.role))];

  const availableExperts = mockExperts.filter(expert => expert.availability === 'Available');

  const handleAssignExpert = () => {
    if (selectedProject && selectedExpert && estimatedDuration) {
      const expert = mockExperts.find(e => e.id === selectedExpert);
      if (expert) {
        toast.success(`${expert.name} assigned to project ${selectedProject}`);
        setAssignDialogOpen(false);
        setSelectedProject('');
        setSelectedExpert('');
        setAssignmentNotes('');
        setEstimatedDuration('');
      }
    }
  };

  const updateAssignmentStatus = (assignmentId: string, newStatus: ExpertAssignment['status']) => {
    // In real implementation, update backend
    toast.success(`Assignment status updated to ${newStatus}`);
  };

  const getStatusCounts = () => {
    return {
      total: filteredAssignments.length,
      assigned: filteredAssignments.filter(a => a.status === 'Assigned').length,
      inProgress: filteredAssignments.filter(a => a.status === 'In Progress').length,
      reportUploaded: filteredAssignments.filter(a => a.status === 'Report Uploaded').length,
      completed: filteredAssignments.filter(a => a.status === 'Completed').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Field Expert Assignments</h1>
          <p className="text-muted-foreground mt-1">
            {statusCounts.total} assignments • {statusCounts.inProgress} in progress
          </p>
        </div>
        
        <Button onClick={() => setAssignDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Assign New Expert
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.assigned}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.inProgress}</p>
              </div>
              <UserCheck className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reports</p>
                <p className="text-2xl font-bold text-purple-600">{statusCounts.reportUploaded}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search experts, projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Report Uploaded">Report Uploaded</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Project Filter */}
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {uniqueProjects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Available Experts Info */}
            <div className="flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                {availableExperts.length} experts available
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project ID</TableHead>
              <TableHead>Expert Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Assignment Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-mono text-sm">{assignment.projectId}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-48">
                      {assignment.projectTitle}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{assignment.expertName}</div>
                      <div className="text-xs text-muted-foreground">
                        {assignment.specialization}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={roleConfig[assignment.role]}
                  >
                    {assignment.role}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(assignment.assignmentDate).toLocaleDateString('en-IN')}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{assignment.estimatedDuration}</span>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={statusConfig[assignment.status].color}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[assignment.status].dot}`} />
                    {assignment.status}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-xs">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span>{assignment.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span className="truncate max-w-32">{assignment.contact.email}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {assignment.status === 'Assigned' && (
                      <Button
                        size="sm"
                        onClick={() => updateAssignmentStatus(assignment.id, 'In Progress')}
                      >
                        Start
                      </Button>
                    )}
                    {assignment.status === 'In Progress' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAssignmentStatus(assignment.id, 'Report Uploaded')}
                      >
                        Upload Report
                      </Button>
                    )}
                    {assignment.status === 'Report Uploaded' && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateAssignmentStatus(assignment.id, 'Completed')}
                      >
                        Complete
                      </Button>
                    )}
                    {assignment.reports && assignment.reports.length > 0 && (
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Assign Expert Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign New Expert</DialogTitle>
            <DialogDescription>
              Assign a field expert to a project for verification and assessment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-select">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueProjects.map(projectId => (
                      <SelectItem key={projectId} value={projectId}>{projectId}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 days"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="expert-select">Available Experts</Label>
              <Select value={selectedExpert} onValueChange={setSelectedExpert}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expert" />
                </SelectTrigger>
                <SelectContent>
                  {availableExperts.map(expert => (
                    <SelectItem key={expert.id} value={expert.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{expert.name}</span>
                        <Badge variant="outline" className={`ml-2 ${roleConfig[expert.role]}`}>
                          {expert.role}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedExpert && (
              <Card>
                <CardContent className="p-4">
                  {(() => {
                    const expert = availableExperts.find(e => e.id === selectedExpert);
                    return expert ? (
                      <div className="space-y-3">
                        <h4 className="font-medium">Expert Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Specialization:</span>
                            <p>{expert.specialization}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Experience:</span>
                            <p>{expert.experience}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p>{expert.location}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rating:</span>
                            <p>{expert.rating}/5.0 ⭐</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Completed Projects:</span>
                            <p>{expert.completedProjects}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current Load:</span>
                            <p>{expert.currentAssignments} assignments</p>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}

            <div>
              <Label htmlFor="notes">Assignment Notes</Label>
              <Textarea
                id="notes"
                placeholder="Special instructions or requirements for this assignment..."
                value={assignmentNotes}
                onChange={(e) => setAssignmentNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignExpert}
              disabled={!selectedProject || !selectedExpert || !estimatedDuration}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Expert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
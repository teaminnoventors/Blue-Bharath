import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UserCheck, 
  Users, 
  Calendar,
  MapPin,
  Award,
  Clock,
  CheckCircle,
  Plane
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface ExpertReviewDetailProps {
  project: any;
  onBack: () => void;
  onStatusUpdate: (status: string) => void;
}

const mockExperts = [
  {
    id: 'TEAM-001',
    name: 'Marine Ecosystem Team Alpha',
    lead: 'Dr. Rajesh Kumar',
    specialists: ['Drone Specialist', 'Marine Biologist', 'GIS Expert'],
    experience: '8+ years',
    availability: 'Available',
    currentProjects: 2,
    completedProjects: 23,
    rating: 4.8,
    location: 'Kolkata, West Bengal',
    estimatedDuration: '5-7 days',
    expertise: ['Mangrove Restoration', 'Coastal Mapping', 'Biodiversity Assessment']
  },
  {
    id: 'TEAM-002',
    name: 'Coastal Restoration Team Beta',
    lead: 'Dr. Meera Patel',
    specialists: ['Soil Expert', 'Water Quality Expert', 'Field Surveyor'],
    experience: '12+ years',
    availability: 'Available',
    currentProjects: 1,
    completedProjects: 34,
    rating: 4.9,
    location: 'Bhubaneswar, Odisha',
    estimatedDuration: '4-6 days',
    expertise: ['Salt Marsh Restoration', 'Soil Analysis', 'Hydrology']
  },
  {
    id: 'TEAM-003',
    name: 'Advanced Monitoring Unit',
    lead: 'Prof. Arun Sharma',
    specialists: ['Drone Specialist', 'Remote Sensing Expert', 'Data Analyst'],
    experience: '15+ years',
    availability: 'Busy',
    currentProjects: 4,
    completedProjects: 67,
    rating: 4.7,
    location: 'Chennai, Tamil Nadu',
    estimatedDuration: '6-8 days',
    expertise: ['Seagrass Monitoring', 'Satellite Analysis', 'Coral Assessment']
  }
];

const projectTimeline = [
  { stage: 'Initial Approval', status: 'completed', date: '2023-12-15' },
  { stage: 'Panchayat Submission', status: 'completed', date: '2024-01-05' },
  { stage: 'Plantation Started', status: 'completed', date: '2024-01-12' },
  { stage: 'Progress Updates', status: 'completed', date: '2024-01-30' },
  { stage: 'Ready for Expert Review', status: 'current', date: '2024-01-30' },
  { stage: 'Expert Assignment', status: 'pending', date: 'TBD' },
  { stage: 'Field Assessment', status: 'pending', date: 'TBD' },
  { stage: 'Expert Report', status: 'pending', date: 'TBD' }
];

export function ExpertReviewDetail({ project, onBack, onStatusUpdate }: ExpertReviewDetailProps) {
  const [selectedExpert, setSelectedExpert] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignExpert = async () => {
    if (!selectedExpert) {
      toast.error('Please select an expert team');
      return;
    }

    const expert = mockExperts.find(e => e.id === selectedExpert);
    if (!expert) return;

    setIsAssigning(true);
    
    // Simulate assignment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`${expert.name} assigned successfully! Project moved to Expert Review stage.`);
    onStatusUpdate('Experts Assigned');
    setIsAssigning(false);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'text-green-600';
      case 'Busy': return 'text-orange-600';
      case 'Unavailable': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg">
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
              <h1 className="text-white text-2xl font-medium">Expert Review Assignment</h1>
              <p className="text-purple-100">{project.title} • {project.projectId}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            Ready for Expert Assignment
          </Badge>
        </div>
      </div>

      {/* Project Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
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
              <Clock className="w-5 h-5 text-primary" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Current Stage</p>
              <p className="font-medium">Ready for Expert Review</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Last Update</p>
              <p className="font-medium">{new Date(project.lastUpdate).toLocaleDateString('en-IN')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              Expert Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Required Expertise</p>
              <p className="font-medium">{project.metadata?.expertRequired || 'Marine Ecosystem Assessment'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Duration</p>
              <p className="font-medium">{project.metadata?.estimatedDuration || '5-7 days'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority Level</p>
              <Badge variant="outline" className={
                project.priority === 'High' ? 'bg-red-100 text-red-800' :
                project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }>
                {project.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Project Timeline - Ready for Expert Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectTimeline.map((item, index) => (
              <div key={item.stage} className="relative flex items-center gap-4">
                {/* Timeline Line */}
                {index < projectTimeline.length - 1 && (
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-primary/30" />
                )}
                
                {/* Timeline Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : item.status === 'current'
                    ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-100'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : item.status === 'current' ? (
                    <Clock className="w-6 h-6" />
                  ) : (
                    <Calendar className="w-6 h-6" />
                  )}
                </div>
                
                {/* Timeline Content */}
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    item.status === 'current' ? 'text-blue-600' : 
                    item.status === 'completed' ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {item.stage}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.date === 'TBD' ? 'To be determined' : new Date(item.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Assignment */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-primary" />
            Assign Expert Team / Drone Team
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Expert Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Expert Team:</label>
              <Select value={selectedExpert} onValueChange={setSelectedExpert}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an expert team for this project" />
                </SelectTrigger>
                <SelectContent>
                  {mockExperts.map((expert) => (
                    <SelectItem key={expert.id} value={expert.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{expert.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            expert.availability === 'Available' ? 'bg-green-100 text-green-800' :
                            expert.availability === 'Busy' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {expert.availability}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Expert Details */}
            {selectedExpert && (
              <Card className="bg-blue-50/50 border-blue-200">
                <CardContent className="p-4">
                  {(() => {
                    const expert = mockExperts.find(e => e.id === selectedExpert);
                    if (!expert) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{expert.name}</h3>
                            <p className="text-sm text-muted-foreground">Led by {expert.lead}</p>
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
                              <span className="text-sm text-muted-foreground ml-1">
                                ({expert.rating})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Team Specialists:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {expert.specialists.map((specialist) => (
                                <Badge key={specialist} variant="outline" className="text-xs">
                                  {specialist}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Expertise Areas:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {expert.expertise.map((area) => (
                                <Badge key={area} variant="outline" className="text-xs bg-green-100 text-green-800">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Experience:</p>
                            <p className="font-medium">{expert.experience}</p>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Location:</p>
                            <p className="font-medium">{expert.location}</p>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Current Load:</p>
                            <p className="font-medium">{expert.currentProjects} active projects</p>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Estimated Duration:</p>
                            <p className="font-medium">{expert.estimatedDuration}</p>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Track Record:</p>
                            <p className="font-medium">{expert.completedProjects} completed projects</p>
                          </div>
                          
                          <div>
                            <p className="text-muted-foreground">Availability:</p>
                            <p className={`font-medium ${getAvailabilityColor(expert.availability)}`}>
                              {expert.availability}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          <Separator />

          {/* Assignment Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleAssignExpert}
              disabled={!selectedExpert || isAssigning}
              className="px-8 py-3 bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isAssigning ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Assigning Expert Team...
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Assign Expert Team
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Post-Assignment Status */}
      <Card className="bg-green-50/50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <Award className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="font-medium text-green-800">Next Steps After Assignment</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Once you assign an expert team, the project will move to the "Expert Review" stage in the timeline. 
              The assigned team will receive notifications and begin their field assessment within 24-48 hours.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>• Expert team notification</span>
              <span>• Field visit scheduling</span>
              <span>• Progress tracking updates</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
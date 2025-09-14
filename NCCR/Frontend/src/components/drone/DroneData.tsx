import React, { useState } from 'react';
import { 
  Upload, 
  Play, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Filter,
  Search,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  FileVideo,
  Camera
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface DroneMedia {
  id: string;
  projectId: string;
  projectTitle: string;
  fileName: string;
  fileType: 'Photo' | 'Video';
  uploadDate: string;
  uploadedBy: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  fileSize: string;
  duration?: string; // for videos
  gpsCoordinates: { lat: number; lng: number };
  altitude: number;
  resolution: string;
  expertComments: string;
  thumbnailUrl?: string;
  metadata: {
    camera: string;
    weather: string;
    visibility: string;
    flightHeight: number;
  };
}

const mockDroneMedia: DroneMedia[] = [
  {
    id: 'DRONE-001',
    projectId: 'NCCR-2024-001',
    projectTitle: 'Mangrove Restoration - Sundarbans West',
    fileName: 'mangrove_survey_site1.jpg',
    fileType: 'Photo',
    uploadDate: '2024-01-28',
    uploadedBy: 'Drone Team Alpha',
    status: 'Verified',
    fileSize: '12.4 MB',
    gpsCoordinates: { lat: 21.9162, lng: 88.4431 },
    altitude: 120,
    resolution: '4K (3840x2160)',
    expertComments: 'Excellent coverage of the restoration area. Clear visibility of mangrove saplings.',
    metadata: {
      camera: 'DJI Phantom 4 Pro',
      weather: 'Clear',
      visibility: 'Excellent (>10km)',
      flightHeight: 120
    }
  },
  {
    id: 'DRONE-002',
    projectId: 'NCCR-2024-001',
    projectTitle: 'Mangrove Restoration - Sundarbans West',
    fileName: 'mangrove_timelapse_growth.mp4',
    fileType: 'Video',
    uploadDate: '2024-01-27',
    uploadedBy: 'Drone Team Alpha',
    status: 'Pending',
    fileSize: '156.8 MB',
    duration: '5:23',
    gpsCoordinates: { lat: 21.9158, lng: 88.4435 },
    altitude: 100,
    resolution: '4K (3840x2160)',
    expertComments: '',
    metadata: {
      camera: 'DJI Mavic Air 2',
      weather: 'Partly Cloudy',
      visibility: 'Good (5-10km)',
      flightHeight: 100
    }
  },
  {
    id: 'DRONE-003',
    projectId: 'NCCR-2024-002',
    projectTitle: 'Seagrass Conservation - Palk Bay',
    fileName: 'seagrass_underwater_survey.jpg',
    fileType: 'Photo',
    uploadDate: '2024-01-26',
    uploadedBy: 'Marine Survey Team',
    status: 'Verified',
    fileSize: '8.7 MB',
    gpsCoordinates: { lat: 9.2876, lng: 79.3129 },
    altitude: 50,
    resolution: '2.7K (2720x1530)',
    expertComments: 'Good underwater visibility. Seagrass beds clearly visible.',
    metadata: {
      camera: 'DJI Mini 3',
      weather: 'Clear',
      visibility: 'Good (5-10km)',
      flightHeight: 50
    }
  },
  {
    id: 'DRONE-004',
    projectId: 'NCCR-2024-003',
    projectTitle: 'Coastal Wetland Protection - Chilika',
    fileName: 'wetland_bird_activity.mp4',
    fileType: 'Video',
    uploadDate: '2024-01-25',
    uploadedBy: 'Wildlife Documentation Team',
    status: 'Rejected',
    fileSize: '89.2 MB',
    duration: '3:45',
    gpsCoordinates: { lat: 19.7018, lng: 85.4775 },
    altitude: 80,
    resolution: '1080p (1920x1080)',
    expertComments: 'Poor lighting conditions affect visibility. Recommend retaking during golden hour.',
    metadata: {
      camera: 'DJI Air 2S',
      weather: 'Overcast',
      visibility: 'Poor (<5km)',
      flightHeight: 80
    }
  },
  {
    id: 'DRONE-005',
    projectId: 'NCCR-2024-004',
    projectTitle: 'Coral Reef Restoration - Gulf of Kachchh',
    fileName: 'coral_reef_baseline.jpg',
    fileType: 'Photo',
    uploadDate: '2024-01-24',
    uploadedBy: 'Marine Research Team',
    status: 'Pending',
    fileSize: '15.2 MB',
    gpsCoordinates: { lat: 22.4707, lng: 69.0784 },
    altitude: 30,
    resolution: '4K (3840x2160)',
    expertComments: '',
    metadata: {
      camera: 'DJI Phantom 4 RTK',
      weather: 'Clear',
      visibility: 'Excellent (>10km)',
      flightHeight: 30
    }
  },
  {
    id: 'DRONE-006',
    projectId: 'NCCR-2024-005',
    projectTitle: 'Backwater Plantation - Vembanad',
    fileName: 'backwater_ecosystem_monitoring.mp4',
    fileType: 'Video',
    uploadDate: '2024-01-23',
    uploadedBy: 'Ecosystem Monitoring Team',
    status: 'Verified',
    fileSize: '203.5 MB',
    duration: '8:12',
    gpsCoordinates: { lat: 9.5916, lng: 76.4130 },
    altitude: 150,
    resolution: '4K (3840x2160)',
    expertComments: 'Comprehensive ecosystem coverage. Excellent documentation of plantation progress.',
    metadata: {
      camera: 'DJI Inspire 2',
      weather: 'Clear',
      visibility: 'Excellent (>10km)',
      flightHeight: 150
    }
  }
];

const statusConfig = {
  'Pending': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500', icon: Clock },
  'Verified': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500', icon: CheckCircle },
  'Rejected': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500', icon: XCircle }
};

export function DroneData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<DroneMedia | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [expertComment, setExpertComment] = useState('');

  const filteredMedia = mockDroneMedia.filter(media => {
    const matchesSearch = 
      media.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProject = projectFilter === 'all' || media.projectId === projectFilter;
    const matchesStatus = statusFilter === 'all' || media.status === statusFilter;
    const matchesType = typeFilter === 'all' || media.fileType === typeFilter;
    
    return matchesSearch && matchesProject && matchesStatus && matchesType;
  });

  const uniqueProjects = [...new Set(mockDroneMedia.map(m => m.projectId))];

  const handleMediaClick = (media: DroneMedia) => {
    setSelectedMedia(media);
    setExpertComment(media.expertComments);
    setViewerOpen(true);
  };

  const handleStatusUpdate = (status: 'Verified' | 'Rejected') => {
    if (selectedMedia) {
      // In real implementation, update backend
      toast.success(`Media ${selectedMedia.fileName} marked as ${status.toLowerCase()}`);
      setViewerOpen(false);
    }
  };

  const handleUploadDroneData = () => {
    setUploadOpen(true);
  };

  const getStatusCounts = () => {
    return {
      total: filteredMedia.length,
      pending: filteredMedia.filter(m => m.status === 'Pending').length,
      verified: filteredMedia.filter(m => m.status === 'Verified').length,
      rejected: filteredMedia.filter(m => m.status === 'Rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Drone Data Management</h1>
          <p className="text-muted-foreground mt-1">
            {statusCounts.total} media files • {statusCounts.pending} pending review
          </p>
        </div>
        
        <Button onClick={handleUploadDroneData} className="bg-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Drone Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
              <Camera className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
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
                placeholder="Search files, projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Project Filter */}
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {uniqueProjects.map(projectId => (
                  <SelectItem key={projectId} value={projectId}>{projectId}</SelectItem>
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Photo">Photos</SelectItem>
                <SelectItem value="Video">Videos</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setProjectFilter('all');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((media) => {
          const StatusIcon = statusConfig[media.status].icon;
          return (
            <Card 
              key={media.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleMediaClick(media)}
            >
              <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                {/* Media Preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {media.fileType === 'Photo' ? (
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileVideo className="w-12 h-12 text-muted-foreground" />
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
                        {media.duration}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={statusConfig[media.status].color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {media.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-sm truncate">{media.fileName}</h3>
                  <p className="text-xs text-muted-foreground">{media.projectTitle}</p>
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{media.fileType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Size:</span>
                    <span>{media.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Resolution:</span>
                    <span>{media.resolution}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Uploaded:</span>
                    <span>{new Date(media.uploadDate).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {media.gpsCoordinates.lat.toFixed(4)}, {media.gpsCoordinates.lng.toFixed(4)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No drone data found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || projectFilter !== 'all' || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters to see more files.'
                : 'Upload drone imagery to get started.'
              }
            </p>
            <Button onClick={handleUploadDroneData}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Drone Data
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Media Viewer Dialog */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedMedia && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMedia.fileName}</DialogTitle>
                <DialogDescription>
                  {selectedMedia.projectTitle} • {selectedMedia.projectId}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Media Viewer */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {selectedMedia.fileType === 'Photo' ? (
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">High-resolution image preview</p>
                        <p className="text-xs text-muted-foreground">{selectedMedia.resolution}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Video player</p>
                        <p className="text-xs text-muted-foreground">Duration: {selectedMedia.duration}</p>
                      </div>
                    )}
                  </div>

                  {/* GPS Mini Map */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">GPS Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[2/1] bg-gradient-to-br from-blue-50 to-green-50 rounded relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium">
                              {selectedMedia.gpsCoordinates.lat.toFixed(6)}, {selectedMedia.gpsCoordinates.lng.toFixed(6)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Altitude: {selectedMedia.altitude}m
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Metadata & Comments */}
                <div className="space-y-4">
                  {/* File Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">File Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{selectedMedia.fileType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{selectedMedia.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uploaded:</span>
                        <span>{new Date(selectedMedia.uploadDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">By:</span>
                        <span>{selectedMedia.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={statusConfig[selectedMedia.status].color}>
                          {selectedMedia.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Metadata */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Flight Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Camera:</span>
                        <span>{selectedMedia.metadata.camera}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weather:</span>
                        <span>{selectedMedia.metadata.weather}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visibility:</span>
                        <span>{selectedMedia.metadata.visibility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Flight Height:</span>
                        <span>{selectedMedia.metadata.flightHeight}m</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expert Comments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Expert Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        value={expertComment}
                        onChange={(e) => setExpertComment(e.target.value)}
                        placeholder="Add expert review comments..."
                        rows={4}
                      />
                      
                      {selectedMedia.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusUpdate('Verified')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleStatusUpdate('Rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Drone Data</DialogTitle>
            <DialogDescription>
              Upload drone imagery and videos for project verification
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, MP4, MOV (Max 500MB each)
              </p>
              <Button variant="outline" className="mt-3">
                Choose Files
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-select">Project</Label>
                <Select>
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
                <Label htmlFor="team-select">Upload Team</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha">Drone Team Alpha</SelectItem>
                    <SelectItem value="beta">Drone Team Beta</SelectItem>
                    <SelectItem value="marine">Marine Survey Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Files uploaded successfully');
              setUploadOpen(false);
            }}>
              Upload Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
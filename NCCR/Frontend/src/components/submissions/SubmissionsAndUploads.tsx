import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Building
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
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface Submission {
  id: string;
  projectId: string;
  projectTitle: string;
  fileName: string;
  fileType: 'Image' | 'Video' | 'Document';
  fileSize: string;
  uploadedBy: string;
  uploaderType: 'Panchayat' | 'NGO';
  uploadDate: string;
  status: 'Pending Review' | 'Accepted' | 'Rejected' | 'Needs Clarification';
  description: string;
  reviewNotes: string;
  fileCategory: 'Project Proposal' | 'Site Documentation' | 'Progress Update' | 'Compliance Document' | 'Media Evidence';
  metadata?: {
    resolution?: string;
    duration?: string;
    gpsCoordinates?: { lat: number; lng: number };
    timestamp?: string;
  };
}

const mockSubmissions: Submission[] = [
  {
    id: 'SUB-001',
    projectId: 'NCCR-2024-006',
    projectTitle: 'Coastal Mangrove Restoration - Sundarbans East',
    fileName: 'site_assessment_photos.zip',
    fileType: 'Image',
    fileSize: '45.2 MB',
    uploadedBy: 'Patharpratima Gram Panchayat',
    uploaderType: 'Panchayat',
    uploadDate: '2024-01-29',
    status: 'Pending Review',
    description: 'Initial site assessment photographs showing current condition of restoration area',
    reviewNotes: '',
    fileCategory: 'Site Documentation',
    metadata: {
      resolution: '4K (3840x2160)',
      gpsCoordinates: { lat: 21.8162, lng: 88.5431 },
      timestamp: '2024-01-29T10:30:00Z'
    }
  },
  {
    id: 'SUB-002',
    projectId: 'NCCR-2024-007',
    projectTitle: 'Seagrass Meadow Enhancement - Palk Strait',
    fileName: 'project_proposal_v2.pdf',
    fileType: 'Document',
    fileSize: '8.7 MB',
    uploadedBy: 'Tamil Nadu Marine Foundation',
    uploaderType: 'NGO',
    uploadDate: '2024-01-28',
    status: 'Accepted',
    description: 'Revised project proposal with updated methodology and timeline',
    reviewNotes: 'All required sections completed. Methodology approved.',
    fileCategory: 'Project Proposal'
  },
  {
    id: 'SUB-003',
    projectId: 'NCCR-2024-008',
    projectTitle: 'Salt Marsh Restoration - Little Rann',
    fileName: 'environmental_clearance.pdf',
    fileType: 'Document',
    fileSize: '3.2 MB',
    uploadedBy: 'Gujarat Coastal Initiative',
    uploaderType: 'NGO',
    uploadDate: '2024-01-27',
    status: 'Needs Clarification',
    description: 'Environmental clearance certificate from state pollution control board',
    reviewNotes: 'Document appears to be incomplete. Missing signature on page 3.',
    fileCategory: 'Compliance Document'
  },
  {
    id: 'SUB-004',
    projectId: 'NCCR-2024-009',
    projectTitle: 'Coral Reef Rehabilitation - Lakshadweep',
    fileName: 'baseline_survey_video.mp4',
    fileType: 'Video',
    fileSize: '156.8 MB',
    uploadedBy: 'Kavaratti Island Panchayat',
    uploaderType: 'Panchayat',
    uploadDate: '2024-01-26',
    status: 'Accepted',
    description: 'Underwater baseline survey video showing current coral reef condition',
    reviewNotes: 'Excellent quality footage. Baseline condition clearly documented.',
    fileCategory: 'Media Evidence',
    metadata: {
      resolution: '4K (3840x2160)',
      duration: '12:45',
      gpsCoordinates: { lat: 10.5593, lng: 72.6422 },
      timestamp: '2024-01-26T08:15:00Z'
    }
  },
  {
    id: 'SUB-005',
    projectId: 'NCCR-2024-010',
    projectTitle: 'Backwater Plantation Drive - Kuttanad',
    fileName: 'community_participation_report.pdf',
    fileType: 'Document',
    fileSize: '12.4 MB',
    uploadedBy: 'Kerala Backwater Alliance',
    uploaderType: 'NGO',
    uploadDate: '2024-01-25',
    status: 'Rejected',
    description: 'Report on community participation and stakeholder engagement',
    reviewNotes: 'Report lacks required demographic data and participation metrics.',
    fileCategory: 'Progress Update'
  },
  {
    id: 'SUB-006',
    projectId: 'NCCR-2024-011',
    projectTitle: 'Estuary Conservation - Godavari Delta',
    fileName: 'weekly_progress_photos.zip',
    fileType: 'Image',
    fileSize: '23.6 MB',
    uploadedBy: 'Konaseema Gram Panchayat',
    uploaderType: 'Panchayat',
    uploadDate: '2024-01-24',
    status: 'Pending Review',
    description: 'Weekly progress documentation showing plantation activities',
    reviewNotes: '',
    fileCategory: 'Progress Update',
    metadata: {
      resolution: '2.7K (2720x1530)',
      gpsCoordinates: { lat: 16.5062, lng: 81.8040 },
      timestamp: '2024-01-24T14:20:00Z'
    }
  },
  {
    id: 'SUB-007',
    projectId: 'NCCR-2024-001',
    projectTitle: 'Mangrove Restoration - Sundarbans West',
    fileName: 'soil_analysis_report.pdf',
    fileType: 'Document',
    fileSize: '5.8 MB',
    uploadedBy: 'Sundarbans Conservation Society',
    uploaderType: 'NGO',
    uploadDate: '2024-01-23',
    status: 'Accepted',
    description: 'Detailed soil analysis report for restoration site',
    reviewNotes: 'Comprehensive analysis with all required parameters.',
    fileCategory: 'Site Documentation'
  },
  {
    id: 'SUB-008',
    projectId: 'NCCR-2024-002',
    projectTitle: 'Seagrass Conservation - Palk Bay',
    fileName: 'monitoring_timelapse.mp4',
    fileType: 'Video',
    fileSize: '89.3 MB',
    uploadedBy: 'Rameswaram Gram Panchayat',
    uploaderType: 'Panchayat',
    uploadDate: '2024-01-22',
    status: 'Pending Review',
    description: 'Time-lapse video showing seagrass growth over 2 weeks',
    reviewNotes: '',
    fileCategory: 'Progress Update',
    metadata: {
      resolution: '1080p (1920x1080)',
      duration: '3:20',
      gpsCoordinates: { lat: 9.2876, lng: 79.3129 },
      timestamp: '2024-01-22T16:45:00Z'
    }
  }
];

const statusConfig = {
  'Pending Review': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500', icon: Clock },
  'Accepted': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500', icon: CheckCircle },
  'Rejected': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500', icon: XCircle },
  'Needs Clarification': { color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500', icon: Eye }
};

const fileTypeConfig = {
  'Image': { icon: ImageIcon, color: 'text-green-600' },
  'Video': { icon: Video, color: 'text-blue-600' },
  'Document': { icon: FileText, color: 'text-purple-600' }
};

const categoryConfig = {
  'Project Proposal': { color: 'bg-blue-100 text-blue-800' },
  'Site Documentation': { color: 'bg-green-100 text-green-800' },
  'Progress Update': { color: 'bg-purple-100 text-purple-800' },
  'Compliance Document': { color: 'bg-orange-100 text-orange-800' },
  'Media Evidence': { color: 'bg-teal-100 text-teal-800' }
};

export function SubmissionsAndUploads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [uploaderFilter, setUploaderFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = 
      submission.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesType = typeFilter === 'all' || submission.fileType === typeFilter;
    const matchesUploader = uploaderFilter === 'all' || submission.uploaderType === uploaderFilter;
    const matchesCategory = categoryFilter === 'all' || submission.fileCategory === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesUploader && matchesCategory;
  });

  const uniqueCategories = [...new Set(mockSubmissions.map(s => s.fileCategory))];

  const handlePreview = (submission: Submission) => {
    setSelectedSubmission(submission);
    setPreviewOpen(true);
  };

  const handleReview = (submission: Submission) => {
    setSelectedSubmission(submission);
    setReviewNotes(submission.reviewNotes);
    setReviewOpen(true);
  };

  const handleAccept = () => {
    if (selectedSubmission) {
      toast.success(`Submission ${selectedSubmission.fileName} accepted`);
      setReviewOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedSubmission && reviewNotes.trim()) {
      toast.success(`Submission ${selectedSubmission.fileName} rejected with feedback`);
      setReviewOpen(false);
    }
  };

  const handleRequestClarification = () => {
    if (selectedSubmission && reviewNotes.trim()) {
      toast.success(`Clarification requested for ${selectedSubmission.fileName}`);
      setReviewOpen(false);
    }
  };

  const getStatusCounts = () => {
    return {
      total: filteredSubmissions.length,
      pending: filteredSubmissions.filter(s => s.status === 'Pending Review').length,
      accepted: filteredSubmissions.filter(s => s.status === 'Accepted').length,
      rejected: filteredSubmissions.filter(s => s.status === 'Rejected').length,
      clarification: filteredSubmissions.filter(s => s.status === 'Needs Clarification').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Submissions & Uploads</h1>
          <p className="text-muted-foreground mt-1">
            {statusCounts.total} submissions • {statusCounts.pending} pending review
          </p>
        </div>
        
        <Button className="bg-primary">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Process
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
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
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.accepted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clarification</p>
                <p className="text-2xl font-bold text-orange-600">{statusCounts.clarification}</p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Needs Clarification">Needs Clarification</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Image">Images</SelectItem>
                <SelectItem value="Video">Videos</SelectItem>
                <SelectItem value="Document">Documents</SelectItem>
              </SelectContent>
            </Select>

            {/* Uploader Filter */}
            <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Uploaders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Uploaders</SelectItem>
                <SelectItem value="Panchayat">Panchayats</SelectItem>
                <SelectItem value="NGO">NGOs</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setUploaderFilter('all');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Submission ID</TableHead>
              <TableHead>Project ID</TableHead>
              <TableHead>File Details</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => {
              const FileIcon = fileTypeConfig[submission.fileType].icon;
              const StatusIcon = statusConfig[submission.status].icon;
              
              return (
                <TableRow key={submission.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-mono text-sm">{submission.id}</div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-mono text-sm">{submission.projectId}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-32">
                        {submission.projectTitle}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-start space-x-2">
                      <FileIcon className={`w-4 h-4 mt-0.5 ${fileTypeConfig[submission.fileType].color}`} />
                      <div>
                        <div className="font-medium text-sm truncate max-w-40">
                          {submission.fileName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {submission.fileType} • {submission.fileSize}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {submission.uploaderType === 'Panchayat' ? (
                        <User className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Building className="w-4 h-4 text-muted-foreground" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{submission.uploadedBy}</div>
                        <div className="text-xs text-muted-foreground">{submission.uploaderType}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={categoryConfig[submission.fileCategory]}
                    >
                      {submission.fileCategory}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(submission.uploadDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={statusConfig[submission.status].color}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {submission.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handlePreview(submission)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {submission.status === 'Pending Review' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleReview(submission)}
                        >
                          Review
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSubmission.fileName}</DialogTitle>
                <DialogDescription>
                  {selectedSubmission.projectId} • {selectedSubmission.fileCategory}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Preview */}
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {(() => {
                      const FileIcon = fileTypeConfig[selectedSubmission.fileType].icon;
                      return (
                        <div className="text-center">
                          <FileIcon className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {selectedSubmission.fileType} Preview
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedSubmission.fileSize}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-2">Description:</p>
                    <p>{selectedSubmission.description}</p>
                  </div>
                </div>

                {/* File Details */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">File Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uploaded by:</span>
                        <span>{selectedSubmission.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{selectedSubmission.uploaderType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(selectedSubmission.uploadDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={statusConfig[selectedSubmission.status].color}>
                          {selectedSubmission.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedSubmission.metadata && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Metadata</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {selectedSubmission.metadata.resolution && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Resolution:</span>
                            <span>{selectedSubmission.metadata.resolution}</span>
                          </div>
                        )}
                        {selectedSubmission.metadata.duration && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{selectedSubmission.metadata.duration}</span>
                          </div>
                        )}
                        {selectedSubmission.metadata.gpsCoordinates && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">GPS:</span>
                            <span>
                              {selectedSubmission.metadata.gpsCoordinates.lat.toFixed(4)}, 
                              {selectedSubmission.metadata.gpsCoordinates.lng.toFixed(4)}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {selectedSubmission.reviewNotes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Review Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedSubmission.reviewNotes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                  Close
                </Button>
                {selectedSubmission.status === 'Pending Review' && (
                  <Button onClick={() => handleReview(selectedSubmission)}>
                    Review Submission
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>Review Submission</DialogTitle>
                <DialogDescription>
                  {selectedSubmission.fileName} from {selectedSubmission.uploadedBy}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea
                    id="review-notes"
                    placeholder="Add review comments..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setReviewOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRequestClarification}
                  disabled={!reviewNotes.trim()}
                >
                  Request Clarification
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleReject}
                  disabled={!reviewNotes.trim()}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleAccept}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
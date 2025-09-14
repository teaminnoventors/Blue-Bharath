import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Camera, 
  Shield,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  UserCheck,
  Send,
  Award,
  Hash,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const mockProject = {
  id: 'PROJ-2024-001',
  title: 'Mangrove Restoration - Sundarbans West',
  status: 'pending_verification',
  submissionDate: '2024-01-15',
  lastUpdate: '2024-01-18',
  
  // Project Details
  panchayat: {
    name: 'Gosaba Gram Panchayat',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    contact: '+91-9876543210',
    email: 'gosaba.gp@wb.gov.in'
  },
  ngo: {
    name: 'Sundarbans Conservation Society',
    contact: 'Dr. Mamata Roy',
    phone: '+91-9876543211',
    email: 'info@sundarbansconservation.org',
    registration: 'NGO-WB-2019-001234'
  },
  
  // Geographic Details
  coordinates: {
    latitude: 21.9162,
    longitude: 88.4431,
    boundingBox: '21.910,88.440,21.920,88.445'
  },
  area: 45.2,
  ecosystem: 'Mangrove',
  workerCount: 120,
  
  // Verification Details
  assignedVerifier: 'Dr. Rajesh Kumar',
  qualityScore: 85,
  priority: 'high',
  
  // Media & Attachments
  mediaCount: 47,
  documentCount: 8,
  
  // Blockchain
  onChainHash: '0x742d35cc6c8b3b1e96e5f5e4f8d2a1b3c4e5f6a7b8c9d0',
  transactionIds: [
    '0x1234567890abcdef1234567890abcdef12345678',
    '0x234567890abcdef1234567890abcdef123456789'
  ],
  
  // Workflow Status
  workflowStages: [
    { stage: 'Submitted', completed: true, date: '2024-01-15' },
    { stage: 'Initial Review', completed: true, date: '2024-01-16' },
    { stage: 'Field Verification', completed: false, date: null },
    { stage: 'Final Approval', completed: false, date: null },
    { stage: 'Credit Issuance', completed: false, date: null }
  ]
};

const mockMediaItems = [
  {
    id: 'media-001',
    type: 'image',
    filename: 'mangrove_site_overview.jpg',
    uploadDate: '2024-01-15T10:30:00Z',
    uploader: 'Gosaba GP Field Team',
    gpsCoords: '21.9162, 88.4431',
    timestamp: '2024-01-15T10:30:00Z',
    perceptualHash: 'a1b2c3d4e5f6',
    aiFlags: [],
    verified: false,
    verifierNotes: ''
  },
  {
    id: 'media-002',
    type: 'image',
    filename: 'worker_group_photo.jpg',
    uploadDate: '2024-01-15T11:15:00Z',
    uploader: 'Gosaba GP Field Team',
    gpsCoords: '21.9165, 88.4428',
    timestamp: '2024-01-15T11:15:00Z',
    perceptualHash: 'b2c3d4e5f6g7',
    aiFlags: ['low_confidence_location'],
    verified: false,
    verifierNotes: ''
  },
  {
    id: 'media-003',
    type: 'image',
    filename: 'before_restoration.jpg',
    uploadDate: '2024-01-15T14:20:00Z',
    uploader: 'Sundarbans Conservation Society',
    gpsCoords: '21.9158, 88.4435',
    timestamp: '2024-01-15T14:20:00Z',
    perceptualHash: 'c3d4e5f6g7h8',
    aiFlags: ['potential_editing'],
    verified: false,
    verifierNotes: ''
  }
];

const auditTrail = [
  {
    action: 'Project Submitted',
    user: 'Gosaba GP System',
    timestamp: '2024-01-15T09:00:00Z',
    details: 'Project submitted with 47 media files and 8 documents'
  },
  {
    action: 'Initial AI Analysis Complete',
    user: 'System',
    timestamp: '2024-01-15T09:30:00Z',
    details: '3 media items flagged for manual review'
  },
  {
    action: 'Project Assigned',
    user: 'Admin',
    timestamp: '2024-01-16T10:00:00Z',
    details: 'Assigned to Dr. Rajesh Kumar for verification'
  },
  {
    action: 'Status Updated',
    user: 'Dr. Rajesh Kumar',
    timestamp: '2024-01-18T15:30:00Z',
    details: 'Marked for field visit scheduling'
  }
];

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [verifierNotes, setVerifierNotes] = useState<Record<string, string>>({});
  const [verifiedItems, setVerifiedItems] = useState<Set<string>>(new Set());

  const handleVerifyMedia = (mediaId: string, verified: boolean) => {
    if (verified) {
      setVerifiedItems(new Set([...verifiedItems, mediaId]));
    } else {
      const newVerified = new Set(verifiedItems);
      newVerified.delete(mediaId);
      setVerifiedItems(newVerified);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_verification': return 'bg-yellow-100 text-yellow-800';
      case 'field_visit_scheduled': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{mockProject.title}</h1>
            <p className="text-muted-foreground">Project ID: {mockProject.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(mockProject.status)} variant="outline">
            {mockProject.status.replace('_', ' ').toUpperCase()}
          </Badge>
          <Badge variant="destructive">
            HIGH PRIORITY
          </Badge>
        </div>
      </div>

      {/* Status Breadcrumb */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Project Workflow</h3>
            <span className="text-sm text-muted-foreground">
              Step 2 of 5 • {Math.round((2/5) * 100)}% Complete
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {mockProject.workflowStages.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stage.completed 
                    ? 'bg-green-500 text-white' 
                    : index === 2 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {stage.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === 2 ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="text-sm">
                  <p className={stage.completed ? 'text-green-600' : index === 2 ? 'text-blue-600' : 'text-gray-500'}>
                    {stage.stage}
                  </p>
                  {stage.date && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(stage.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                {index < mockProject.workflowStages.length - 1 && (
                  <div className={`w-12 h-0.5 ${
                    stage.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={40} className="mt-4" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Project Metadata */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Key Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Panchayat Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Panchayat</Label>
                <div className="text-sm">
                  <p className="font-medium">{mockProject.panchayat.name}</p>
                  <p className="text-muted-foreground">{mockProject.panchayat.district}, {mockProject.panchayat.state}</p>
                  <p className="text-muted-foreground">{mockProject.panchayat.email}</p>
                </div>
              </div>
              
              <Separator />
              
              {/* NGO Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Partner NGO</Label>
                <div className="text-sm">
                  <p className="font-medium">{mockProject.ngo.name}</p>
                  <p className="text-muted-foreground">{mockProject.ngo.contact}</p>
                  <p className="text-muted-foreground">{mockProject.ngo.email}</p>
                </div>
              </div>
              
              <Separator />
              
              {/* Geographic Details */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location & Area
                </Label>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Coordinates:</span> {mockProject.coordinates.latitude}, {mockProject.coordinates.longitude}</p>
                  <p><span className="font-medium">Area:</span> {mockProject.area} hectares</p>
                  <p><span className="font-medium">Ecosystem:</span> {mockProject.ecosystem}</p>
                  <p><span className="font-medium">Workers:</span> {mockProject.workerCount}</p>
                </div>
              </div>
              
              <Separator />
              
              {/* Submission Details */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Submission</Label>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Submitted:</span> {new Date(mockProject.submissionDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Last Updated:</span> {new Date(mockProject.lastUpdate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Media Files:</span> {mockProject.mediaCount}</p>
                  <p><span className="font-medium">Documents:</span> {mockProject.documentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Blockchain Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Blockchain Records
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">On-chain Hash</Label>
                <div className="font-mono text-xs bg-muted p-2 rounded break-all">
                  {mockProject.onChainHash}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Transaction IDs</Label>
                {mockProject.transactionIds.map((txId, index) => (
                  <div key={index} className="font-mono text-xs bg-muted p-2 rounded break-all flex items-center justify-between">
                    <span>{txId.slice(0, 20)}...{txId.slice(-8)}</span>
                    <Button size="sm" variant="ghost" className="p-1">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Media Gallery */}
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Media Gallery & Verification
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {mockMediaItems.length} items • {verifiedItems.size} verified
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockMediaItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    {/* Media Preview */}
                    <div className="aspect-video bg-muted rounded flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    {/* Media Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{item.filename}</h4>
                        <Button size="sm" variant="ghost" className="p-1">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><span className="font-medium">Uploader:</span> {item.uploader}</p>
                        <p><span className="font-medium">GPS:</span> {item.gpsCoords}</p>
                        <p><span className="font-medium">Timestamp:</span> {new Date(item.timestamp).toLocaleString()}</p>
                        <p><span className="font-medium">Hash:</span> {item.perceptualHash}</p>
                      </div>
                      
                      {/* AI Flags */}
                      {item.aiFlags.length > 0 && (
                        <div className="space-y-1">
                          {item.aiFlags.map((flag, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {flag.replace('_', ' ').toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Verifier Controls */}
                      <div className="space-y-2 pt-2 border-t">
                        <Textarea
                          placeholder="Verifier notes..."
                          value={verifierNotes[item.id] || ''}
                          onChange={(e) => setVerifierNotes({
                            ...verifierNotes,
                            [item.id]: e.target.value
                          })}
                          className="text-xs"
                          rows={2}
                        />
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`verify-${item.id}`}
                              checked={verifiedItems.has(item.id)}
                              onCheckedChange={(checked) => handleVerifyMedia(item.id, !!checked)}
                            />
                            <Label htmlFor={`verify-${item.id}`} className="text-xs">
                              Mark as Verified
                            </Label>
                          </div>
                          
                          {verifiedItems.has(item.id) && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Assigned Verifier */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Assigned Verifier</Label>
                <p className="text-sm font-medium">{mockProject.assignedVerifier}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Quality Score</Label>
                <div className="flex items-center space-x-2">
                  <Progress value={mockProject.qualityScore} className="flex-1" />
                  <span className="text-sm font-medium">{mockProject.qualityScore}%</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Reassign Expert
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="default">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Field Visit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Field Visit</DialogTitle>
                      <DialogDescription>
                        Schedule a field verification visit for this project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="visit-date">Visit Date</Label>
                        <Input id="visit-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="visit-time">Visit Time</Label>
                        <Input id="visit-time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Additional instructions for the field team..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Schedule Visit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button className="w-full" variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Request Corrections
                </Button>
                
                <Button className="w-full" variant="default" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve for Progress
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Project Data
              </Button>
              
              <Button className="w-full" variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
              
              <Button className="w-full" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Audit Trail & Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditTrail.map((entry, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{entry.action}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">by {entry.user}</p>
                  <p className="text-sm">{entry.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
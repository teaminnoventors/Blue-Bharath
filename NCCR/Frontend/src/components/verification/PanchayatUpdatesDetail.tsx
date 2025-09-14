import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  MessageSquare, 
  Calendar,
  MapPin,
  Users,
  Building,
  Camera,
  Satellite,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface PanchayatUpdatesDetailProps {
  project: any;
  onBack: () => void;
  onStatusUpdate: (status: string) => void;
}

const mockTimelineUpdates = [
  {
    id: 'TL-001',
    title: 'Project Approved',
    date: '2023-12-15',
    status: 'completed',
    description: 'Initial project approval granted after review'
  },
  {
    id: 'TL-002',
    title: 'Plantation Started',
    date: '2024-01-05',
    status: 'completed',
    description: 'Ground preparation completed, seedling plantation begun'
  },
  {
    id: 'TL-003',
    title: 'Week 1 Update',
    date: '2024-01-12',
    status: 'completed',
    description: '250 mangrove saplings planted along eastern boundary',
    photos: [
      { id: 'P1', caption: 'Mangrove saplings planted', location: 'Zone A-1' },
      { id: 'P2', caption: 'Water channel preparation', location: 'Zone A-2' }
    ]
  },
  {
    id: 'TL-004',
    title: 'Week 3 Update',
    date: '2024-01-26',
    status: 'completed',
    description: 'Additional 180 saplings planted, survival rate 94%',
    photos: [
      { id: 'P3', caption: 'Sapling growth progress', location: 'Zone A-1' },
      { id: 'P4', caption: 'Root development check', location: 'Zone A-2' },
      { id: 'P5', caption: 'Community participation', location: 'Zone B-1' }
    ]
  },
  {
    id: 'TL-005',
    title: 'Monthly Progress Report',
    date: '2024-01-30',
    status: 'current',
    description: 'Comprehensive monthly update with photos and measurements',
    photos: [
      { id: 'P6', caption: 'Overall site progress', location: 'Aerial View' },
      { id: 'P7', caption: 'Height measurements', location: 'Zone A-1' },
      { id: 'P8', caption: 'Water level monitoring', location: 'Zone B-2' },
      { id: 'P9', caption: 'Community involvement', location: 'Meeting Area' }
    ],
    isNew: true
  }
];

const mockGISComparison = {
  baseline: {
    date: '2023-12-10',
    vegetation: 15,
    waterCoverage: 45,
    description: 'Pre-plantation baseline'
  },
  latest: {
    date: '2024-01-30',
    vegetation: 32,
    waterCoverage: 48,
    description: 'Current status after 1 month'
  }
};

export function PanchayatUpdatesDetail({ project, onBack, onStatusUpdate }: PanchayatUpdatesDetailProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [clarificationText, setClarificationText] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleVerifyUpdates = () => {
    toast.success('Updates verified successfully. Project moved to ongoing status.');
    onStatusUpdate('Verified - Ongoing');
  };

  const handleRequestClarification = () => {
    if (!clarificationText.trim()) {
      toast.error('Please add clarification details');
      return;
    }
    toast.success('Clarification request sent to Panchayat');
    onStatusUpdate('Clarification Requested');
  };

  const openPhotoModal = (photo: any, update: any) => {
    setSelectedPhoto({ ...photo, updateTitle: update.title, updateDate: update.date });
    setShowPhotoModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-lg">
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
              <h1 className="text-white text-2xl font-medium">{project.title}</h1>
              <p className="text-blue-100">{project.projectId}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            Panchayat Updates Review
          </Badge>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Panchayat Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">{project.panchayat}</p>
              <p className="text-sm text-muted-foreground">Primary Implementation Partner</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Building className="w-4 h-4 text-green-600" />
              <span>{project.ngo}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span>{project.location.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Update Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Updates</p>
                <p className="font-medium text-lg">5</p>
              </div>
              <div>
                <p className="text-muted-foreground">Photos Submitted</p>
                <p className="font-medium text-lg">{project.metadata?.photosCount || 12}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-medium">Jan 30, 2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">GPS Verified</p>
                <p className="font-medium text-green-600">✓ Yes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-primary" />
              GIS Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Vegetation Coverage</span>
                <span className="text-green-600">+{mockGISComparison.latest.vegetation - mockGISComparison.baseline.vegetation}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Water Coverage</span>
                <span className="text-blue-600">+{mockGISComparison.latest.waterCoverage - mockGISComparison.baseline.waterCoverage}%</span>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Satellite Comparison
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline - Delivery Tracking Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockTimelineUpdates.map((update, index) => (
              <div key={update.id} className="relative">
                {/* Timeline Line */}
                {index < mockTimelineUpdates.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary/30" />
                )}
                
                <div className="flex gap-4">
                  {/* Timeline Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    update.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : update.status === 'current'
                      ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-100'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {update.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Calendar className="w-6 h-6" />
                    )}
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{update.title}</h3>
                      {update.isNew && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{update.date}</p>
                    <p className="text-sm mb-3">{update.description}</p>
                    
                    {/* Photos */}
                    {update.photos && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Camera className="w-4 h-4" />
                          <span>{update.photos.length} photos uploaded</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {update.photos.map((photo) => (
                            <div 
                              key={photo.id}
                              className="relative aspect-square bg-muted rounded-lg cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                              onClick={() => openPhotoModal(photo, update)}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 rounded-b-lg">
                                <p className="truncate">{photo.caption}</p>
                                <p className="text-gray-300">{photo.location}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GIS Satellite Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="w-5 h-5" />
            GIS Satellite Snapshot Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Baseline */}
            <div className="space-y-3">
              <h3 className="font-medium">Baseline ({mockGISComparison.baseline.date})</h3>
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center relative">
                <Satellite className="w-12 h-12 text-amber-600" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 p-2 rounded">
                  <p className="text-xs">Vegetation: {mockGISComparison.baseline.vegetation}%</p>
                  <p className="text-xs">Water: {mockGISComparison.baseline.waterCoverage}%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{mockGISComparison.baseline.description}</p>
            </div>

            {/* Latest */}
            <div className="space-y-3">
              <h3 className="font-medium">Latest ({mockGISComparison.latest.date})</h3>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center relative">
                <Satellite className="w-12 h-12 text-green-600" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 p-2 rounded">
                  <p className="text-xs">Vegetation: {mockGISComparison.latest.vegetation}%</p>
                  <p className="text-xs">Water: {mockGISComparison.latest.waterCoverage}%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{mockGISComparison.latest.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verify Updates */}
            <div className="space-y-3">
              <h3 className="font-medium text-green-800">✅ Verify Updates</h3>
              <p className="text-sm text-muted-foreground">
                Confirm that the submitted updates are accurate and the project is progressing as expected.
              </p>
              <Button 
                onClick={handleVerifyUpdates}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Move to Ongoing
              </Button>
            </div>

            {/* Request Clarification */}
            <div className="space-y-3">
              <h3 className="font-medium text-orange-800">❌ Request Clarification</h3>
              <div className="space-y-2">
                <Label htmlFor="clarification">Clarification Details</Label>
                <Textarea
                  id="clarification"
                  placeholder="Describe what clarification is needed from the Panchayat..."
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  rows={3}
                />
              </div>
              <Button 
                onClick={handleRequestClarification}
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Clarification Request
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Modal */}
      {showPhotoModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedPhoto.caption}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPhoto.updateTitle} • {selectedPhoto.updateDate} • {selectedPhoto.location}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowPhotoModal(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Camera,
  Satellite,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface TamperedDataDetailProps {
  project: any;
  onBack: () => void;
  onStatusUpdate: (status: string) => void;
}

const mockTamperingIssues = [
  {
    id: 'T1',
    type: 'GPS Location Mismatch',
    severity: 'High',
    confidence: 94,
    description: 'Uploaded photos contain GPS metadata that doesn\'t match the registered project location',
    details: {
      expected: { lat: 21.8162, lng: 88.5431 },
      detected: { lat: 21.7892, lng: 88.4987 },
      variance: '3.2 km displacement'
    },
    affectedFiles: ['IMG_001.jpg', 'IMG_003.jpg', 'IMG_007.jpg'],
    timestamp: '2024-01-30T12:15:00Z'
  },
  {
    id: 'T2',
    type: 'Timestamp Inconsistency',
    severity: 'Medium',
    confidence: 87,
    description: 'Photo timestamps have been modified after original capture',
    details: {
      originalTime: '2024-01-28T10:30:00Z',
      modifiedTime: '2024-01-30T14:45:00Z',
      evidence: 'EXIF data shows modification history'
    },
    affectedFiles: ['IMG_004.jpg', 'IMG_005.jpg'],
    timestamp: '2024-01-30T12:15:00Z'
  },
  {
    id: 'T3',
    type: 'Growth Rate Anomaly',
    severity: 'Medium',
    confidence: 78,
    description: 'Reported plant growth rates exceed biological possibilities for the timeframe',
    details: {
      reportedGrowth: '45cm in 2 weeks',
      expectedGrowth: '8-12cm in 2 weeks',
      species: 'Rhizophora mucronata'
    },
    affectedFiles: ['growth_report.pdf'],
    timestamp: '2024-01-30T12:15:00Z'
  }
];

const severityConfig = {
  'High': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  'Medium': { color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  'Low': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' }
};

export function TamperedDataDetail({ project, onBack, onStatusUpdate }: TamperedDataDetailProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const handleRejectProject = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    toast.success('Project rejected and sent back to Panchayat for resubmission');
    onStatusUpdate('Rejected - Resubmission Required');
  };

  const handleMarkUnderReview = () => {
    if (!reviewNotes.trim()) {
      toast.error('Please add review notes');
      return;
    }
    toast.success('Project marked under review for further investigation');
    onStatusUpdate('Under Investigation');
  };

  const handleOverrideApprove = () => {
    toast.success('Data inconsistencies overridden. Project approved for continuation.');
    onStatusUpdate('Override Approved');
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-600';
    if (confidence >= 75) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Warning */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
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
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                <h1 className="text-white text-2xl font-medium">AI Detected Data Inconsistencies</h1>
              </div>
              <p className="text-red-100">{project.title} • {project.projectId}</p>
            </div>
          </div>
          <Badge className="bg-red-700 text-white border-red-600">
            High Priority Review
          </Badge>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>⚠️ Data Integrity Alert:</strong> Our AI analysis has detected {mockTamperingIssues.length} potential 
          inconsistencies in the submitted data. Please review each issue carefully before making a decision.
        </AlertDescription>
      </Alert>

      {/* Project Overview */}
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
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{project.location.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-red-600">{mockTamperingIssues.length}</p>
                <p className="text-sm text-muted-foreground">Issues Found</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {mockTamperingIssues.filter(i => i.severity === 'High').length}
                </p>
                <p className="text-sm text-muted-foreground">High Severity</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Detection Time</p>
              <p className="font-medium">{new Date(project.lastUpdate).toLocaleString('en-IN')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Analysis Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Confidence</span>
                <span className="font-medium text-red-600">{project.metadata?.tampering?.confidence}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Files Analyzed</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Suspicious Files</span>
                <span className="font-medium text-orange-600">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detected Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Detected Inconsistencies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockTamperingIssues.map((issue, index) => (
            <div key={issue.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-lg">{issue.type}</h3>
                    <Badge 
                      variant="outline" 
                      className={severityConfig[issue.severity].color}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${severityConfig[issue.severity].dot}`} />
                      {issue.severity} Risk
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{issue.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className={`text-lg font-bold ${getConfidenceColor(issue.confidence)}`}>
                    {issue.confidence}%
                  </p>
                </div>
              </div>

              {/* Issue Details */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Technical Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(issue.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <p className="font-medium">
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affected Files */}
              <div>
                <h4 className="font-medium mb-2">Affected Files ({issue.affectedFiles.length}):</h4>
                <div className="flex flex-wrap gap-2">
                  {issue.affectedFiles.map((file) => (
                    <Badge key={file} variant="outline" className="font-mono text-xs">
                      {file}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Detected: {new Date(issue.timestamp).toLocaleString('en-IN')}</span>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Evidence
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Visual Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Uploaded Photos vs. Live GIS Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Uploaded Photos */}
            <div className="space-y-3">
              <h3 className="font-medium text-red-700">Uploaded Photos (Suspicious)</h3>
              <div className="aspect-video bg-red-50 border-2 border-red-200 rounded-lg flex items-center justify-center relative">
                <Camera className="w-12 h-12 text-red-400" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    GPS Mismatch
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 p-2 rounded">
                  <p className="text-xs">Location: 21.7892°N, 88.4987°E</p>
                  <p className="text-xs text-red-600">⚠️ 3.2km from registered site</p>
                </div>
              </div>
            </div>

            {/* Live GIS */}
            <div className="space-y-3">
              <h3 className="font-medium text-green-700">Live GIS Data (Verified)</h3>
              <div className="aspect-video bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center relative">
                <Satellite className="w-12 h-12 text-green-600" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 p-2 rounded">
                  <p className="text-xs">Location: 21.8162°N, 88.5431°E</p>
                  <p className="text-xs text-green-600">✓ Matches registered coordinates</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reject Project */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              ❌ Reject Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Send the project back to Panchayat for complete resubmission with corrected data.
            </p>
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Specify the reasons for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={handleRejectProject}
              variant="destructive"
              className="w-full"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject & Request Resubmission
            </Button>
          </CardContent>
        </Card>

        {/* Mark Under Review */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Clock className="w-5 h-5" />
              🟡 Mark Under Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Keep in queue for further investigation and expert consultation.
            </p>
            <div className="space-y-2">
              <Label htmlFor="review-notes">Investigation Notes</Label>
              <Textarea
                id="review-notes"
                placeholder="Add notes for the investigation team..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={handleMarkUnderReview}
              variant="outline"
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              <Clock className="w-4 h-4 mr-2" />
              Mark for Investigation
            </Button>
          </CardContent>
        </Card>

        {/* Override & Approve */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              ✅ Override & Approve
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Override the AI detection if the issues are minor or acceptable.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <strong>⚠️ Warning:</strong> This action will bypass AI security checks. 
                Use only if you're confident the data is legitimate.
              </p>
            </div>
            <Button 
              onClick={handleOverrideApprove}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Override & Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
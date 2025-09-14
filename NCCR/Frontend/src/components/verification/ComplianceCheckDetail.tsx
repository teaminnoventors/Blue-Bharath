import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Play,
  Users,
  Satellite,
  FileText,
  Camera,
  Activity,
  AlertTriangle,
  Clock,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface ComplianceCheckDetailProps {
  project: any;
  onBack: () => void;
  onStatusUpdate: (status: string) => void;
}

const mockComplianceData = {
  panchayatUpdates: {
    totalUploads: 24,
    photosCount: 18,
    documentsCount: 6,
    lastUpdate: '2024-01-30',
    qualityScore: 92,
    gpsVerified: true,
    timestampsValid: true
  },
  gisData: {
    baselineDate: '2023-12-10',
    latestDate: '2024-01-30',
    vegetationIncrease: 17,
    waterCoverageChange: 3,
    integrityScore: 96,
    satelliteQuality: 'High Resolution'
  },
  expertReports: {
    totalReports: 3,
    fieldVisits: 2,
    droneFlights: 4,
    soilAnalysis: 1,
    biodiversityAssessment: 1,
    overallScore: 94,
    expertRating: 4.8
  }
};

const complianceTests = [
  {
    id: 'test-1',
    name: 'Verify Panchayat Updates',
    description: 'Check photo authenticity, GPS coordinates, and timeline consistency',
    status: 'pending',
    duration: 2,
    details: [
      'Photo metadata validation',
      'GPS coordinate verification',
      'Timeline consistency check',
      'File integrity validation'
    ]
  },
  {
    id: 'test-2',
    name: 'Check GIS Integrity',
    description: 'Validate satellite data consistency and vegetation coverage changes',
    status: 'pending',
    duration: 3,
    details: [
      'Satellite data consistency',
      'Vegetation coverage analysis',
      'Water level monitoring',
      'Boundary verification'
    ]
  },
  {
    id: 'test-3',
    name: 'Expert Data Cross-check',
    description: 'Verify expert reports and field assessment data',
    status: 'pending',
    duration: 2,
    details: [
      'Field report validation',
      'Drone data correlation',
      'Soil analysis verification',
      'Expert signature validation'
    ]
  },
  {
    id: 'test-4',
    name: 'AI Authenticity Test',
    description: 'Run AI-powered authenticity checks on all submitted data',
    status: 'pending',
    duration: 1,
    details: [
      'Image tampering detection',
      'Document authenticity check',
      'Pattern anomaly detection',
      'Behavioral analysis'
    ]
  }
];

export function ComplianceCheckDetail({ project, onBack, onStatusUpdate }: ComplianceCheckDetailProps) {
  const [isRunningCompliance, setIsRunningCompliance] = useState(false);
  const [currentTest, setCurrentTest] = useState<number>(-1);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [finalResult, setFinalResult] = useState<'passed' | 'failed' | null>(null);

  const runComplianceTest = async () => {
    setIsRunningCompliance(true);
    setFinalResult(null);
    const results: any[] = [];

    for (let i = 0; i < complianceTests.length; i++) {
      setCurrentTest(i);
      
      // Simulate test duration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate test result (90% pass rate)
      const passed = Math.random() > 0.1;
      const score = passed ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 40;
      
      results.push({
        testId: complianceTests[i].id,
        passed,
        score,
        issues: passed ? [] : ['Minor data inconsistency detected', 'Requires manual review']
      });
      
      setTestResults([...results]);
    }

    // Determine final result
    const allPassed = results.every(r => r.passed);
    setFinalResult(allPassed ? 'passed' : 'failed');
    setCurrentTest(-1);
    setIsRunningCompliance(false);

    if (allPassed) {
      toast.success('All compliance tests passed! Project is ready for carbon credits.');
    } else {
      toast.error('Some compliance tests failed. Manual review required.');
    }
  };

  const handleMarkVerified = () => {
    toast.success('Project marked as verified and ready for carbon credits!');
    onStatusUpdate('Verified - Ready for Credits');
  };

  const handleSendBackForClarification = () => {
    toast.success('Project sent back for clarification and additional data.');
    onStatusUpdate('Clarification Required');
  };

  const getTestIcon = (testIndex: number) => {
    if (testIndex < currentTest) {
      const result = testResults[testIndex];
      return result?.passed ? 
        <CheckCircle className="w-5 h-5 text-green-600" /> : 
        <XCircle className="w-5 h-5 text-red-600" />;
    } else if (testIndex === currentTest) {
      return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
    } else {
      return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTestStatus = (testIndex: number) => {
    if (testIndex < currentTest || (testIndex < testResults.length && !isRunningCompliance)) {
      const result = testResults[testIndex];
      return result?.passed ? 'Passed' : 'Failed';
    } else if (testIndex === currentTest) {
      return 'Running...';
    } else {
      return 'Pending';
    }
  };

  const getTestStatusColor = (testIndex: number) => {
    if (testIndex < currentTest || (testIndex < testResults.length && !isRunningCompliance)) {
      const result = testResults[testIndex];
      return result?.passed ? 'text-green-600' : 'text-red-600';
    } else if (testIndex === currentTest) {
      return 'text-blue-600';
    } else {
      return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-lg">
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
              <h1 className="text-white text-2xl font-medium">Final Compliance Check</h1>
              <p className="text-orange-100">{project.title} • {project.projectId}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            Compliance Verification
          </Badge>
        </div>
      </div>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Full Project Report - Order Tracking Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Stats */}
            <div className="space-y-4">
              <h3 className="font-medium">Project Status Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress:</span>
                  <span className="font-medium text-green-600">{project.progress}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Compliance Score:</span>
                  <span className="font-medium text-blue-600">{project.metadata?.complianceScore || 94}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Expert Rating:</span>
                  <span className="font-medium text-purple-600">4.8/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge className="bg-orange-100 text-orange-800">Final Check</Badge>
                </div>
              </div>
            </div>

            {/* Timeline Completion */}
            <div className="space-y-4">
              <h3 className="font-medium">Timeline Completion</h3>
              <div className="space-y-2">
                {[
                  { stage: 'Project Initiated', status: 'complete' },
                  { stage: 'Panchayat Updates', status: 'complete' },
                  { stage: 'Expert Assignment', status: 'complete' },
                  { stage: 'Field Assessment', status: 'complete' },
                  { stage: 'Compliance Check', status: 'current' },
                  { stage: 'Credit Generation', status: 'pending' }
                ].map((item, index) => (
                  <div key={item.stage} className="flex items-center gap-2 text-sm">
                    {item.status === 'complete' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : item.status === 'current' ? (
                      <Clock className="w-4 h-4 text-orange-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className={
                      item.status === 'complete' ? 'text-green-600' :
                      item.status === 'current' ? 'text-orange-600' :
                      'text-gray-500'
                    }>
                      {item.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <h3 className="font-medium">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Area Restored</p>
                  <p className="font-medium">45.2 hectares</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Plantation Count</p>
                  <p className="font-medium">2,847 saplings</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Survival Rate</p>
                  <p className="font-medium text-green-600">94.3%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Est. Carbon</p>
                  <p className="font-medium text-blue-600">3,420 tCO2e</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3-Panel View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panchayat Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Panchayat Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Total Uploads</p>
                <p className="font-medium">{mockComplianceData.panchayatUpdates.totalUploads}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Photos</p>
                <p className="font-medium">{mockComplianceData.panchayatUpdates.photosCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Documents</p>
                <p className="font-medium">{mockComplianceData.panchayatUpdates.documentsCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Quality Score</p>
                <p className="font-medium text-green-600">{mockComplianceData.panchayatUpdates.qualityScore}%</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>GPS Verified</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Timestamps Valid</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              View All Photos
            </Button>
          </CardContent>
        </Card>

        {/* GIS & Satellite */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-green-600" />
              GIS & Satellite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Baseline Date</p>
                <p className="font-medium">{mockComplianceData.gisData.baselineDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Latest Scan</p>
                <p className="font-medium">{mockComplianceData.gisData.latestDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vegetation +</p>
                <p className="font-medium text-green-600">+{mockComplianceData.gisData.vegetationIncrease}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Integrity Score</p>
                <p className="font-medium text-blue-600">{mockComplianceData.gisData.integrityScore}%</p>
              </div>
            </div>
            
            <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center">
              <Satellite className="w-12 h-12 text-green-600" />
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Satellite className="w-4 h-4 mr-2" />
              View Map Overlays
            </Button>
          </CardContent>
        </Card>

        {/* Expert Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Expert Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Total Reports</p>
                <p className="font-medium">{mockComplianceData.expertReports.totalReports}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Field Visits</p>
                <p className="font-medium">{mockComplianceData.expertReports.fieldVisits}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Drone Flights</p>
                <p className="font-medium">{mockComplianceData.expertReports.droneFlights}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Overall Score</p>
                <p className="font-medium text-purple-600">{mockComplianceData.expertReports.overallScore}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Soil Analysis Report</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-green-600" />
                <span>Biodiversity Assessment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Drone Survey Data</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Download PDFs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Test Runner */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Run Compliance Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Button */}
          {!isRunningCompliance && testResults.length === 0 && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Run comprehensive compliance tests to verify all project data and ensure integrity.
              </p>
              <Button 
                onClick={runComplianceTest}
                size="lg"
                className="px-8 py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Compliance Test
              </Button>
            </div>
          )}

          {/* Test Progress */}
          {(isRunningCompliance || testResults.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Compliance Test Progress</h3>
                {isRunningCompliance && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>Testing in progress...</span>
                  </div>
                )}
              </div>

              {/* Test Steps */}
              <div className="space-y-3">
                {complianceTests.map((test, index) => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getTestIcon(index)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{test.name}</h4>
                          <span className={`text-sm font-medium ${getTestStatusColor(index)}`}>
                            {getTestStatus(index)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{test.description}</p>
                        
                        {/* Test Details */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {test.details.map((detail) => (
                            <div key={detail} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Test Results */}
                        {testResults[index] && (
                          <div className="mt-3 p-2 bg-muted/50 rounded">
                            <div className="flex items-center justify-between text-sm">
                              <span>Score: {testResults[index].score}%</span>
                              {testResults[index].passed ? (
                                <Badge className="bg-green-100 text-green-800">Passed</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">Failed</Badge>
                              )}
                            </div>
                            {testResults[index].issues.length > 0 && (
                              <div className="mt-2">
                                {testResults[index].issues.map((issue: string, idx: number) => (
                                  <p key={idx} className="text-xs text-red-600">• {issue}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Results */}
          {finalResult && (
            <Card className={`border-2 ${
              finalResult === 'passed' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              <CardContent className="p-6 text-center">
                {finalResult === 'passed' ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                    <div>
                      <h3 className="text-xl font-medium text-green-800">✅ All Tests Passed!</h3>
                      <p className="text-green-700 mt-2">
                        All compliance checks have been completed successfully. The project meets all requirements.
                      </p>
                    </div>
                    <Button 
                      onClick={handleMarkVerified}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Mark Verified → Ready for Credits
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <XCircle className="w-16 h-16 text-red-600 mx-auto" />
                    <div>
                      <h3 className="text-xl font-medium text-red-800">❌ Issues Found</h3>
                      <p className="text-red-700 mt-2">
                        Some compliance tests failed. Manual review and clarification are required.
                      </p>
                    </div>
                    <Button 
                      onClick={handleSendBackForClarification}
                      variant="destructive"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Send Back for Clarification
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
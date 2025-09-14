import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Project } from '../App';

interface RequestTrackingProps {
  user: User;
  project: Project;
  onBack: () => void;
}

interface RequestStatus {
  id: string;
  status: 'submitted' | 'under-review' | 'corrections-requested' | 'approved' | 'work-progress' | 'final-verification' | 'credits-issued';
  timestamp: string;
  actor: string;
  comments?: string;
  active: boolean;
}

const getMockRequestsForProject = (projectId: string, projectTitle: string) => [
  {
    id: `REQ-${projectId}-001`,
    projectTitle: projectTitle,
    currentStatus: 'approved',
    submittedDate: '2024-01-15',
    timeline: [
      {
        id: '1',
        status: 'submitted' as const,
        timestamp: '2024-01-15T10:00:00Z',
        actor: 'Panchayat',
        active: false
      },
      {
        id: '2', 
        status: 'under-review' as const,
        timestamp: '2024-01-16T09:00:00Z',
        actor: 'NCCR Review Team',
        active: false
      },
      {
        id: '3',
        status: 'corrections-requested' as const,
        timestamp: '2024-01-18T14:30:00Z',
        actor: 'NCCR Verifier',
        comments: 'Please upload clearer site photos and GPS coordinates with better accuracy.',
        active: false
      },
      {
        id: '4',
        status: 'approved' as const,
        timestamp: '2024-01-20T11:00:00Z',
        actor: 'NCCR Approval Authority',
        comments: 'Project approved. You may begin restoration activities.',
        active: true
      }
    ] as RequestStatus[]
  },
  {
    id: `REQ-${projectId}-002`,
    projectTitle: projectTitle,
    currentStatus: 'under-review',
    submittedDate: '2024-01-22',
    timeline: [
      {
        id: '1',
        status: 'submitted' as const,
        timestamp: '2024-01-22T15:30:00Z',
        actor: 'Panchayat',
        active: false
      },
      {
        id: '2',
        status: 'under-review' as const,
        timestamp: '2024-01-23T09:00:00Z',
        actor: 'NCCR Review Team',
        comments: 'Under technical review. Expected completion: 3-5 business days.',
        active: true
      }
    ] as RequestStatus[]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'submitted': return '📤';
    case 'under-review': return '🔍';
    case 'corrections-requested': return '⚠️';
    case 'approved': return '✅';
    case 'work-progress': return '🚧';
    case 'final-verification': return '🔬';
    case 'credits-issued': return '🏆';
    default: return '📋';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'under-review': return 'bg-amber-100 text-amber-700';
    case 'corrections-requested': return 'bg-red-100 text-red-700';
    case 'approved': return 'bg-emerald-100 text-emerald-700';
    case 'work-progress': return 'bg-cyan-100 text-cyan-700';
    case 'final-verification': return 'bg-purple-100 text-purple-700';
    case 'credits-issued': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function RequestTracking({ user, project, onBack }: RequestTrackingProps) {
  const mockRequests = getMockRequestsForProject(project.id, project.title);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800">{project.title} - Requests</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {mockRequests.map((request) => (
          <Card key={request.id} className="bg-white/70 backdrop-blur-sm border-cyan-200">
            <div className="p-6">
              {/* Request Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg text-cyan-800">{request.projectTitle}</h3>
                  <p className="text-cyan-600 text-sm">Request ID: {request.id}</p>
                </div>
                <Badge className={`text-xs ${getStatusColor(request.currentStatus)}`}>
                  {request.currentStatus.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyan-600">Progress Timeline</span>
                  <span className="text-cyan-800">
                    Submitted {new Date(request.submittedDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-4">
                  {request.timeline.map((status, index) => (
                    <div key={status.id} className="flex items-start space-x-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          status.active
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                            : status.status === 'corrections-requested'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-cyan-100 text-cyan-600'
                        }`}>
                          {getStatusIcon(status.status)}
                        </div>
                        {index < request.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-cyan-200 mt-2"></div>
                        )}
                      </div>

                      {/* Status Details */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm capitalize ${
                            status.active ? 'text-emerald-700' : 'text-cyan-800'
                          }`}>
                            {status.status.replace('-', ' ')}
                          </h4>
                          <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 text-xs">
                            {status.actor}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-cyan-600 mb-2">
                          {new Date(status.timestamp).toLocaleString()}
                        </p>

                        {status.comments && (
                          <div className={`p-3 rounded-lg text-sm ${
                            status.status === 'corrections-requested'
                              ? 'bg-red-50 border border-red-200 text-red-700'
                              : 'bg-cyan-50 border border-cyan-200 text-cyan-700'
                          }`}>
                            {status.comments}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-cyan-200">
                  <div className="flex space-x-3">
                    {request.currentStatus === 'corrections-requested' && (
                      <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500">
                        📤 Resubmit Corrections
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-cyan-200">
                      💬 Message NCCR
                    </Button>
                    <Button size="sm" variant="outline" className="border-cyan-200">
                      📋 View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                <div className="text-white">💡</div>
              </div>
              <h3 className="text-blue-800">Need Help?</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="text-blue-600">•</div>
                <p className="text-blue-700">Typical review time: 3-5 business days</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-blue-600">•</div>
                <p className="text-blue-700">You'll receive SMS/email updates on status changes</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-blue-600">•</div>
                <p className="text-blue-700">Use the message feature for specific queries</p>
              </div>
            </div>

            <Button variant="outline" className="mt-4 border-blue-300 hover:bg-blue-100">
              📞 Contact Support
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 p-4 text-center">
            <div className="text-2xl text-emerald-600 mb-1">1</div>
            <div className="text-xs text-emerald-700">Approved</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-amber-200 p-4 text-center">
            <div className="text-2xl text-amber-600 mb-1">1</div>
            <div className="text-xs text-amber-700">Under Review</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4 text-center">
            <div className="text-2xl text-cyan-600 mb-1">3.2</div>
            <div className="text-xs text-cyan-700">Avg. Days</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
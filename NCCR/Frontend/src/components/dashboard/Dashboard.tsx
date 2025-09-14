import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Users, 
  MapPin, 
  Award, 
  TrendingUp,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface DashboardProps {
  userRole: string;
  onNavigate: (page: string) => void;
}

const mockData = {
  stats: {
    totalProjects: 247,
    pendingVerifications: 23,
    certificatesIssued: 89,
    totalCredits: 15420,
    pendingFieldVisits: 8,
    activeVerifiers: 12
  },
  recentProjects: [
    {
      id: 'PROJ-2024-001',
      title: 'Mangrove Restoration - Sundarbans West',
      panchayat: 'Gosaba Gram Panchayat',
      status: 'pending_verification',
      area: 45.2,
      submittedDays: 3,
      priority: 'high'
    },
    {
      id: 'PROJ-2024-002', 
      title: 'Seagrass Conservation - Palk Bay',
      panchayat: 'Rameswaram Gram Panchayat',
      status: 'field_visit_scheduled',
      area: 23.8,
      submittedDays: 7,
      priority: 'medium'
    },
    {
      id: 'PROJ-2024-003',
      title: 'Coastal Wetland Protection - Chilika',
      panchayat: 'Balugaon Gram Panchayat', 
      status: 'approved',
      area: 67.5,
      submittedDays: 12,
      priority: 'low'
    }
  ],
  alerts: [
    {
      type: 'urgent',
      title: 'Field verification overdue',
      description: '3 projects require immediate field verification',
      count: 3
    },
    {
      type: 'warning',
      title: 'AI flagged submissions',
      description: 'Potential image tampering detected',
      count: 5
    },
    {
      type: 'info',
      title: 'Scheduled visits today',
      description: 'Expert field visits scheduled',
      count: 2
    }
  ]
};

const statusConfig = {
  pending_verification: { label: 'Pending Verification', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  field_visit_scheduled: { label: 'Field Visit Scheduled', color: 'bg-blue-500', textColor: 'text-blue-700' },
  approved: { label: 'Approved', color: 'bg-green-500', textColor: 'text-green-700' },
  in_progress: { label: 'In Progress', color: 'bg-orange-500', textColor: 'text-orange-700' }
};

const priorityConfig = {
  high: { label: 'High', variant: 'destructive' as const },
  medium: { label: 'Medium', variant: 'secondary' as const },
  low: { label: 'Low', variant: 'outline' as const }
};

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  const getStatsForRole = () => {
    switch (userRole) {
      case 'SuperAdmin':
        return [
          { title: 'Total Projects', value: mockData.stats.totalProjects, icon: FileText, color: 'text-blue-600' },
          { title: 'Pending Verifications', value: mockData.stats.pendingVerifications, icon: Clock, color: 'text-yellow-600' },
          { title: 'Certificates Issued', value: mockData.stats.certificatesIssued, icon: Award, color: 'text-green-600' },
          { title: 'Total Credits (tCO2e)', value: mockData.stats.totalCredits.toLocaleString(), icon: TrendingUp, color: 'text-purple-600' }
        ];
      case 'Verifier':
        return [
          { title: 'Assigned Projects', value: 18, icon: FileText, color: 'text-blue-600' },
          { title: 'Pending Field Visits', value: mockData.stats.pendingFieldVisits, icon: MapPin, color: 'text-orange-600' },
          { title: 'Completed This Month', value: 12, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Quality Score Avg', value: '94%', icon: Activity, color: 'text-purple-600' }
        ];
      case 'GIS Operator':
        return [
          { title: 'Drone Packages Uploaded', value: 45, icon: MapPin, color: 'text-blue-600' },
          { title: 'NDVI Analyses Complete', value: 32, icon: Activity, color: 'text-green-600' },
          { title: 'Pending Processing', value: 8, icon: Clock, color: 'text-yellow-600' },
          { title: 'Map Layers Active', value: 156, icon: MapPin, color: 'text-purple-600' }
        ];
      case 'Finance Officer':
        return [
          { title: 'Credits Issued', value: mockData.stats.certificatesIssued, icon: Award, color: 'text-green-600' },
          { title: 'Revenue This Quarter', value: '₹2.4L', icon: TrendingUp, color: 'text-blue-600' },
          { title: 'Pending Disbursements', value: 15, icon: Clock, color: 'text-yellow-600' },
          { title: 'Retired Credits', value: 230, icon: CheckCircle, color: 'text-gray-600' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {userRole} • {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button onClick={() => onNavigate('projects')} className="bg-gradient-to-r from-primary to-[#06b6d4]">
          View All Projects
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsForRole().map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts & Notifications */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'urgent' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <Badge variant="secondary" className="ml-2">
                      {alert.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Project Submissions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('projects')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer" 
                     onClick={() => onNavigate('projects')}>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <p className="font-medium text-sm">{project.title}</p>
                      <Badge variant={priorityConfig[project.priority].variant} className="text-xs">
                        {priorityConfig[project.priority].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{project.panchayat}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>ID: {project.id}</span>
                      <span>{project.area} hectares</span>
                      <span>{project.submittedDays} days ago</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig[project.status].textColor} bg-${statusConfig[project.status].color}/10`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status].color}`} />
                      {statusConfig[project.status].label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview - Role Specific */}
      {(userRole === 'SuperAdmin' || userRole === 'Verifier') && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Projects Verified This Month</span>
                  <span>34/45</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: 45 projects</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Verification Time</span>
                  <span>4.2 days</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: ≤5 days</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quality Score Average</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: ≥90%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
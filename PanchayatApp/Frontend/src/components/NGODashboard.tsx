import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, AppScreen } from '../App';

interface NGODashboardProps {
  user: User;
  onNavigate: (screen: AppScreen) => void;
  isOffline: boolean;
  notifications: number;
}

interface DashboardTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: AppScreen;
  iconBg: string;
  badge?: string;
  urgent?: boolean;
}

const ngoDashboardTiles: DashboardTile[] = [
  {
    id: 'available-projects',
    title: 'Available Projects Nearby',
    description: 'Collaborate with Panchayats on restoration projects',
    icon: '🗺️',
    screen: 'available-projects',
    iconBg: 'from-emerald-400 to-emerald-500',
    badge: '5 New',
    urgent: true
  },
  {
    id: 'my-collaborations',
    title: 'My Collaborations',
    description: 'Active partnerships and project status',
    icon: '🤝',
    screen: 'ngo-dashboard',
    iconBg: 'from-cyan-400 to-cyan-500',
    badge: '2 Active'
  },
  {
    id: 'training-requests',
    title: 'Submit Training Request',
    description: 'Request training sessions for communities',
    icon: '🎓',
    screen: 'guides-training',
    iconBg: 'from-teal-400 to-teal-500'
  },
  {
    id: 'guides-training',
    title: 'Guides & Training Materials',
    description: 'Access training resources and best practices',
    icon: '📚',
    screen: 'guides-training',
    iconBg: 'from-indigo-400 to-indigo-500'
  },
  {
    id: 'impact-reports',
    title: 'Impact Reports',
    description: 'View and generate collaboration impact reports',
    icon: '📊',
    screen: 'certificates-credits',
    iconBg: 'from-purple-400 to-purple-500'
  }
];

export function NGODashboard({ user, onNavigate, isOffline, notifications }: NGODashboardProps) {
  // Quick summary data for dashboard preview
  const projectSummary = {
    totalProjects: 5,
    urgentProjects: 3,
    nearbyRadius: '20km'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-teal-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-lg">🤝</div>
            </div>
            <div>
              <h1 className="text-lg text-teal-800">
                Welcome, {user.profile?.contactPerson || user.name}
              </h1>
              <p className="text-sm text-teal-600">
                {user.profile?.organizationName || 'NGO Partner Dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Verification Status */}
            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
              ✅ Verified
            </Badge>
            
            {/* Sync status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
              <span className="text-xs text-teal-600">
                {isOffline ? 'Offline' : 'Synced'}
              </span>
            </div>
            
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('notifications')}
              className="relative"
            >
              <div className="text-teal-600">🔔</div>
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 p-4 text-center">
            <div className="text-2xl text-emerald-600 mb-1">2</div>
            <div className="text-xs text-emerald-700">Active Partnerships</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4 text-center">
            <div className="text-2xl text-teal-600 mb-1">12</div>
            <div className="text-xs text-teal-700">Training Sessions</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4 text-center">
            <div className="text-2xl text-cyan-600 mb-1">85%</div>
            <div className="text-xs text-cyan-700">Success Rate</div>
          </Card>
        </div>

        {/* Available Projects Preview */}
        <div className="mb-6">
          <Card 
            className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01] ring-1 ring-red-200 bg-red-50/20"
            onClick={() => onNavigate('available-projects')}
          >
            <div className="p-5">
            </div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 mb-8">
          {ngoDashboardTiles.map((tile) => (
            <Card
              key={tile.id}
              className={`bg-white/60 backdrop-blur-sm border-teal-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                tile.urgent ? 'ring-2 ring-red-200 bg-red-50/30' : ''
              }`}
              onClick={() => onNavigate(tile.screen)}
            >
              <div className="p-5">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tile.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <div className="text-white text-2xl">{tile.icon}</div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg text-teal-800 truncate">{tile.title}</h3>
                      {tile.badge && (
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            tile.urgent
                              ? 'bg-red-100 text-red-700 animate-pulse'
                              : 'bg-teal-100 text-teal-700'
                          }`}
                        >
                          {tile.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-teal-600 leading-relaxed">
                      {tile.description}
                    </p>
                  </div>
                  
                  <div className="text-teal-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg text-teal-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="text-emerald-600 text-sm">🤝</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-teal-800">Joined Mangrove Restoration Project</p>
                  <p className="text-xs text-teal-600">Partnership confirmed with Coastal Village Panchayat</p>
                  <p className="text-xs text-teal-500">2 hours ago</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-blue-600 text-sm">🎓</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-teal-800">Training session completed</p>
                  <p className="text-xs text-teal-600">25 community workers trained in mangrove planting</p>
                  <p className="text-xs text-teal-500">1 day ago</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-purple-600 text-sm">📊</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-teal-800">Impact report submitted</p>
                  <p className="text-xs text-teal-600">Quarterly collaboration impact report for Q4 2024</p>
                  <p className="text-xs text-teal-500">3 days ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pb-8">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 border-teal-200 hover:bg-teal-50"
              onClick={() => onNavigate('guides-training')}
            >
              <div className="text-2xl">📋</div>
              <span className="text-sm text-teal-700">Request Training</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 border-emerald-200 hover:bg-emerald-50"
              onClick={() => onNavigate('certificates-credits')}
            >
              <div className="text-2xl">📈</div>
              <span className="text-sm text-emerald-700">View Impact</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
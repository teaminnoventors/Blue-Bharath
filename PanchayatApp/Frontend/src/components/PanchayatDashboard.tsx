import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, AppScreen, Project } from '../App';

interface PanchayatDashboardProps {
  user: User;
  projects: Project[];
  onNavigate: (screen: AppScreen, project?: Project) => void;
  isOffline: boolean;
  notifications: number;
}

interface DashboardTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: AppScreen;
  bgGradient: string;
  iconBg: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const dashboardTiles: DashboardTile[] = [
  {
    id: 'create-project',
    title: 'Create Project',
    description: 'Start a new coastal restoration project',
    icon: '🌱',
    screen: 'create-project',
    bgGradient: 'from-emerald-400 to-teal-500',
    iconBg: 'from-emerald-400 to-emerald-500'
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    description: 'View and manage ongoing projects',
    icon: '📊',
    screen: 'my-projects',
    bgGradient: 'from-cyan-400 to-blue-500',
    iconBg: 'from-cyan-400 to-cyan-500'
  },

  {
    id: 'guides-training',
    title: 'Guides & Training',
    description: 'Access training materials and resources',
    icon: '📚',
    screen: 'guides-training',
    bgGradient: 'from-indigo-400 to-blue-500',
    iconBg: 'from-indigo-400 to-indigo-500'
  },
  {
    id: 'certificates-credits',
    title: 'Certificates & Credits',
    description: 'View earned carbon credits and certificates',
    icon: '🏆',
    screen: 'certificates-credits',
    bgGradient: 'from-amber-400 to-orange-500',
    iconBg: 'from-amber-400 to-amber-500'
  }
];

export function PanchayatDashboard({ user, projects, onNavigate, isOffline, notifications }: PanchayatDashboardProps) {
  // Calculate dynamic badges
  const activeProjects = projects.filter(p => p.status === 'in-progress' || p.status === 'approved').length;
  const creditsEarned = projects.filter(p => p.status === 'credits-issued').length * 1.2;
  
  // Add dynamic data to tiles
  const tilesWithData = dashboardTiles.map(tile => {
    if (tile.id === 'my-projects') {
      return { ...tile, badge: `${activeProjects} Active` };
    }
    if (tile.id === 'certificates-credits') {
      return { ...tile, badge: `${creditsEarned} tCO2e` };
    }
    return tile;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-lg">🏛️</div>
            </div>
            <div>
              <h1 className="text-lg text-cyan-800">
                Welcome, {user.profile?.authorizedPerson || user.name}
              </h1>
              <p className="text-sm text-cyan-600">
                {user.profile?.panchayatName || 'Panchayat Dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Sync status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
              <span className="text-xs text-cyan-600">
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
              <div className="text-cyan-600">🔔</div>
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
            <div className="text-2xl text-emerald-600 mb-1">{projects.filter(p => p.status === 'in-progress' || p.status === 'approved').length}</div>
            <div className="text-xs text-emerald-700">Active Projects</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4 text-center">
            <div className="text-2xl text-cyan-600 mb-1">{projects.filter(p => p.status === 'credits-issued').length * 1.2}</div>
            <div className="text-xs text-cyan-700">Credits Earned</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4 text-center">
            <div className="text-2xl text-teal-600 mb-1">{projects.reduce((sum, p) => sum + p.workers, 0)}</div>
            <div className="text-xs text-teal-700">Total Workers</div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 mb-8">
          {tilesWithData.map((tile) => (
            <Card
              key={tile.id}
              className="bg-white/60 backdrop-blur-sm border-cyan-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onNavigate(tile.screen)}
            >
              <div className="p-5">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tile.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <div className="text-white text-2xl">{tile.icon}</div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg text-cyan-800 truncate">{tile.title}</h3>
                      {tile.badge && (
                        <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 text-xs">
                          {tile.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-cyan-600 leading-relaxed">
                      {tile.description}
                    </p>
                  </div>
                  
                  <div className="text-cyan-400">
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
        <div className="mt-8">
          <h2 className="text-lg text-cyan-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <Card key={project.id} className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    project.status === 'credits-issued' ? 'bg-emerald-100' :
                    project.status === 'in-progress' ? 'bg-cyan-100' :
                    project.status === 'under-review' ? 'bg-amber-100' :
                    project.status === 'approved' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    <div className={`text-sm ${
                      project.status === 'credits-issued' ? 'text-emerald-600' :
                      project.status === 'in-progress' ? 'text-cyan-600' :
                      project.status === 'under-review' ? 'text-amber-600' :
                      project.status === 'approved' ? 'text-green-600' :
                      'text-blue-600'
                    }`}>
                      {project.status === 'credits-issued' ? '🏆' :
                       project.status === 'in-progress' ? '🚧' :
                       project.status === 'under-review' ? '⏳' :
                       project.status === 'approved' ? '✅' :
                       '📋'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cyan-800">{project.title} - {project.status.replace('-', ' ')}</p>
                    <p className="text-xs text-cyan-600">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pb-8">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 border-cyan-200 hover:bg-cyan-50"
              onClick={() => onNavigate('create-project')}
            >
              <div className="text-2xl">➕</div>
              <span className="text-sm text-cyan-700">Quick Start Project</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 border-teal-200 hover:bg-teal-50"
              onClick={() => onNavigate('guides-training')}
            >
              <div className="text-2xl">🎯</div>
              <span className="text-sm text-teal-700">Take Training</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
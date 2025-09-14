import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { User, Project } from '../App';

interface ProjectDetailProps {
  project: Project;
  user: User;
  onBack: () => void;
  onNavigateToWorkers?: () => void;
  onNavigateToRequests?: () => void;
}

export function ProjectDetail({ project, user, onBack, onNavigateToWorkers, onNavigateToRequests }: ProjectDetailProps) {
  const [isUploadingProgress, setIsUploadingProgress] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'under-review': return 'bg-amber-100 text-amber-700';
      case 'corrections-requested': return 'bg-red-100 text-red-700';
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'in-progress': return 'bg-cyan-100 text-cyan-700';
      case 'final-verification': return 'bg-purple-100 text-purple-700';
      case 'credits-issued': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const uploadProgressPhoto = () => {
    setIsUploadingProgress(true);
    setTimeout(() => {
      setIsUploadingProgress(false);
      // Mock success
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800 truncate max-w-48">
            {project.title}
          </h1>
          <Badge className={`text-xs ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Project Summary Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-cyan-200 mb-6">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                <div className="text-white text-2xl">
                  {project.ecosystem === 'mangrove' ? '🌿' : project.ecosystem === 'seagrass' ? '🌱' : '🌾'}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg text-cyan-800 mb-1">{project.title}</h2>
                <div className="space-y-1 text-sm text-cyan-600">
                  <div>📍 {project.location.lat.toFixed(4)}, {project.location.lng.toFixed(4)}</div>
                  <div>📐 {project.area} hectares • 👥 {project.workers} workers</div>
                  <div>🌱 {project.ecosystem.charAt(0).toUpperCase() + project.ecosystem.slice(1)} {project.type}</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-600">Project Progress</span>
                <span className="text-cyan-800">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Project Details */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Project Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-cyan-600">Type:</span>
                  <p className="text-cyan-800 capitalize">{project.type}</p>
                </div>
                <div>
                  <span className="text-cyan-600">Ecosystem:</span>
                  <p className="text-cyan-800 capitalize">{project.ecosystem}</p>
                </div>
                <div>
                  <span className="text-cyan-600">Area:</span>
                  <p className="text-cyan-800">{project.area} hectares</p>
                </div>
                <div>
                  <span className="text-cyan-600">Workers:</span>
                  <p className="text-cyan-800">{project.workers} people</p>
                </div>
                <div>
                  <span className="text-cyan-600">Created:</span>
                  <p className="text-cyan-800">{new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-cyan-600">Last Updated:</span>
                  <p className="text-cyan-800">{new Date(project.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* NGO Partnership */}
            {project.ngoPartner && (
              <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-6">
                <h3 className="text-lg text-teal-800 mb-4">NGO Partnership</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <div className="text-white">🤝</div>
                  </div>
                  <div>
                    <p className="text-teal-800">{project.ngoPartner}</p>
                    <p className="text-teal-600 text-sm">Technical support and training partner</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Project Management Actions */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {onNavigateToWorkers && (
                <Button
                  onClick={onNavigateToWorkers}
                  variant="outline"
                  className="border-cyan-200 hover:bg-cyan-50"
                >
                  👥 Manage Workers
                </Button>
              )}
              {onNavigateToRequests && (
                <Button
                  onClick={onNavigateToRequests}
                  variant="outline"
                  className="border-cyan-200 hover:bg-cyan-50"
                >
                  📋 Track Requests
                </Button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={uploadProgressPhoto}
                disabled={isUploadingProgress}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {isUploadingProgress ? 'Uploading...' : '📸 Upload Progress'}
              </Button>
              <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50">
                💬 Ask NCCR
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            {/* Media Gallery */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Project Media</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.media.map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-lg p-4 border border-cyan-200">
                    <div className="aspect-square bg-gradient-to-br from-cyan-200 to-teal-200 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-cyan-600 text-2xl">📷</div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-cyan-800">Photo {index + 1}</p>
                      <p className="text-cyan-600">GPS: {item.gps}</p>
                      <p className="text-cyan-600">{new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {/* Progress Timeline */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Progress Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm">✓</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-800 text-sm">Initial site preparation completed</p>
                    <p className="text-cyan-600 text-xs">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm">📷</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-800 text-sm">Progress photos uploaded</p>
                    <p className="text-cyan-600 text-xs">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm">🌱</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-800 text-sm">Project approved and started</p>
                    <p className="text-cyan-600 text-xs">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upload Progress Button */}
            <Button
              onClick={uploadProgressPhoto}
              disabled={isUploadingProgress}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              {isUploadingProgress ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Uploading Progress...</span>
                </div>
              ) : (
                '📸 Upload New Progress Photos'
              )}
            </Button>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            {/* Training Materials */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Training & Guides</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">🎥</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-800 text-sm">Mangrove Planting Technique</p>
                    <p className="text-cyan-600 text-xs">5 min video • Available in local language</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Watch
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">📖</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-teal-800 text-sm">Species Selection Guide</p>
                    <p className="text-teal-600 text-xs">PDF guide • Best practices for coastal areas</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">🎯</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-emerald-800 text-sm">Quality Checklist</p>
                    <p className="text-emerald-600 text-xs">Interactive checklist • Track completion</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
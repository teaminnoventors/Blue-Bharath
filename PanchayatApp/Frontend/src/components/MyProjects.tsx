import React from 'react';
import { User, AppScreen, Project } from '../App';

interface MyProjectsProps {
  user: User;
  projects: Project[];
  onNavigate: (screen: AppScreen, project?: Project) => void;
  onBack: () => void;
}

export function MyProjects({ user, projects, onNavigate, onBack }: MyProjectsProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-cyan-100 text-cyan-700';
      case 'under-review':
        return 'bg-amber-100 text-amber-700';
      case 'approved':
        return 'bg-emerald-100 text-emerald-700';
      case 'credits-issued':
        return 'bg-green-100 text-green-700';
      case 'final-verification':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEcosystemEmoji = (ecosystem: string) => {
    switch (ecosystem) {
      case 'mangrove': return '🌿';
      case 'seagrass': return '🌱';
      default: return '🌾';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-6 max-w-md h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 py-2 z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="text-cyan-700 hover:bg-cyan-100 p-2 rounded-xl transition-colors active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl text-cyan-800 font-semibold">My Projects</h1>
          </div>
          
          <button
            onClick={() => onNavigate('create-project')}
            className="border border-cyan-200 text-cyan-700 hover:bg-cyan-50 px-3 py-2 rounded-xl text-sm transition-colors active:scale-95"
          >
            ➕ New Project
          </button>
        </div>

        {/* Projects Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 p-4 text-center rounded-2xl shadow-sm">
            <div className="text-2xl text-emerald-600 mb-1 font-semibold">{projects.filter(p => p.status === 'in-progress' || p.status === 'approved').length}</div>
            <div className="text-xs text-emerald-700 font-medium">Active</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-amber-200 p-4 text-center rounded-2xl shadow-sm">
            <div className="text-2xl text-amber-600 mb-1 font-semibold">{projects.filter(p => p.status === 'under-review' || p.status === 'final-verification').length}</div>
            <div className="text-xs text-amber-700 font-medium">In Review</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-cyan-200 p-4 text-center rounded-2xl shadow-sm">
            <div className="text-2xl text-cyan-600 mb-1 font-semibold">{projects.filter(p => p.status === 'credits-issued').length}</div>
            <div className="text-xs text-cyan-700 font-medium">Completed</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3 mb-6">
          {projects.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm border border-cyan-200 p-8 text-center rounded-2xl shadow-sm">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-lg text-cyan-800 mb-2 font-semibold">No Projects Yet</h3>
              <p className="text-sm text-cyan-600 mb-4">Start your first coastal restoration project</p>
              <button
                onClick={() => onNavigate('create-project')}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95"
              >
                ➕ Create Project
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/60 backdrop-blur-sm border border-cyan-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform"
                onClick={() => onNavigate('project-detail', project)}
              >
                <div className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                      <div className="text-white text-xl">
                        {getEcosystemEmoji(project.ecosystem)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-cyan-800 truncate font-medium">{project.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getStatusStyle(project.status)}`}>
                          {project.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-cyan-600 mb-2">
                        <div>📍 {project.area} hectares</div>
                        <div>👥 {project.workers} workers</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-cyan-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-cyan-700 font-medium">{project.progress}%</span>
                      </div>
                      
                      {project.ngoPartner && (
                        <div className="flex items-center space-x-1 mt-2">
                          <div className="text-xs text-cyan-500">🤝</div>
                          <span className="text-xs text-cyan-600">{project.ngoPartner}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Filter/Sort Options */}
        {projects.length > 0 && (
          <div className="flex justify-center pb-6">
            <div className="flex space-x-2 bg-white/60 backdrop-blur-sm rounded-full p-1 border border-cyan-200 shadow-sm">
              <button className="rounded-full text-xs px-3 py-1 text-cyan-700 bg-cyan-100 font-medium">
                All
              </button>
              <button className="rounded-full text-xs px-3 py-1 text-cyan-600 hover:bg-cyan-50 transition-colors">
                Active
              </button>
              <button className="rounded-full text-xs px-3 py-1 text-cyan-600 hover:bg-cyan-50 transition-colors">
                Completed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
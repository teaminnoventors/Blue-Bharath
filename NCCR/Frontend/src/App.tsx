import React, { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProjectsRegistry } from './components/projects/ProjectsRegistry';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { VerificationQueue } from './components/verification/VerificationQueue';
import { CarbonCreditCertificates } from './components/certificates/CarbonCreditCertificates';
import { GISMapConsole } from './components/gis/GISMapConsole';
import { DroneData } from './components/drone/DroneData';
import { FieldExpertAssignments } from './components/experts/FieldExpertAssignments';
import { SubmissionsAndUploads } from './components/submissions/SubmissionsAndUploads';
import { AnalyticsReports } from './components/analytics/AnalyticsReports';
import { AuditLogs } from './components/audit/AuditLogs';
import { UserManagement } from './components/settings/UserManagement';

type AuthState = {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: string;
    email: string;
  } | null;
};

type AppPage = 'dashboard' | 'projects' | 'project-detail' | 'map' | 'drone' | 'verification' | 'certificates' | 'experts' | 'submissions' | 'users' | 'reports' | 'audit';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleLogin = (credentials: { email: string; password: string; role: string; remember: boolean }) => {
    // Mock authentication - in real app, this would make API call
    setAuthState({
      isAuthenticated: true,
      user: {
        name: getUserNameFromRole(credentials.role),
        role: credentials.role,
        email: credentials.email
      }
    });
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
    if (page !== 'project-detail') {
      setSelectedProjectId(null);
    }
  };

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-detail');
  };

  const handleBackToProjects = () => {
    setCurrentPage('projects');
    setSelectedProjectId(null);
  };

  const getUserNameFromRole = (role: string): string => {
    const roleNames = {
      'SuperAdmin': 'Arjun Menon',
      'Verifier': 'Dr. Priya Sharma',
      'GIS Operator': 'Rajesh Kumar',
      'Finance Officer': 'Kavita Singh'
    };
    return roleNames[role as keyof typeof roleNames] || 'User';
  };

  const renderCurrentPage = () => {
    if (!authState.user) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={authState.user.role} onNavigate={handleNavigate} />;
      
      case 'projects':
        return <ProjectsRegistry onViewProject={handleViewProject} />;
      
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetail projectId={selectedProjectId} onBack={handleBackToProjects} />
        ) : (
          <div className="p-6">
            <div className="text-center space-y-4">
              <h2>Project not found</h2>
              <p className="text-muted-foreground">The requested project could not be found.</p>
              <button 
                onClick={() => setCurrentPage('projects')}
                className="text-primary hover:underline"
              >
                Return to Projects Registry
              </button>
            </div>
          </div>
        );
      
      case 'map':
        return <GISMapConsole />;
      
      case 'drone':
        return <DroneData />;
      
      case 'verification':
        return <VerificationQueue />;
      
      case 'certificates':
        return <CarbonCreditCertificates />;

      case 'experts':
        return <FieldExpertAssignments />;

      case 'submissions':
        return <SubmissionsAndUploads />;
      
      case 'users':
        return <UserManagement />;
      
      case 'reports':
        return <AnalyticsReports />;
      

      
      case 'audit':
        return <AuditLogs />;
      
      default:
        return <Dashboard userRole={authState.user.role} onNavigate={handleNavigate} />;
    }
  };

  // Show login page if not authenticated
  if (!authState.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <Navbar 
        user={{
          name: authState.user!.name,
          role: authState.user!.role
        }}
        notifications={12}
        onLogout={handleLogout}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          currentPage={currentPage}
          userRole={authState.user!.role}
          onNavigate={handleNavigate}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-background">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}
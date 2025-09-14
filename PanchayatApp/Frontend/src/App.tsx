import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { RoleSelector } from './components/RoleSelector';
import { PanchayatOnboarding } from './components/PanchayatOnboarding';
import { NGOOnboarding } from './components/NGOOnboarding';
import { PanchayatDashboard } from './components/PanchayatDashboard';
import { NGODashboard } from './components/NGODashboard';
import { MyProjects } from './components/MyProjects';
import { CreateProject } from './components/CreateProject';
import { ProjectDetail } from './components/ProjectDetail';
import { WorkerManagement } from './components/WorkerManagement';
import { RequestTracking } from './components/RequestTracking';
import { CertificatesCredits } from './components/CertificatesCredits';
import { GuidesTraining } from './components/GuidesTraining';
import { NotificationCenter } from './components/NotificationCenter';
import { NGOAuth } from './components/NGOAuth';
import { NGOAuthChoice } from './components/NGOAuthChoice';
import { NGOSignIn } from './components/NGOSignIn';
import { NGOSignUp } from './components/NGOSignUp';
import { AvailableProjects } from './components/AvailableProjects';
import { OfflineIndicator } from './components/ui/OfflineIndicator';

export type UserRole = 'panchayat' | 'ngo' | null;
export type AppScreen = 
  | 'splash' 
  | 'role-selector' 
  | 'panchayat-onboarding' 
  | 'ngo-onboarding'
  | 'ngo-auth-choice'
  | 'ngo-signin'
  | 'ngo-signup'
  | 'panchayat-dashboard'
  | 'ngo-dashboard'
  | 'available-projects'
  | 'my-projects'
  | 'create-project'
  | 'ngo-auth'
  | 'project-detail'
  | 'project-worker-management'
  | 'project-request-tracking'
  | 'certificates-credits'
  | 'guides-training'
  | 'notifications';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  isOnboarded: boolean;
  profile?: any;
}

export interface Project {
  id: string;
  title: string;
  type: 'plantation' | 'restoration';
  ecosystem: 'mangrove' | 'seagrass' | 'salt-marsh';
  area: number;
  status: 'submitted' | 'under-review' | 'corrections-requested' | 'approved' | 'in-progress' | 'final-verification' | 'credits-issued';
  progress: number;
  location: { lat: number; lng: number };
  media: Array<{ url: string; timestamp: string; gps: string }>;
  workers: number;
  ngoPartner?: string;
  createdAt: string;
  updatedAt: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNGO, setSelectedNGO] = useState<string>('');
  const [ngoUser, setNgoUser] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  // Mock projects data - in a real app this would come from backend/database
  const [projects] = useState<Project[]>([
    {
      id: 'proj-001',
      title: 'Coastal Mangrove Restoration',
      type: 'restoration',
      ecosystem: 'mangrove',
      area: 15,
      status: 'in-progress',
      progress: 65,
      location: { lat: 21.6515, lng: 88.2993 },
      media: [
        { url: 'mock-url-1', timestamp: '2024-01-15T10:00:00Z', gps: '21.6515, 88.2993' },
        { url: 'mock-url-2', timestamp: '2024-01-20T14:30:00Z', gps: '21.6520, 88.2995' },
        { url: 'mock-url-3', timestamp: '2024-01-25T11:15:00Z', gps: '21.6518, 88.2998' }
      ],
      workers: 24,
      ngoPartner: 'Coastal Conservation NGO',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-25T16:00:00Z'
    },
    {
      id: 'proj-002',
      title: 'Salt Marsh Conservation',
      type: 'plantation',
      ecosystem: 'salt-marsh',
      area: 8,
      status: 'under-review',
      progress: 25,
      location: { lat: 19.7515, lng: 85.3240 },
      media: [
        { url: 'mock-url-4', timestamp: '2024-01-22T09:00:00Z', gps: '19.7515, 85.3240' },
        { url: 'mock-url-5', timestamp: '2024-01-23T14:45:00Z', gps: '19.7520, 85.3245' }
      ],
      workers: 12,
      createdAt: '2024-01-22T09:00:00Z',
      updatedAt: '2024-01-23T11:00:00Z'
    },
    {
      id: 'proj-003',
      title: 'Seagrass Meadow Protection',
      type: 'restoration',
      ecosystem: 'seagrass',
      area: 5,
      status: 'approved',
      progress: 10,
      location: { lat: 20.2961, lng: 85.8245 },
      media: [
        { url: 'mock-url-6', timestamp: '2024-01-25T16:30:00Z', gps: '20.2961, 85.8245' }
      ],
      workers: 8,
      ngoPartner: 'Marine Habitat Foundation',
      createdAt: '2024-01-25T14:00:00Z',
      updatedAt: '2024-01-26T10:00:00Z'
    },
    {
      id: 'proj-004',
      title: 'Coral Reef Rehabilitation',
      type: 'restoration',
      ecosystem: 'mangrove',
      area: 12,
      status: 'credits-issued',
      progress: 100,
      location: { lat: 11.0168, lng: 76.9558 },
      media: [
        { url: 'mock-url-7', timestamp: '2023-12-10T08:00:00Z', gps: '11.0168, 76.9558' },
        { url: 'mock-url-8', timestamp: '2024-01-05T10:20:00Z', gps: '11.0170, 76.9560' },
        { url: 'mock-url-9', timestamp: '2024-01-15T15:45:00Z', gps: '11.0172, 76.9562' },
        { url: 'mock-url-10', timestamp: '2024-01-20T12:30:00Z', gps: '11.0175, 76.9565' }
      ],
      workers: 18,
      ngoPartner: 'Ocean Conservation Society',
      createdAt: '2023-12-01T09:00:00Z',
      updatedAt: '2024-01-20T17:00:00Z'
    },
    {
      id: 'proj-005',
      title: 'Wetland Ecosystem Restoration',
      type: 'plantation',
      ecosystem: 'salt-marsh',
      area: 20,
      status: 'final-verification',
      progress: 95,
      location: { lat: 22.9734, lng: 88.4631 },
      media: [
        { url: 'mock-url-11', timestamp: '2024-01-10T07:30:00Z', gps: '22.9734, 88.4631' },
        { url: 'mock-url-12', timestamp: '2024-01-18T13:15:00Z', gps: '22.9738, 88.4635' },
        { url: 'mock-url-13', timestamp: '2024-01-24T16:00:00Z', gps: '22.9740, 88.4638' }
      ],
      workers: 32,
      ngoPartner: 'Wetland Conservation Trust',
      createdAt: '2024-01-08T11:00:00Z',
      updatedAt: '2024-01-24T18:00:00Z'
    }
  ]);

  // Simulate splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('role-selector');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Network connectivity detection for web
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleRoleSelection = (role: UserRole) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      role,
      name: '',
      isOnboarded: false
    };
    setUser(newUser);
    
    if (role === 'panchayat') {
      setCurrentScreen('panchayat-onboarding');
    } else if (role === 'ngo') {
      setCurrentScreen('ngo-auth-choice');
    }
  };

  const handleOnboardingComplete = (profile: any) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        name: profile.name || profile.organizationName,
        isOnboarded: true,
        profile
      };
      setUser(updatedUser);
      
      if (user.role === 'panchayat') {
        setCurrentScreen('panchayat-dashboard');
      } else if (user.role === 'ngo') {
        setCurrentScreen('ngo-dashboard');
      }
    }
  };

  const navigateTo = (screen: AppScreen, project?: Project, ngoName?: string) => {
    if (project) {
      setSelectedProject(project);
    }
    if (ngoName) {
      setSelectedNGO(ngoName);
    }
    setCurrentScreen(screen);
  };

  const handleNgoAuthComplete = (authenticatedNgoUser: any) => {
    setNgoUser(authenticatedNgoUser);
    setCurrentScreen('create-project');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      
      case 'role-selector':
        return <RoleSelector onRoleSelect={handleRoleSelection} />;
      
      case 'panchayat-onboarding':
        return <PanchayatOnboarding onComplete={handleOnboardingComplete} />;
      
      case 'ngo-onboarding':
        return <NGOOnboarding onComplete={handleOnboardingComplete} />;
      
      case 'ngo-auth-choice':
        return (
          <NGOAuthChoice 
            onSignIn={() => navigateTo('ngo-signin')}
            onSignUp={() => navigateTo('ngo-signup')}
            onBack={() => navigateTo('role-selector')}
          />
        );
      
      case 'ngo-signin':
        return (
          <NGOSignIn 
            onSignInSuccess={handleOnboardingComplete}
            onBack={() => navigateTo('ngo-auth-choice')}
            onSwitchToSignUp={() => navigateTo('ngo-signup')}
          />
        );
      
      case 'ngo-signup':
        return (
          <NGOSignUp 
            onSignUpSuccess={handleOnboardingComplete}
            onBack={() => navigateTo('ngo-auth-choice')}
            onSwitchToSignIn={() => navigateTo('ngo-signin')}
          />
        );
      
      case 'panchayat-dashboard':
        return (
          <PanchayatDashboard 
            user={user!} 
            projects={projects}
            onNavigate={navigateTo}
            isOffline={isOffline}
            notifications={notifications}
          />
        );
      
      case 'ngo-dashboard':
        return (
          <NGODashboard 
            user={user!} 
            onNavigate={navigateTo}
            isOffline={isOffline}
            notifications={notifications}
          />
        );
      
      case 'available-projects':
        return (
          <AvailableProjects 
            user={user!}
            onBack={() => navigateTo('ngo-dashboard')}
          />
        );
      
      case 'my-projects':
        return (
          <MyProjects 
            user={user!} 
            projects={projects}
            onNavigate={navigateTo}
            onBack={() => navigateTo('panchayat-dashboard')}
          />
        );
      
      case 'create-project':
        return (
          <CreateProject 
            user={user!}
            onComplete={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
            onBack={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
          />
        );

      case 'ngo-auth':
        return (
          <NGOAuth 
            ngoName={selectedNGO}
            onComplete={handleNgoAuthComplete}
            onBack={() => navigateTo('create-project')}
          />
        );
      
      case 'project-detail':
        return (
          <ProjectDetail 
            project={selectedProject!}
            user={user!}
            onBack={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
            onNavigateToWorkers={() => navigateTo('project-worker-management')}
            onNavigateToRequests={() => navigateTo('project-request-tracking')}
          />
        );
      
      case 'project-worker-management':
        return (
          <WorkerManagement 
            user={user!}
            project={selectedProject!}
            onBack={() => navigateTo('project-detail')}
          />
        );
      
      case 'project-request-tracking':
        return (
          <RequestTracking 
            user={user!}
            project={selectedProject!}
            onBack={() => navigateTo('project-detail')}
          />
        );
      
      case 'certificates-credits':
        return (
          <CertificatesCredits 
            user={user!}
            onBack={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
          />
        );
      
      case 'guides-training':
        return (
          <GuidesTraining 
            user={user!}
            onBack={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
          />
        );
      
      case 'notifications':
        return (
          <NotificationCenter 
            user={user!}
            onBack={() => navigateTo(user?.role === 'panchayat' ? 'panchayat-dashboard' : 'ngo-dashboard')}
            onClearNotifications={() => setNotifications(0)}
          />
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mobile app viewport simulation */}
      <div className="min-h-screen max-w-md mx-auto bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 relative shadow-2xl">
        {renderCurrentScreen()}
        <OfflineIndicator isOffline={isOffline} />
      </div>
    </div>
  );
}
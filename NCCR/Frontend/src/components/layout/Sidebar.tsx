import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MapPin, 
  Plane, 
  CheckCircle, 
  Award, 
  Users, 
  BarChart3,
  Shield,
  UserCheck,
  Upload
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  currentPage: string;
  userRole: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
  count?: number;
}

const navigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Verifier', 'GIS Operator', 'Finance Officer']
  },
  {
    id: 'projects',
    label: 'Projects Registry',
    icon: <FolderOpen className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Verifier', 'GIS Operator'],
    count: 247
  },
  {
    id: 'map',
    label: 'GIS & Map Console',
    icon: <MapPin className="w-5 h-5" />,
    roles: ['SuperAdmin', 'GIS Operator', 'Verifier']
  },
  {
    id: 'drone',
    label: 'Drone Data',
    icon: <Plane className="w-5 h-5" />,
    roles: ['SuperAdmin', 'GIS Operator', 'Verifier']
  },
  {
    id: 'verification',
    label: 'Verification Queue',
    icon: <CheckCircle className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Verifier'],
    count: 23
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: <Award className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Finance Officer', 'Verifier']
  },
  {
    id: 'experts',
    label: 'Expert Assignments',
    icon: <UserCheck className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Verifier']
  },
  {
    id: 'submissions',
    label: 'Submissions',
    icon: <Upload className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Verifier'],
    count: 45
  },
  {
    id: 'users',
    label: 'User Management',
    icon: <Users className="w-5 h-5" />,
    roles: ['SuperAdmin']
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Finance Officer']
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: <Shield className="w-5 h-5" />,
    roles: ['SuperAdmin', 'Finance Officer']
  }
];

export function Sidebar({ currentPage, userRole, onNavigate }: SidebarProps) {
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="w-64 bg-white border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-medium text-foreground">Navigation</h2>
        <p className="text-sm text-muted-foreground">{userRole}</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 sidebar-scrollbar">
        {filteredNavigation.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
              currentPage === item.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-foreground hover:bg-muted"
            )}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            
            {item.count && (
              <span className={cn(
                "px-2 py-1 text-xs rounded-full",
                currentPage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground"
              )}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
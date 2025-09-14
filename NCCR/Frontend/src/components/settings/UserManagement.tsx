import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Settings,
  Shield,
  Key,
  Globe,
  Database,
  Bell,
  UserCheck,
  Mail,
  Phone,
  Building,
  MapPin,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'SuperAdmin' | 'Verifier' | 'GIS Operator' | 'Finance Officer';
  organization: string;
  organizationType: 'NCCR' | 'Panchayat' | 'NGO' | 'Expert';
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  createdDate: string;
  permissions: string[];
  projects: number;
}

interface Organization {
  id: string;
  name: string;
  type: 'Panchayat' | 'NGO' | 'Expert';
  registrationNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  district: string;
  status: 'Active' | 'Pending' | 'Suspended';
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  joinDate: string;
  activeProjects: number;
  completedProjects: number;
}

const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Arjun Menon',
    email: 'arjun.menon@nccr.gov.in',
    phone: '+91-9876543210',
    role: 'SuperAdmin',
    organization: 'NCCR Chennai',
    organizationType: 'NCCR',
    location: 'Chennai, Tamil Nadu',
    status: 'Active',
    lastLogin: '2024-01-30T15:30:00Z',
    createdDate: '2023-06-15',
    permissions: ['all'],
    projects: 156
  },
  {
    id: 'USR-002',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@nccr.gov.in',
    phone: '+91-9876543211',
    role: 'Verifier',
    organization: 'NCCR Field Operations',
    organizationType: 'NCCR',
    location: 'Bhubaneswar, Odisha',
    status: 'Active',
    lastLogin: '2024-01-30T14:22:00Z',
    createdDate: '2023-08-20',
    permissions: ['verify_projects', 'assign_experts', 'generate_reports'],
    projects: 34
  },
  {
    id: 'USR-003',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@nccr.gov.in',
    phone: '+91-9876543212',
    role: 'GIS Operator',
    organization: 'NCCR GIS Division',
    organizationType: 'NCCR',
    location: 'Kolkata, West Bengal',
    status: 'Active',
    lastLogin: '2024-01-30T13:45:00Z',
    createdDate: '2023-09-10',
    permissions: ['manage_gis', 'process_drone_data', 'generate_maps'],
    projects: 89
  },
  {
    id: 'USR-004',
    name: 'Kavita Singh',
    email: 'kavita.singh@nccr.gov.in',
    phone: '+91-9876543213',
    role: 'Finance Officer',
    organization: 'NCCR Finance Division',
    organizationType: 'NCCR',
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    lastLogin: '2024-01-30T12:10:00Z',
    createdDate: '2023-07-05',
    permissions: ['manage_certificates', 'financial_reports', 'revenue_tracking'],
    projects: 67
  }
];

const mockOrganizations: Organization[] = [
  {
    id: 'ORG-001',
    name: 'Gosaba Gram Panchayat',
    type: 'Panchayat',
    registrationNumber: 'GP-WB-2019-001',
    contactPerson: 'Shri Ramesh Kumar',
    email: 'gosaba.gp@wb.gov.in',
    phone: '+91-9876543214',
    address: 'Gosaba, South 24 Parganas',
    state: 'West Bengal',
    district: 'South 24 Parganas',
    status: 'Active',
    verificationStatus: 'Verified',
    joinDate: '2023-03-15',
    activeProjects: 5,
    completedProjects: 12
  },
  {
    id: 'ORG-002',
    name: 'Sundarbans Conservation Society',
    type: 'NGO',
    registrationNumber: 'NGO-WB-2018-156',
    contactPerson: 'Dr. Mamata Roy',
    email: 'info@sundarbansconservation.org',
    phone: '+91-9876543215',
    address: 'Canning, South 24 Parganas',
    state: 'West Bengal',
    district: 'South 24 Parganas',
    status: 'Active',
    verificationStatus: 'Verified',
    joinDate: '2023-04-20',
    activeProjects: 8,
    completedProjects: 23
  },
  {
    id: 'ORG-003',
    name: 'Marine Conservation Foundation',
    type: 'NGO',
    registrationNumber: 'NGO-TN-2020-089',
    contactPerson: 'Dr. Arun Sharma',
    email: 'contact@marineconservation.org',
    phone: '+91-9876543216',
    address: 'Rameswaram, Ramanathapuram',
    state: 'Tamil Nadu',
    district: 'Ramanathapuram',
    status: 'Pending',
    verificationStatus: 'Pending',
    joinDate: '2024-01-25',
    activeProjects: 2,
    completedProjects: 0
  }
];

const roleConfig = {
  'SuperAdmin': { color: 'bg-red-100 text-red-800' },
  'Verifier': { color: 'bg-blue-100 text-blue-800' },
  'GIS Operator': { color: 'bg-green-100 text-green-800' },
  'Finance Officer': { color: 'bg-purple-100 text-purple-800' }
};

const statusConfig = {
  'Active': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'Inactive': { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  'Pending': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  'Suspended': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
};

const verificationConfig = {
  'Verified': { color: 'bg-green-100 text-green-800' },
  'Pending': { color: 'bg-yellow-100 text-yellow-800' },
  'Rejected': { color: 'bg-red-100 text-red-800' }
};

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addOrgOpen, setAddOrgOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  // System Configuration States
  const [systemConfig, setSystemConfig] = useState({
    apiKeys: {
      mapboxToken: '••••••••••••••••••••••••••••••••',
      blockchainNode: '••••••••••••••••••••••••••••••••',
      emailService: '••••••••••••••••••••••••••••••••'
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      webhookEnabled: false
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 30,
      passwordComplexity: 'high'
    }
  });

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    toast.success('User added successfully');
    setAddUserOpen(false);
  };

  const handleAddOrganization = () => {
    toast.success('Organization added successfully');
    setAddOrgOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Settings & User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, organizations, and system configurations
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Accounts</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="permissions">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* User Stats & Controls */}
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 mr-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{mockUsers.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {mockUsers.filter(u => u.status === 'Active').length}
                      </p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {mockUsers.filter(u => u.status === 'Pending').length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Roles</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button onClick={() => setAddUserOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* User Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="SuperAdmin">Super Admin</SelectItem>
                    <SelectItem value="Verifier">Verifier</SelectItem>
                    <SelectItem value="GIS Operator">GIS Operator</SelectItem>
                    <SelectItem value="Finance Officer">Finance Officer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={roleConfig[user.role]}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.organization}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium">{user.projects}</span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm">
                        {new Date(user.lastLogin).toLocaleDateString('en-IN')}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={statusConfig[user.status].color}
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[user.status].dot}`} />
                        {user.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Organization Management</h2>
            <Button onClick={() => setAddOrgOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Organization
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrganizations.map((org) => (
                  <TableRow key={org.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.registrationNumber}</div>
                        <div className="text-xs text-muted-foreground">{org.email}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline">{org.type}</Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <div className="text-sm">{org.contactPerson}</div>
                        <div className="text-xs text-muted-foreground">{org.phone}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <div>{org.district}</div>
                        <div className="text-muted-foreground">{org.state}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <div>Active: {org.activeProjects}</div>
                        <div className="text-muted-foreground">Completed: {org.completedProjects}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={verificationConfig[org.verificationStatus]}
                      >
                        {org.verificationStatus}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={statusConfig[org.status].color}
                      >
                        {org.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <h2 className="text-lg font-medium">Roles & Permissions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(roleConfig).map(([role, config]) => (
              <Card key={role}>
                <CardHeader>
                  <CardTitle className="text-lg">{role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {role === 'SuperAdmin' && 'Full system access and administration'}
                    {role === 'Verifier' && 'Project verification and expert assignment'}
                    {role === 'GIS Operator' && 'GIS data management and processing'}
                    {role === 'Finance Officer' && 'Certificate and financial management'}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Permissions:</h4>
                    <div className="space-y-1 text-xs">
                      {role === 'SuperAdmin' && (
                        <>
                          <div>✓ All system functions</div>
                          <div>✓ User management</div>
                          <div>✓ System configuration</div>
                        </>
                      )}
                      {role === 'Verifier' && (
                        <>
                          <div>✓ Verify projects</div>
                          <div>✓ Assign experts</div>
                          <div>✓ Generate reports</div>
                        </>
                      )}
                      {role === 'GIS Operator' && (
                        <>
                          <div>✓ Manage GIS data</div>
                          <div>✓ Process drone data</div>
                          <div>✓ Generate maps</div>
                        </>
                      )}
                      {role === 'Finance Officer' && (
                        <>
                          <div>✓ Manage certificates</div>
                          <div>✓ Financial reports</div>
                          <div>✓ Revenue tracking</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Configuration Tab */}
        <TabsContent value="system" className="space-y-6">
          <h2 className="text-lg font-medium">System Configuration</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Keys & Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys & Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Mapbox Access Token</Label>
                  <div className="flex gap-2">
                    <Input value={systemConfig.apiKeys.mapboxToken} readOnly />
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Blockchain Node URL</Label>
                  <div className="flex gap-2">
                    <Input value={systemConfig.apiKeys.blockchainNode} readOnly />
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email Service API Key</Label>
                  <div className="flex gap-2">
                    <Input value={systemConfig.apiKeys.emailService} readOnly />
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send email alerts and updates</p>
                  </div>
                  <Switch 
                    checked={systemConfig.notifications.emailEnabled}
                    onCheckedChange={(checked) => setSystemConfig(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailEnabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send SMS alerts for critical events</p>
                  </div>
                  <Switch 
                    checked={systemConfig.notifications.smsEnabled}
                    onCheckedChange={(checked) => setSystemConfig(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsEnabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Webhook Integration</Label>
                    <p className="text-xs text-muted-foreground">External system integrations</p>
                  </div>
                  <Switch 
                    checked={systemConfig.notifications.webhookEnabled}
                    onCheckedChange={(checked) => setSystemConfig(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, webhookEnabled: checked }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch 
                    checked={systemConfig.security.twoFactorRequired}
                    onCheckedChange={(checked) => setSystemConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorRequired: checked }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input 
                    type="number"
                    value={systemConfig.security.sessionTimeout}
                    onChange={(e) => setSystemConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Password Complexity</Label>
                  <Select 
                    value={systemConfig.security.passwordComplexity}
                    onValueChange={(value) => setSystemConfig(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordComplexity: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Status:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Blockchain Node:</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Usage:</span>
                    <span className="text-sm">78% (234 GB / 300 GB)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Backup:</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime:</span>
                    <span className="text-sm">99.8%</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate role and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="user@nccr.gov.in" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91-9876543210" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verifier">Verifier</SelectItem>
                  <SelectItem value="GIS Operator">GIS Operator</SelectItem>
                  <SelectItem value="Finance Officer">Finance Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Organization Dialog */}
      <Dialog open={addOrgOpen} onOpenChange={setAddOrgOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Organization</DialogTitle>
            <DialogDescription>
              Register a new Panchayat or NGO partner organization.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input placeholder="Enter organization name" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Panchayat">Panchayat</SelectItem>
                  <SelectItem value="NGO">NGO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <Input placeholder="Official registration number" />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input placeholder="Primary contact person" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="organization@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91-9876543210" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea placeholder="Complete address" rows={3} />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOrgOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddOrganization}>
              Add Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
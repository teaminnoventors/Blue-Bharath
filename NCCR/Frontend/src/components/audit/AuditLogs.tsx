import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter,
  User,
  Activity,
  Eye,
  Download,
  Hash,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  UserCheck,
  Settings,
  FileText,
  FileSpreadsheet,
  CalendarIcon,
  FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userType: 'Panchayat' | 'NGO' | 'Expert' | 'NCCR Officer' | 'System';
  actionType: 'Upload' | 'Verification' | 'Approval' | 'Rejection' | 'Assignment' | 'Status Update' | 'Login' | 'Data Export' | 'System Change';
  description: string;
  projectId?: string;
  resourceId?: string;
  ipAddress: string;
  userAgent?: string;
  status: 'Success' | 'Failed' | 'Pending';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  blockchainHash?: string;
  metadata?: Record<string, any>;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUDIT-001',
    timestamp: '2024-01-30T15:30:45Z',
    user: 'Dr. Rajesh Kumar',
    userType: 'Expert',
    actionType: 'Verification',
    description: 'Project verification completed for NCCR-2024-001',
    projectId: 'NCCR-2024-001',
    resourceId: 'VERIFY-001',
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Success',
    severity: 'Medium',
    blockchainHash: '0x742d35cc6c8b3b1e96e5f5e4f8d2a1b3c4e5f6a7b8c9d0',
    metadata: {
      verificationResult: 'Approved',
      qualityScore: 94,
      fieldVisitRequired: false
    }
  },
  {
    id: 'AUDIT-002',
    timestamp: '2024-01-30T14:22:15Z',
    user: 'Gosaba Gram Panchayat',
    userType: 'Panchayat',
    actionType: 'Upload',
    description: 'Site documentation uploaded for mangrove restoration project',
    projectId: 'NCCR-2024-001',
    resourceId: 'UPLOAD-045',
    ipAddress: '203.124.89.156',
    userAgent: 'Mozilla/5.0 (Android 12; Mobile; rv:109.0) Gecko/109.0 Firefox/110.0',
    status: 'Success',
    severity: 'Low',
    metadata: {
      fileCount: 12,
      totalSize: '45.2 MB',
      fileTypes: ['jpg', 'pdf']
    }
  },
  {
    id: 'AUDIT-003',
    timestamp: '2024-01-30T13:45:33Z',
    user: 'System Auto-Processor',
    userType: 'System',
    actionType: 'Status Update',
    description: 'Project status automatically updated from field verification to final review',
    projectId: 'NCCR-2024-003',
    resourceId: 'STATUS-003',
    ipAddress: '10.0.0.1',
    status: 'Success',
    severity: 'Low',
    blockchainHash: '0x8a3b2c1d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f',
    metadata: {
      oldStatus: 'Field Verification',
      newStatus: 'Final Review',
      autoTrigger: 'Expert Report Submission'
    }
  },
  {
    id: 'AUDIT-004',
    timestamp: '2024-01-30T12:18:22Z',
    user: 'admin@nccr.gov.in',
    userType: 'NCCR Officer',
    actionType: 'Assignment',
    description: 'Expert assigned to coral reef restoration project',
    projectId: 'NCCR-2024-004',
    resourceId: 'ASSIGN-005',
    ipAddress: '10.0.5.23',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    status: 'Success',
    severity: 'Medium',
    metadata: {
      expertId: 'EXP-005',
      expertName: 'Dr. Vikram Singh',
      role: 'GPS Surveyor',
      estimatedDuration: '3 days'
    }
  },
  {
    id: 'AUDIT-005',
    timestamp: '2024-01-30T11:55:14Z',
    user: 'Tamil Nadu Marine Foundation',
    userType: 'NGO',
    actionType: 'Upload',
    description: 'Project proposal revision uploaded',
    projectId: 'NCCR-2024-007',
    resourceId: 'UPLOAD-046',
    ipAddress: '49.205.67.89',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Success',
    severity: 'Low',
    metadata: {
      documentType: 'Project Proposal',
      version: 'v2.1',
      fileSize: '8.7 MB'
    }
  },
  {
    id: 'AUDIT-006',
    timestamp: '2024-01-30T10:33:41Z',
    user: 'verifier@nccr.gov.in',
    userType: 'NCCR Officer',
    actionType: 'Rejection',
    description: 'Project submission rejected due to incomplete documentation',
    projectId: 'NCCR-2024-008',
    resourceId: 'REJECT-001',
    ipAddress: '10.0.5.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Success',
    severity: 'High',
    metadata: {
      rejectionReason: 'Incomplete environmental clearance documentation',
      requiredActions: ['Submit complete clearance certificate', 'Provide missing signatures']
    }
  },
  {
    id: 'AUDIT-007',
    timestamp: '2024-01-30T09:15:28Z',
    user: 'admin@nccr.gov.in',
    userType: 'NCCR Officer',
    actionType: 'Data Export',
    description: 'Analytics report exported to PDF',
    resourceId: 'EXPORT-012',
    ipAddress: '10.0.5.23',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    status: 'Success',
    severity: 'Medium',
    metadata: {
      reportType: 'Monthly Analytics',
      dateRange: '2024-01-01 to 2024-01-30',
      includedProjects: 88
    }
  },
  {
    id: 'AUDIT-008',
    timestamp: '2024-01-30T08:42:11Z',
    user: 'backup-service',
    userType: 'System',
    actionType: 'System Change',
    description: 'Automated database backup completed',
    resourceId: 'BACKUP-030124',
    ipAddress: '10.0.0.2',
    status: 'Success',
    severity: 'Low',
    metadata: {
      backupSize: '2.3 GB',
      compressionRatio: '68%',
      storageLocation: 'AWS S3'
    }
  }
];

const actionTypeConfig = {
  'Upload': { color: 'bg-blue-100 text-blue-800', icon: Upload },
  'Verification': { color: 'bg-green-100 text-green-800', icon: Shield },
  'Approval': { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
  'Rejection': { color: 'bg-red-100 text-red-800', icon: XCircle },
  'Assignment': { color: 'bg-purple-100 text-purple-800', icon: UserCheck },
  'Status Update': { color: 'bg-yellow-100 text-yellow-800', icon: Activity },
  'Login': { color: 'bg-gray-100 text-gray-800', icon: User },
  'Data Export': { color: 'bg-orange-100 text-orange-800', icon: Download },
  'System Change': { color: 'bg-indigo-100 text-indigo-800', icon: Settings }
};

const severityConfig = {
  'Low': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'Medium': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  'High': { color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  'Critical': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
};

const statusConfig = {
  'Success': { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'Failed': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  'Pending': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' }
};

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last-7-days');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.projectId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = userFilter === 'all' || log.userType === userFilter;
    const matchesRole = roleFilter === 'all' || log.userType === roleFilter;
    const matchesProject = projectFilter === 'all' || log.projectId === projectFilter;
    const matchesAction = actionFilter === 'all' || log.actionType === actionFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    
    // Date filtering
    let matchesDate = true;
    if (startDate && endDate) {
      const logDate = new Date(log.timestamp);
      matchesDate = logDate >= startDate && logDate <= endDate;
    } else if (dateRange !== 'custom') {
      const now = new Date();
      const logDate = new Date(log.timestamp);
      
      switch (dateRange) {
        case 'last-24-hours':
          matchesDate = (now.getTime() - logDate.getTime()) <= (24 * 60 * 60 * 1000);
          break;
        case 'last-7-days':
          matchesDate = (now.getTime() - logDate.getTime()) <= (7 * 24 * 60 * 60 * 1000);
          break;
        case 'last-30-days':
          matchesDate = (now.getTime() - logDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
          break;
        case 'last-90-days':
          matchesDate = (now.getTime() - logDate.getTime()) <= (90 * 24 * 60 * 60 * 1000);
          break;
      }
    }
    
    return matchesSearch && matchesUser && matchesRole && matchesProject && matchesAction && matchesSeverity && matchesDate;
  });

  const handleExportLogs = (format: 'csv' | 'excel' | 'pdf') => {
    const exportData = filteredLogs.map(log => ({
      ID: log.id,
      Timestamp: new Date(log.timestamp).toLocaleString('en-IN'),
      User: log.user,
      UserType: log.userType,
      Action: log.actionType,
      Description: log.description,
      ProjectID: log.projectId || 'N/A',
      Status: log.status,
      Severity: log.severity,
      IPAddress: log.ipAddress,
      BlockchainHash: log.blockchainHash || 'N/A'
    }));

    // Mock export functionality
    switch (format) {
      case 'csv':
        toast.success(`Audit logs exported to CSV (${exportData.length} records)`);
        break;
      case 'excel':
        toast.success(`Audit logs exported to Excel (${exportData.length} records)`);
        break;
      case 'pdf':
        toast.success(`Audit logs exported to PDF (${exportData.length} records)`);
        break;
    }
  };

  const getUniqueProjects = () => {
    const projects = mockAuditLogs
      .filter(log => log.projectId)
      .map(log => log.projectId!)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    return projects;
  };

  const getLogCounts = () => {
    return {
      total: filteredLogs.length,
      success: filteredLogs.filter(l => l.status === 'Success').length,
      failed: filteredLogs.filter(l => l.status === 'Failed').length,
      critical: filteredLogs.filter(l => l.severity === 'Critical').length
    };
  };

  const logCounts = getLogCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Audit Logs & Compliance</h1>
          <p className="text-muted-foreground mt-1">
            {logCounts.total} log entries • {logCounts.failed} failures • {logCounts.critical} critical events
          </p>
          <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">
              🔒 <strong>Immutable Records:</strong> All audit logs are append-only and secured with blockchain verification
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={(value) => {
            setDateRange(value);
            if (value !== 'custom') {
              setStartDate(undefined);
              setEndDate(undefined);
            }
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {dateRange === 'custom' && (
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-60">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {startDate && endDate 
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : 'Select date range'
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border-r"
                  />
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="rounded-md"
                  />
                </div>
                <div className="p-3 border-t">
                  <Button 
                    onClick={() => setShowDatePicker(false)} 
                    className="w-full"
                    disabled={!startDate || !endDate}
                  >
                    Apply Date Range
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExportLogs('csv')}>
                <FileText className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportLogs('excel')}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportLogs('pdf')}>
                <FileText className="w-4 h-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-muted-foreground">
                {filteredLogs.length} records will be exported
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{logCounts.total}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{logCounts.success}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{logCounts.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-orange-600">{logCounts.critical}</p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* User Type Filter */}
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="Panchayat">Panchayats</SelectItem>
                <SelectItem value="NGO">NGOs</SelectItem>
                <SelectItem value="Expert">Experts</SelectItem>
                <SelectItem value="NCCR Officer">NCCR Officers</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>

            {/* Project Filter */}
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {getUniqueProjects().map(projectId => (
                  <SelectItem key={projectId} value={projectId}>
                    {projectId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Action Type Filter */}
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Upload">Uploads</SelectItem>
                <SelectItem value="Verification">Verifications</SelectItem>
                <SelectItem value="Approval">Approvals</SelectItem>
                <SelectItem value="Rejection">Rejections</SelectItem>
                <SelectItem value="Assignment">Assignments</SelectItem>
                <SelectItem value="Status Update">Status Updates</SelectItem>
                <SelectItem value="Login">Logins</SelectItem>
                <SelectItem value="Data Export">Data Exports</SelectItem>
                <SelectItem value="System Change">System Changes</SelectItem>
              </SelectContent>
            </Select>

            {/* Severity Filter */}
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Second row for clear filters */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {mockAuditLogs.length} audit entries
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setUserFilter('all');
                setRoleFilter('all');
                setProjectFilter('all');
                setActionFilter('all');
                setSeverityFilter('all');
                setDateRange('last-7-days');
                setStartDate(undefined);
                setEndDate(undefined);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Blockchain</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm">
                        {new Date(log.timestamp).toLocaleDateString('en-IN')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString('en-IN')}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="font-mono text-sm">{log.id}</div>
                  {log.projectId && (
                    <div className="text-xs text-muted-foreground">{log.projectId}</div>
                  )}
                </TableCell>
                
                <TableCell>
                  <div>
                    <div className="font-medium text-sm">{log.user}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {log.userType}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={actionTypeConfig[log.actionType]?.color || 'bg-gray-100 text-gray-800'}
                  >
                    {log.actionType}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-sm truncate">{log.description}</p>
                    {log.resourceId && (
                      <p className="text-xs text-muted-foreground font-mono">
                        Resource: {log.resourceId}
                      </p>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={statusConfig[log.status].color}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[log.status].dot}`} />
                    {log.status}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={severityConfig[log.severity].color}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${severityConfig[log.severity].dot}`} />
                    {log.severity}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  {log.blockchainHash ? (
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-green-600" />
                      <div className="font-mono text-xs truncate max-w-24">
                        {log.blockchainHash.slice(0, 8)}...
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                
                <TableCell>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* System Integrity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            System Integrity & Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600">Security Measures</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Blockchain Integrity:</span>
                  <Badge className="bg-green-100 text-green-800">✓ Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Encryption:</span>
                  <Badge className="bg-green-100 text-green-800">✓ AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access Controls:</span>
                  <Badge className="bg-green-100 text-green-800">✓ RBAC Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Trail:</span>
                  <Badge className="bg-green-100 text-green-800">✓ Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tamper Detection:</span>
                  <Badge className="bg-green-100 text-green-800">✓ No Issues</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-blue-600">Compliance Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Data Retention:</span>
                  <Badge className="bg-blue-100 text-blue-800">✓ 7-Year Policy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>User Consent:</span>
                  <Badge className="bg-blue-100 text-blue-800">✓ Documented</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>GDPR Compliance:</span>
                  <Badge className="bg-blue-100 text-blue-800">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Backup & Recovery:</span>
                  <Badge className="bg-blue-100 text-blue-800">✓ Tested Daily</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Regulatory Audit:</span>
                  <Badge className="bg-blue-100 text-blue-800">✓ Up to Date</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-purple-600">System Health</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Database Performance:</span>
                  <Badge className="bg-purple-100 text-purple-800">✓ 99.8% Uptime</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Response Time:</span>
                  <Badge className="bg-purple-100 text-purple-800">✓ &lt;120ms avg</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storage Utilization:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">⚠ 78%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Memory Usage:</span>
                  <Badge className="bg-purple-100 text-purple-800">✓ 65%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last System Check:</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-orange-600">Access & Monitoring</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Active Sessions:</span>
                  <Badge className="bg-orange-100 text-orange-800">47 Users</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Failed Login Attempts:</span>
                  <Badge className="bg-green-100 text-green-800">✓ 0 Today</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>IP Whitelist Status:</span>
                  <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Blockchain Sync:</span>
                  <Badge className="bg-green-100 text-green-800">✓ Block #2,847,392</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Security Scan:</span>
                  <span className="text-muted-foreground">45 min ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blockchain Status Footer */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-800">Blockchain Network Status: Connected</span>
              </div>
              <div className="text-sm text-gray-600">
                Gas Price: 12 Gwei • Network: Ethereum Mainnet • Confirmations: 6+
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              📊 All audit records are automatically synchronized with our blockchain infrastructure every 5 minutes for immutable storage
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
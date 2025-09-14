import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  Users,
  MapPin,
  Award,
  Leaf,
  FileText,
  PieChart,
  Activity,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { toast } from 'sonner@2.0.3';

const ecosystemData = [
  { name: 'Mangrove', hectares: 234.5, projects: 12, credits: 9876, color: '#10b981' },
  { name: 'Seagrass', hectares: 156.8, projects: 8, credits: 6543, color: '#06b6d4' },
  { name: 'Salt Marsh', hectares: 189.2, projects: 10, credits: 7920, color: '#8b5cf6' },
  { name: 'Coral Reef', hectares: 87.3, projects: 6, credits: 3654, color: '#f59e0b' },
  { name: 'Estuary', hectares: 298.1, projects: 15, credits: 12456, color: '#ef4444' }
];

const monthlyCreditsData = [
  { month: 'Jul 2023', credits: 1200, projects: 3 },
  { month: 'Aug 2023', credits: 2100, projects: 5 },
  { month: 'Sep 2023', credits: 1800, projects: 4 },
  { month: 'Oct 2023', credits: 3200, projects: 7 },
  { month: 'Nov 2023', credits: 4100, projects: 9 },
  { month: 'Dec 2023', credits: 3800, projects: 8 },
  { month: 'Jan 2024', credits: 5400, projects: 12 },
  { month: 'Feb 2024', credits: 6200, projects: 14 }
];

const stateWiseData = [
  { state: 'West Bengal', projects: 18, hectares: 156.7, credits: 6543 },
  { state: 'Tamil Nadu', projects: 14, hectares: 123.4, credits: 5210 },
  { state: 'Odisha', projects: 16, hectares: 189.2, credits: 7920 },
  { state: 'Kerala', projects: 12, hectares: 98.6, credits: 4125 },
  { state: 'Gujarat', projects: 10, hectares: 87.3, credits: 3654 },
  { state: 'Andhra Pradesh', projects: 8, hectares: 76.8, credits: 3210 },
  { state: 'Karnataka', projects: 6, hectares: 45.2, credits: 1890 },
  { state: 'Goa', projects: 4, hectares: 32.1, credits: 1345 }
];

const statusDistribution = [
  { name: 'Verified', value: 23, color: '#10b981' },
  { name: 'Completed', value: 18, color: '#06b6d4' },
  { name: 'Ongoing', value: 31, color: '#f59e0b' },
  { name: 'Pending', value: 16, color: '#ef4444' }
];

const organizationStats = {
  panchayats: {
    total: 156,
    active: 134,
    newThisMonth: 12
  },
  ngos: {
    total: 89,
    active: 76,
    newThisMonth: 5
  },
  experts: {
    total: 45,
    active: 38,
    assigned: 23
  }
};

const COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6'];

export function AnalyticsReports() {
  const [timeRange, setTimeRange] = useState('last-6-months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const handleExportReport = (format: 'pdf' | 'csv') => {
    toast.success(`Analytics report exported as ${format.toUpperCase()}`);
  };

  const totalHectares = ecosystemData.reduce((sum, item) => sum + item.hectares, 0);
  const totalProjects = ecosystemData.reduce((sum, item) => sum + item.projects, 0);
  const totalCredits = ecosystemData.reduce((sum, item) => sum + item.credits, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into blue carbon project performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExportReport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => handleExportReport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              PDF Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-primary">{totalProjects}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% from last month</p>
              </div>
              <FileText className="w-12 h-12 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hectares Restored</p>
                <p className="text-3xl font-bold text-green-600">{totalHectares.toFixed(1)}</p>
                <p className="text-xs text-green-600 mt-1">↗ +8% from last month</p>
              </div>
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Credits</p>
                <p className="text-3xl font-bold text-blue-600">{totalCredits.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ +15% from last month</p>
              </div>
              <Award className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Organizations</p>
                <p className="text-3xl font-bold text-purple-600">
                  {organizationStats.panchayats.active + organizationStats.ngos.active}
                </p>
                <p className="text-xs text-green-600 mt-1">↗ +6% from last month</p>
              </div>
              <Users className="w-12 h-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ecosystem Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Ecosystem Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={ecosystemData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hectares"
                  >
                    {ecosystemData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} hectares`, 'Area']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {ecosystemData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{item.hectares} ha</span>
                    <span className="text-muted-foreground ml-2">({item.projects} projects)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carbon Credits Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Carbon Credits Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyCreditsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value} credits`, 'Credits Generated']} />
                  <Line 
                    type="monotone" 
                    dataKey="credits" 
                    stroke="#0891b2" 
                    strokeWidth={3}
                    dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State-wise Performance & Project Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State-wise Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              State-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateWiseData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="state" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="hectares" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <Badge variant="outline">{item.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Organization Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Panchayats */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Panchayats</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Registered:</span>
                  <span className="font-medium">{organizationStats.panchayats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-medium text-green-600">{organizationStats.panchayats.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New this month:</span>
                  <span className="font-medium text-blue-600">+{organizationStats.panchayats.newThisMonth}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Activity Rate</span>
                    <span>{Math.round((organizationStats.panchayats.active / organizationStats.panchayats.total) * 100)}%</span>
                  </div>
                  <Progress value={(organizationStats.panchayats.active / organizationStats.panchayats.total) * 100} />
                </div>
              </div>
            </div>

            {/* NGOs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">NGO Partners</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Registered:</span>
                  <span className="font-medium">{organizationStats.ngos.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-medium text-green-600">{organizationStats.ngos.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New this month:</span>
                  <span className="font-medium text-blue-600">+{organizationStats.ngos.newThisMonth}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Activity Rate</span>
                    <span>{Math.round((organizationStats.ngos.active / organizationStats.ngos.total) * 100)}%</span>
                  </div>
                  <Progress value={(organizationStats.ngos.active / organizationStats.ngos.total) * 100} />
                </div>
              </div>
            </div>

            {/* Field Experts */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">Field Experts</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Experts:</span>
                  <span className="font-medium">{organizationStats.experts.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium text-green-600">{organizationStats.experts.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Currently Assigned:</span>
                  <span className="font-medium text-yellow-600">{organizationStats.experts.assigned}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Utilization Rate</span>
                    <span>{Math.round((organizationStats.experts.assigned / organizationStats.experts.active) * 100)}%</span>
                  </div>
                  <Progress value={(organizationStats.experts.assigned / organizationStats.experts.active) * 100} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-green-600">Positive Trends</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span>Carbon credit generation increased by 15% this month</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span>Mangrove restoration projects showing highest success rate (94%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span>West Bengal leading in both project count and restored area</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span>Average project completion time reduced to 4.2 months</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-amber-600">Areas for Improvement</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                  <span>Coral reef projects need additional technical support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                  <span>16 projects currently pending initial review</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                  <span>Expert utilization could be optimized in Gujarat and Karnataka</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                  <span>NGO onboarding process taking longer than expected</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
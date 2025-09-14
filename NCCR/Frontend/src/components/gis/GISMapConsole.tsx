import React, { useState } from 'react';
import { 
  Map, 
  Satellite, 
  Mountain, 
  Filter,
  MapPin,
  Users,
  Building,
  Leaf,
  Calendar,
  BarChart3,
  Eye,
  ExternalLink
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
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

interface MapProject {
  id: string;
  title: string;
  panchayat: string;
  ngo: string;
  hectares: number;
  stage: string;
  status: 'Pending' | 'Ongoing' | 'Completed' | 'Verified';
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Salt Marsh' | 'Coral Reef' | 'Estuary';
  state: string;
  coordinates: { lat: number; lng: number };
  progress: number;
  startDate: string;
  lastUpdate: string;
  description: string;
  images: Array<{
    id: string;
    type: 'satellite' | 'drone' | 'ground';
    date: string;
    description: string;
  }>;
}

const mockMapProjects: MapProject[] = [
  {
    id: 'NCCR-2024-001',
    title: 'Mangrove Restoration - Sundarbans West',
    panchayat: 'Gosaba Gram Panchayat',
    ngo: 'Sundarbans Conservation Society',
    hectares: 45.2,
    stage: 'Field Verification',
    status: 'Ongoing',
    ecosystemType: 'Mangrove',
    state: 'West Bengal',
    coordinates: { lat: 21.9162, lng: 88.4431 },
    progress: 65,
    startDate: '2024-01-15',
    lastUpdate: '2024-01-28',
    description: 'Large-scale mangrove restoration in Sundarbans delta',
    images: [
      { id: 'sat1', type: 'satellite', date: '2024-01-28', description: 'Latest satellite imagery showing restoration progress' },
      { id: 'drone1', type: 'drone', date: '2024-01-25', description: 'Drone survey of mangrove saplings' }
    ]
  },
  {
    id: 'NCCR-2024-002',
    title: 'Seagrass Conservation - Palk Bay',
    panchayat: 'Rameswaram Gram Panchayat',
    ngo: 'Marine Conservation Foundation',
    hectares: 23.8,
    stage: 'Implementation',
    status: 'Ongoing',
    ecosystemType: 'Seagrass',
    state: 'Tamil Nadu',
    coordinates: { lat: 9.2876, lng: 79.3129 },
    progress: 80,
    startDate: '2024-01-12',
    lastUpdate: '2024-01-27',
    description: 'Seagrass meadow enhancement in Palk Bay',
    images: [
      { id: 'sat2', type: 'satellite', date: '2024-01-27', description: 'Underwater seagrass coverage monitoring' }
    ]
  },
  {
    id: 'NCCR-2024-003',
    title: 'Coastal Wetland Protection - Chilika',
    panchayat: 'Balugaon Gram Panchayat',
    ngo: 'Odisha Wetland Initiative',
    hectares: 67.5,
    stage: 'Carbon Credit Assessment',
    status: 'Verified',
    ecosystemType: 'Salt Marsh',
    state: 'Odisha',
    coordinates: { lat: 19.7018, lng: 85.4775 },
    progress: 100,
    startDate: '2023-12-01',
    lastUpdate: '2024-01-30',
    description: 'Comprehensive wetland restoration at Chilika Lake',
    images: [
      { id: 'sat3', type: 'satellite', date: '2024-01-30', description: 'Final assessment satellite imagery' },
      { id: 'ground1', type: 'ground', date: '2024-01-28', description: 'Ground verification photos' }
    ]
  },
  {
    id: 'NCCR-2024-004',
    title: 'Coral Reef Restoration - Gulf of Kachchh',
    panchayat: 'Okha Gram Panchayat',
    ngo: 'Gujarat Marine Trust',
    hectares: 12.3,
    stage: 'Initial Review',
    status: 'Pending',
    ecosystemType: 'Coral Reef',
    state: 'Gujarat',
    coordinates: { lat: 22.4707, lng: 69.0784 },
    progress: 25,
    startDate: '2024-01-20',
    lastUpdate: '2024-01-26',
    description: 'Coral reef rehabilitation in Gulf of Kachchh',
    images: [
      { id: 'sat4', type: 'satellite', date: '2024-01-26', description: 'Initial site assessment' }
    ]
  },
  {
    id: 'NCCR-2024-005',
    title: 'Backwater Plantation - Vembanad',
    panchayat: 'Kummakom Gram Panchayat',
    ngo: 'Kerala Backwater Foundation',
    hectares: 89.1,
    stage: 'Monitoring',
    status: 'Completed',
    ecosystemType: 'Estuary',
    state: 'Kerala',
    coordinates: { lat: 9.5916, lng: 76.4130 },
    progress: 95,
    startDate: '2023-11-15',
    lastUpdate: '2024-01-25',
    description: 'Backwater ecosystem restoration in Vembanad Lake',
    images: [
      { id: 'sat5', type: 'satellite', date: '2024-01-25', description: 'Monitoring phase satellite view' },
      { id: 'drone2', type: 'drone', date: '2024-01-20', description: 'Ecosystem recovery documentation' }
    ]
  }
];

const statusConfig = {
  'Pending': { color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  'Ongoing': { color: 'bg-blue-500', textColor: 'text-blue-700' },
  'Completed': { color: 'bg-green-500', textColor: 'text-green-700' },
  'Verified': { color: 'bg-cyan-500', textColor: 'text-cyan-700' }
};

const ecosystemConfig = {
  'Mangrove': { color: 'bg-emerald-100 text-emerald-800' },
  'Seagrass': { color: 'bg-teal-100 text-teal-800' },
  'Salt Marsh': { color: 'bg-cyan-100 text-cyan-800' },
  'Coral Reef': { color: 'bg-rose-100 text-rose-800' },
  'Estuary': { color: 'bg-indigo-100 text-indigo-800' }
};

export function GISMapConsole() {
  const [selectedProject, setSelectedProject] = useState<MapProject | null>(mockMapProjects[0]);
  const [hoveredProject, setHoveredProject] = useState<MapProject | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'map' | 'terrain'>('satellite');
  const [ecosystemFilter, setEcosystemFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = mockMapProjects.filter(project => {
    const matchesEcosystem = ecosystemFilter === 'all' || project.ecosystemType === ecosystemFilter;
    const matchesState = stateFilter === 'all' || project.state === stateFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesEcosystem && matchesState && matchesStatus;
  });

  const uniqueStates = [...new Set(mockMapProjects.map(p => p.state))];
  const uniqueEcosystems = [...new Set(mockMapProjects.map(p => p.ecosystemType))];

  const handleProjectClick = (project: MapProject) => {
    setSelectedProject(project);
    setHoveredProject(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>GIS & Map Console</h1>
          <p className="text-muted-foreground mt-1">
            Interactive map view of all blue carbon projects
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Map View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              size="sm"
              variant={mapView === 'satellite' ? 'default' : 'ghost'}
              onClick={() => setMapView('satellite')}
              className="h-8"
            >
              <Satellite className="w-4 h-4 mr-1" />
              Satellite
            </Button>
            <Button
              size="sm"
              variant={mapView === 'map' ? 'default' : 'ghost'}
              onClick={() => setMapView('map')}
              className="h-8"
            >
              <Map className="w-4 h-4 mr-1" />
              Map
            </Button>
            <Button
              size="sm"
              variant={mapView === 'terrain' ? 'default' : 'ghost'}
              onClick={() => setMapView('terrain')}
              className="h-8"
            >
              <Mountain className="w-4 h-4 mr-1" />
              Terrain
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={ecosystemFilter} onValueChange={setEcosystemFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Ecosystems" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ecosystems</SelectItem>
                {uniqueEcosystems.map(ecosystem => (
                  <SelectItem key={ecosystem} value={ecosystem}>{ecosystem}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {uniqueStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-end">
              <span className="text-sm text-muted-foreground">
                {filteredProjects.length} projects shown
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              {/* Mock Map Interface */}
              <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50">
                  {/* India coastline representation */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                    <path
                      d="M200 100 Q300 80 400 120 Q500 140 600 180 Q650 250 620 350 Q600 450 550 500 Q450 550 350 530 Q250 500 200 400 Q150 300 180 200 Q190 150 200 100"
                      fill="rgba(34, 197, 94, 0.1)"
                      stroke="rgba(34, 197, 94, 0.3)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Project Pins */}
                  {filteredProjects.map((project, index) => {
                    const x = 150 + (index * 120) + (Math.random() * 100);
                    const y = 150 + (index * 80) + (Math.random() * 100);
                    
                    return (
                      <div
                        key={project.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}px`, top: `${y}px` }}
                        onClick={() => handleProjectClick(project)}
                        onMouseEnter={() => setHoveredProject(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        {/* Pin */}
                        <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${statusConfig[project.status].color} flex items-center justify-center`}>
                          <MapPin className="w-3 h-3 text-white" />
                        </div>
                        
                        {/* Hover Popup */}
                        {hoveredProject?.id === project.id && (
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border min-w-64 z-10">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">{project.title}</h4>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <p><Users className="w-3 h-3 inline mr-1" />{project.panchayat}</p>
                                <p><Leaf className="w-3 h-3 inline mr-1" />{project.hectares} hectares</p>
                                <p><BarChart3 className="w-3 h-3 inline mr-1" />{project.stage}</p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${statusConfig[project.status].textColor}`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 space-y-2">
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0">+</Button>
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0">-</Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 space-y-2">
                  <h4 className="font-medium text-sm">Project Status</h4>
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <div key={status} className="flex items-center space-x-2 text-xs">
                      <div className={`w-3 h-3 rounded-full ${config.color}`} />
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Details Sidebar */}
        <div className="space-y-6">
          {selectedProject && (
            <>
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedProject.id}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProject.panchayat}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProject.ngo}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProject.state}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="font-medium">{selectedProject.hectares} hectares</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ecosystem:</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${ecosystemConfig[selectedProject.ecosystemType]}`}
                      >
                        {selectedProject.ecosystemType}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} />
                    <p className="text-xs text-muted-foreground">
                      Current Stage: {selectedProject.stage}
                    </p>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-2">Description:</p>
                    <p>{selectedProject.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Started: {new Date(selectedProject.startDate).toLocaleDateString('en-IN')}</span>
                    <span>Updated: {new Date(selectedProject.lastUpdate).toLocaleDateString('en-IN')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Latest Satellite Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedProject.images.map((image) => (
                    <div key={image.id} className="border rounded-lg p-3 space-y-2">
                      <div className="aspect-video bg-muted rounded flex items-center justify-center">
                        <Satellite className="w-8 h-8 text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs capitalize">
                            {image.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(image.date).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {image.description}
                        </p>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Image
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View All Images
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
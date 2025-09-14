import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User } from '../App';

interface AvailableProjectsProps {
  user: User;
  onBack: () => void;
}

export function AvailableProjects({ user, onBack }: AvailableProjectsProps) {
  // Mock data for available projects seeking NGO partners
  const availableProjects = [
    {
      id: 'proj-av-001',
      title: 'Sundarbans Mangrove Restoration',
      location: 'Sundarbans, West Bengal',
      area: '15 hectares',
      ecosystem: 'Mangrove Forest',
      status: 'Seeking NGO Partner',
      panchayat: 'Coastal Village Panchayat',
      contactPerson: 'Shri Rajesh Kumar',
      urgency: 'high',
      timeline: '6 months',
      budget: '₹12,50,000',
      workersNeeded: 25,
      expertise: ['Mangrove Planting', 'Soil Restoration', 'Community Training'],
      description: 'Large-scale mangrove restoration project to combat coastal erosion and enhance biodiversity',
      startDate: 'March 2024',
      carbonPotential: '450 tons CO2/year',
      biodiversityImpact: 'High - Critical habitat for Royal Bengal Tigers',
      distance: '2.5 km'
    },
    {
      id: 'proj-av-002',
      title: 'Chilika Salt Marsh Conservation',
      location: 'Chilika Lake, Odisha',
      area: '8 hectares',
      ecosystem: 'Salt Marsh',
      status: 'Planning Phase - NGO Partner Needed',
      panchayat: 'Lake Shore Panchayat',
      contactPerson: 'Mrs. Priya Dash',
      urgency: 'medium',
      timeline: '4 months',
      budget: '₹8,75,000',
      workersNeeded: 18,
      expertise: ['Salt-tolerant Vegetation', 'Water Quality Management', 'Bird Habitat Creation'],
      description: 'Restore critical salt marsh ecosystem to support migratory birds and coastal protection',
      startDate: 'April 2024',
      carbonPotential: '280 tons CO2/year',
      biodiversityImpact: 'Medium - Important bird migration stopover',
      distance: '5.2 km'
    },
    {
      id: 'proj-av-003',
      title: 'Kerala Backwaters Seagrass Revival',
      location: 'Vembanad Lake, Kerala',
      area: '12 hectares',
      ecosystem: 'Seagrass Meadows',
      status: 'Ready to Start - Partner Required',
      panchayat: 'Backwater Conservation Panchayat',
      contactPerson: 'Dr. Suresh Nair',
      urgency: 'high',
      timeline: '8 months',
      budget: '₹15,20,000',
      workersNeeded: 22,
      expertise: ['Seagrass Propagation', 'Marine Ecosystem', 'Fisherman Community Training'],
      description: 'Restore seagrass meadows to enhance fish nursery areas and carbon sequestration',
      startDate: 'February 2024',
      carbonPotential: '380 tons CO2/year',
      biodiversityImpact: 'High - Critical fish breeding grounds',
      distance: '8.7 km'
    },
    {
      id: 'proj-av-004',
      title: 'Andaman Coral-Mangrove Integration',
      location: 'Havelock Island, Andaman',
      area: '6 hectares',
      ecosystem: 'Mangrove-Coral Interface',
      status: 'Seeking Technical Expertise',
      panchayat: 'Island Development Panchayat',
      contactPerson: 'Shri Arjun Singh',
      urgency: 'medium',
      timeline: '10 months',
      budget: '₹18,50,000',
      workersNeeded: 15,
      expertise: ['Marine Biology', 'Coral Restoration', 'Island Ecosystem Management'],
      description: 'Unique project integrating coral reef protection with mangrove restoration',
      startDate: 'May 2024',
      carbonPotential: '320 tons CO2/year',
      biodiversityImpact: 'Very High - Coral reef and mangrove biodiversity',
      distance: '12.1 km'
    },
    {
      id: 'proj-av-005',
      title: 'Gujarat Coastal Dune Stabilization',
      location: 'Kutch District, Gujarat',
      area: '25 hectares',
      ecosystem: 'Coastal Dunes',
      status: 'Urgent - Partner Needed',
      panchayat: 'Desert-Coast Interface Panchayat',
      contactPerson: 'Mrs. Kavita Patel',
      urgency: 'high',
      timeline: '12 months',
      budget: '₹22,75,000',
      workersNeeded: 35,
      expertise: ['Dune Vegetation', 'Erosion Control', 'Arid Coastal Restoration'],
      description: 'Large-scale coastal dune stabilization using native vegetation to prevent erosion',
      startDate: 'January 2024',
      carbonPotential: '520 tons CO2/year',
      biodiversityImpact: 'Medium - Desert-coastal transition species',
      distance: '15.3 km'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-teal-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Button 
            onClick={onBack}
            className="p-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl text-teal-800">Available Projects</h1>
            <p className="text-sm text-teal-600">Partner opportunities near you</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-100 text-red-700 text-xs animate-pulse">
              🔥 {availableProjects.filter(p => p.urgency === 'high').length} Urgent
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 p-4 text-center">
            <div className="text-2xl text-emerald-600 mb-1">{availableProjects.length}</div>
            <div className="text-xs text-emerald-700">Total Projects</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-red-200 p-4 text-center">
            <div className="text-2xl text-red-600 mb-1">{availableProjects.filter(p => p.urgency === 'high').length}</div>
            <div className="text-xs text-red-700">Urgent</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4 text-center">
            <div className="text-2xl text-teal-600 mb-1">20km</div>
            <div className="text-xs text-teal-700">Search Radius</div>
          </Card>
        </div>

        {/* Filter/Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-xs border-teal-300">
              🌊 All Ecosystems
            </Button>
            <Button size="sm" variant="outline" className="text-xs border-red-300">
              🔥 Urgent Only
            </Button>
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            📍 Sort by Distance
          </Button>
        </div>

        {/* Available Projects List */}
        <div className="space-y-4">
          {availableProjects.map((project) => (
            <Card
              key={project.id}
              className={`bg-white/70 backdrop-blur-sm border-teal-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                project.urgency === 'high' ? 'ring-1 ring-red-200 bg-red-50/20' : ''
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg text-teal-800">{project.title}</h3>
                      <Badge
                        className={`text-xs ${
                          project.urgency === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {project.urgency === 'high' ? '🔥 Urgent' : '⏳ Medium'}
                      </Badge>
                    </div>
                    <p className="text-sm text-teal-600 mb-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>📍</span>
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>📐</span>
                      <span>{project.area} • {project.ecosystem}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>⏱️</span>
                      <span>{project.timeline} • Start: {project.startDate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>💰</span>
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>👥</span>
                      <span>{project.workersNeeded} workers needed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-teal-700">
                      <span>🌿</span>
                      <span>{project.carbonPotential}</span>
                    </div>
                  </div>
                </div>

                {/* Expertise Required */}
                <div className="mb-4">
                  <h4 className="text-sm text-teal-800 mb-2">Expertise Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Panchayat Contact & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-teal-100">
                  <div className="flex-1">
                    <p className="text-sm text-teal-800">📋 {project.panchayat}</p>
                    <p className="text-xs text-teal-600">Contact: {project.contactPerson}</p>
                    <p className="text-xs text-teal-500">📍 {project.distance} away</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs border-teal-300 text-teal-700 hover:bg-teal-50">
                      📄 Details
                    </Button>
                    <Button 
                      size="sm" 
                      className={`text-xs text-white ${
                        project.urgency === 'high' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                      }`}
                    >
                      🤝 Express Interest
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More / Pagination */}
        <div className="text-center mt-8 pb-8">
          <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User } from '../App';

interface GuidesTrainingProps {
  user: User;
  onBack: () => void;
}

interface TrainingItem {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'audio' | 'quiz';
  duration: string;
  language: string[];
  ecosystem: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  description: string;
}

const trainingContent: TrainingItem[] = [
  {
    id: 'vid-001',
    title: 'Mangrove Planting Technique',
    type: 'video',
    duration: '5 min',
    language: ['English', 'Bengali', 'Hindi'],
    ecosystem: 'mangrove',
    difficulty: 'beginner',
    completed: true,
    description: 'Step-by-step guide for proper mangrove seedling plantation'
  },
  {
    id: 'pdf-001', 
    title: 'Species Selection Guide',
    type: 'pdf',
    duration: '15 min read',
    language: ['English', 'Odia'],
    ecosystem: 'mangrove',
    difficulty: 'intermediate',
    completed: false,
    description: 'Comprehensive guide for selecting appropriate mangrove species'
  },
  {
    id: 'aud-001',
    title: 'Salt Marsh Care Instructions',
    type: 'audio',
    duration: '8 min',
    language: ['Tamil', 'Malayalam'],
    ecosystem: 'salt-marsh',
    difficulty: 'beginner',
    completed: false,
    description: 'Audio guide for salt marsh maintenance and care'
  },
  {
    id: 'quiz-001',
    title: 'Coastal Restoration Basics',
    type: 'quiz',
    duration: '10 min',
    language: ['English', 'Hindi', 'Bengali'],
    ecosystem: 'general',
    difficulty: 'beginner',
    completed: false,
    description: 'Test your knowledge of coastal restoration fundamentals'
  },
  {
    id: 'vid-002',
    title: 'Quality Monitoring Checklist',
    type: 'video',
    duration: '7 min', 
    language: ['English', 'Gujarati'],
    ecosystem: 'general',
    difficulty: 'intermediate',
    completed: false,
    description: 'How to monitor and assess restoration project quality'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return '🎥';
    case 'pdf': return '📄';
    case 'audio': return '🎧';
    case 'quiz': return '🎯';
    default: return '📚';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-emerald-100 text-emerald-700';
    case 'intermediate': return 'bg-amber-100 text-amber-700';
    case 'advanced': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function GuidesTraining({ user, onBack }: GuidesTrainingProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedEcosystem, setSelectedEcosystem] = useState('all');
  
  const completedCount = trainingContent.filter(item => item.completed).length;
  const progressPercentage = (completedCount / trainingContent.length) * 100;

  const filteredContent = trainingContent.filter(item => {
    const languageMatch = item.language.includes(selectedLanguage);
    const ecosystemMatch = selectedEcosystem === 'all' || item.ecosystem === selectedEcosystem || item.ecosystem === 'general';
    return languageMatch && ecosystemMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800">Guides & Training</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white mb-6">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <div className="text-2xl">🎓</div>
              </div>
              <div>
                <h2 className="text-xl">Your Learning Progress</h2>
                <p className="text-white/80 text-sm">Master coastal restoration techniques</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Modules</span>
                <span>{completedCount}/{trainingContent.length}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <p className="text-2xl">{completedCount}</p>
                <p className="text-white/80 text-xs">Completed</p>
              </div>
              <div>
                <p className="text-2xl">{trainingContent.length - completedCount}</p>
                <p className="text-white/80 text-xs">Remaining</p>
              </div>
              <div>
                <p className="text-2xl">2</p>
                <p className="text-white/80 text-xs">Badges Earned</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
            <label className="text-cyan-800 text-sm mb-2 block">Language</label>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Odia">Odia</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4">
            <label className="text-cyan-800 text-sm mb-2 block">Ecosystem</label>
            <select 
              value={selectedEcosystem}
              onChange={(e) => setSelectedEcosystem(e.target.value)}
              className="w-full p-2 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800"
            >
              <option value="all">All Ecosystems</option>
              <option value="mangrove">Mangrove</option>
              <option value="seagrass">Seagrass</option>
              <option value="salt-marsh">Salt Marsh</option>
            </select>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="content">Training Content</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="request">Request Training</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            {/* Training Content List */}
            {filteredContent.map((item) => (
              <Card key={item.id} className={`bg-white/70 backdrop-blur-sm border-cyan-200 ${
                item.completed ? 'ring-2 ring-emerald-200' : ''
              }`}>
                <div className="p-5">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                      item.completed 
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                        : 'bg-cyan-100 text-cyan-600'
                    }`}>
                      {item.completed ? '✓' : getTypeIcon(item.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-cyan-800">{item.title}</h3>
                        {item.completed && (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">✓ Completed</Badge>
                        )}
                      </div>
                      
                      <p className="text-cyan-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs mb-3">
                        <span className="text-cyan-600">⏱️ {item.duration}</span>
                        <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </Badge>
                        <span className="text-cyan-600">🌍 {item.language.join(', ')}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className={
                            item.completed 
                              ? 'bg-emerald-500 hover:bg-emerald-600'
                              : 'bg-gradient-to-r from-cyan-500 to-teal-500'
                          }
                        >
                          {item.completed ? '🔄 Review' : '▶️ Start'}
                        </Button>
                        {item.type === 'pdf' && (
                          <Button size="sm" variant="outline" className="border-cyan-200">
                            📥 Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {/* Badges and Achievements */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200 p-6 text-center">
                <div className="text-4xl mb-2">🥉</div>
                <h3 className="text-amber-800">Coastal Beginner</h3>
                <p className="text-amber-600 text-sm">Completed basic training modules</p>
                <Badge className="bg-amber-100 text-amber-700 text-xs mt-2">Earned</Badge>
              </Card>
              
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 p-6 text-center">
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="text-emerald-800">Mangrove Expert</h3>
                <p className="text-emerald-600 text-sm">Mastered mangrove restoration</p>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs mt-2">Earned</Badge>
              </Card>
              
              <Card className="bg-gray-50 border-gray-200 p-6 text-center opacity-60">
                <div className="text-4xl mb-2">🥈</div>
                <h3 className="text-gray-800">Restoration Pro</h3>
                <p className="text-gray-600 text-sm">Complete 10 training modules</p>
                <Badge className="bg-gray-100 text-gray-700 text-xs mt-2">Locked</Badge>
              </Card>
              
              <Card className="bg-gray-50 border-gray-200 p-6 text-center opacity-60">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-gray-800">Carbon Champion</h3>
                <p className="text-gray-600 text-sm">Lead a successful project</p>
                <Badge className="bg-gray-100 text-gray-700 text-xs mt-2">Locked</Badge>
              </Card>
            </div>

            {/* Knowledge Quiz Results */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-200">
              <div className="p-6">
                <h3 className="text-lg text-cyan-800 mb-4">Quiz Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="text-emerald-800 text-sm">Coastal Restoration Basics</p>
                      <p className="text-emerald-600 text-xs">Completed 2 days ago</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-800">8/10</p>
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">Passed</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-800 text-sm">Species Identification</p>
                      <p className="text-gray-600 text-xs">Not attempted</p>
                    </div>
                    <div className="text-right">
                      <Button size="sm" variant="outline">Start Quiz</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="request" className="space-y-4">
            {/* Training Request Form */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-200">
              <div className="p-6">
                <h3 className="text-lg text-cyan-800 mb-4">Request Training Session</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-cyan-800 text-sm mb-2 block">Training Topic</label>
                    <select className="w-full p-3 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800">
                      <option>Advanced Mangrove Techniques</option>
                      <option>Seagrass Restoration Methods</option>
                      <option>Salt Marsh Conservation</option>
                      <option>Quality Monitoring Systems</option>
                      <option>Community Engagement Strategies</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-cyan-800 text-sm mb-2 block">Preferred Date</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800"
                    />
                  </div>
                  
                  <div>
                    <label className="text-cyan-800 text-sm mb-2 block">Number of Participants</label>
                    <input 
                      type="number" 
                      placeholder="Expected participants"
                      className="w-full p-3 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800"
                    />
                  </div>
                  
                  <div>
                    <label className="text-cyan-800 text-sm mb-2 block">Special Requirements</label>
                    <textarea 
                      placeholder="Any specific requirements or focus areas..."
                      rows={3}
                      className="w-full p-3 border border-cyan-200 rounded-lg bg-white/80 text-cyan-800"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500">
                    📋 Submit Training Request
                  </Button>
                </div>
              </div>
            </Card>

            {/* Previous Requests */}
            <Card className="bg-white/70 backdrop-blur-sm border-cyan-200">
              <div className="p-6">
                <h3 className="text-lg text-cyan-800 mb-4">Previous Requests</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="text-emerald-800 text-sm">Mangrove Planting Workshop</p>
                      <p className="text-emerald-600 text-xs">Requested: Jan 15, 2024</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">✅ Completed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="text-amber-800 text-sm">Quality Monitoring Training</p>
                      <p className="text-amber-600 text-xs">Requested: Feb 1, 2024</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 text-xs">⏳ Scheduled</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
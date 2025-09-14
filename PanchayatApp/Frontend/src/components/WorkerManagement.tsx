import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Project } from '../App';

interface WorkerManagementProps {
  user: User;
  project: Project;
  onBack: () => void;
}

interface Worker {
  id: string;
  name: string;
  aadhaar: string;
  bankUPI: string;
  mobile: string;
  assignedTasks: string[];
  earnedCredits: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    aadhaar: '****-5678',
    bankUPI: 'ravi.kumar@paytm',
    mobile: '+91 98765 43210',
    assignedTasks: ['Mangrove Planting', 'Site Preparation'],
    earnedCredits: 0.25,
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: '2', 
    name: 'Sunita Devi',
    aadhaar: '****-9876',
    bankUPI: '9876543210@upi',
    mobile: '+91 87654 32109',
    assignedTasks: ['Quality Monitoring', 'Data Collection'],
    earnedCredits: 0.35,
    status: 'active',
    joinDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Mohan Pal',
    aadhaar: '****-1234',
    bankUPI: 'mohan.pal@gpay',
    mobile: '+91 76543 21098',
    assignedTasks: ['Maintenance', 'Photography'],
    earnedCredits: 0.15,
    status: 'inactive',
    joinDate: '2024-02-01'
  }
];

export function WorkerManagement({ user, project, onBack }: WorkerManagementProps) {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddWorker, setShowAddWorker] = useState(false);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.mobile.includes(searchTerm)
  );

  const totalCredits = workers.reduce((sum, worker) => sum + worker.earnedCredits, 0);
  const activeWorkers = workers.filter(w => w.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800">{project.title} - Workers</h1>
          <Button
            onClick={() => setShowAddWorker(true)}
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-teal-500"
          >
            ➕ Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 p-4 text-center">
            <div className="text-2xl text-emerald-600 mb-1">{workers.length}</div>
            <div className="text-xs text-emerald-700">Total Workers</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-4 text-center">
            <div className="text-2xl text-cyan-600 mb-1">{activeWorkers}</div>
            <div className="text-xs text-cyan-700">Active Workers</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 p-4 text-center">
            <div className="text-2xl text-teal-600 mb-1">{totalCredits.toFixed(2)}</div>
            <div className="text-xs text-teal-700">Credits Earned</div>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search workers by name or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/60 backdrop-blur-sm border-cyan-200"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="workers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="workers" className="space-y-4">
            {/* Worker List */}
            <div className="space-y-3">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="bg-white/60 backdrop-blur-sm border-cyan-200">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                          <div className="text-white text-lg">👤</div>
                        </div>
                        <div>
                          <h3 className="text-cyan-800">{worker.name}</h3>
                          <p className="text-cyan-600 text-sm">{worker.mobile}</p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${
                          worker.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {worker.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-cyan-600">Aadhaar:</span>
                        <p className="text-cyan-800">{worker.aadhaar}</p>
                      </div>
                      <div>
                        <span className="text-cyan-600">Bank/UPI:</span>
                        <p className="text-cyan-800">{worker.bankUPI}</p>
                      </div>
                      <div>
                        <span className="text-cyan-600">Credits Earned:</span>
                        <p className="text-cyan-800">{worker.earnedCredits} tCO2e</p>
                      </div>
                      <div>
                        <span className="text-cyan-600">Join Date:</span>
                        <p className="text-cyan-800">{new Date(worker.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Assigned Tasks */}
                    <div className="mb-3">
                      <span className="text-cyan-600 text-sm">Assigned Tasks:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {worker.assignedTasks.map((task, index) => (
                          <Badge key={index} variant="secondary" className="bg-cyan-100 text-cyan-700 text-xs">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Tasks
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Payment History
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {/* Payment Overview */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Payment Overview</h3>
              <div className="space-y-4">
                {workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                    <div>
                      <p className="text-cyan-800 text-sm">{worker.name}</p>
                      <p className="text-cyan-600 text-xs">{worker.earnedCredits} tCO2e earned</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-800 text-sm">₹{(worker.earnedCredits * 1200).toFixed(0)}</p>
                      <p className="text-cyan-600 text-xs">Expected value</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-200">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-800">Total Expected Payout:</span>
                  <span className="text-cyan-800">₹{(totalCredits * 1200).toFixed(0)}</span>
                </div>
                <p className="text-cyan-600 text-xs mt-1">
                  *Based on current carbon credit market rate of ₹1,200/tCO2e
                </p>
              </div>
            </Card>

            {/* Mock Health Service Integration */}
            <Card className="bg-emerald-50 border-emerald-200 p-6">
              <h3 className="text-emerald-800 mb-4">Health Service Credits</h3>
              <p className="text-emerald-700 text-sm mb-4">
                Workers can redeem earned credits for health services through our partner clinics.
              </p>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                🏥 View Health Partners
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            {/* Bulk Upload */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Bulk Worker Upload</h3>
              <p className="text-cyan-600 text-sm mb-4">
                Upload multiple workers using CSV file format. Download the template to get started.
              </p>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full border-cyan-200">
                  📥 Download CSV Template
                </Button>
                
                <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center">
                  <div className="text-cyan-400 text-2xl mb-2">📄</div>
                  <p className="text-cyan-600 text-sm">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                </div>
              </div>
            </Card>

            {/* Bulk Actions */}
            <Card className="bg-white/60 backdrop-blur-sm border-cyan-200 p-6">
              <h3 className="text-lg text-cyan-800 mb-4">Bulk Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-cyan-200">
                  📧 Send SMS to All
                </Button>
                <Button variant="outline" className="border-emerald-200">
                  💳 Process Payments
                </Button>
                <Button variant="outline" className="border-amber-200">
                  📊 Export Report
                </Button>
                <Button variant="outline" className="border-purple-200">
                  🎓 Schedule Training
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Worker Modal (simplified) */}
      {showAddWorker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <Card className="bg-white w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-cyan-800">Add New Worker</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddWorker(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Mobile Number" />
                <Input placeholder="Aadhaar Number (Optional)" />
                <Input placeholder="Bank/UPI ID" />
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddWorker(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500">
                    Add Worker
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
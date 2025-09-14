import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User } from '../App';

interface CertificatesCreditsProps {
  user: User;
  onBack: () => void;
}

const mockCredits = [
  {
    id: 'CC-2024-001',
    projectTitle: 'Coastal Mangrove Restoration',
    creditsIssued: 2.5,
    vintage: 2024,
    issueDate: '2024-01-25',
    certificateId: 'NCCR-MNG-001-2024',
    transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
    status: 'issued',
    marketValue: 1200 // INR per tCO2e
  },
  {
    id: 'CC-2024-002', 
    projectTitle: 'Salt Marsh Conservation',
    creditsIssued: 1.8,
    vintage: 2024,
    issueDate: '2024-02-10',
    certificateId: 'NCCR-SAL-002-2024',
    transactionHash: '0x9876543210fedcba0987654321',
    status: 'pending-verification',
    marketValue: 1200
  }
];

const revenueBreakdown = {
  total: 5160, // Total revenue in INR
  panchayat: 70, // 70% to Panchayat
  workers: 25,   // 25% to Workers  
  nccr: 5        // 5% to NCCR
};

export function CertificatesCredits({ user, onBack }: CertificatesCreditsProps) {
  const totalCredits = mockCredits.reduce((sum, credit) => sum + credit.creditsIssued, 0);
  const totalValue = totalCredits * mockCredits[0].marketValue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <h1 className="text-lg text-cyan-800">Certificates & Credits</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <div className="text-2xl">🏆</div>
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Credits Earned</p>
                <p className="text-2xl">{totalCredits} tCO2e</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <div className="text-2xl">💰</div>
              </div>
              <div>
                <p className="text-white/80 text-sm">Market Value</p>
                <p className="text-2xl">₹{totalValue.toFixed(0)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Credits List */}
        <div className="space-y-4">
          <h2 className="text-lg text-cyan-800">Issued Carbon Credits</h2>
          
          {mockCredits.map((credit) => (
            <Card key={credit.id} className="bg-white/70 backdrop-blur-sm border-cyan-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-cyan-800">{credit.projectTitle}</h3>
                    <p className="text-cyan-600 text-sm">Certificate ID: {credit.certificateId}</p>
                  </div>
                  <Badge className={`text-xs ${
                    credit.status === 'issued' 
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {credit.status === 'issued' ? '✅ ISSUED' : '⏳ PENDING'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-cyan-600">Credits Issued:</span>
                    <p className="text-cyan-800">{credit.creditsIssued} tCO2e</p>
                  </div>
                  <div>
                    <span className="text-cyan-600">Vintage Year:</span>
                    <p className="text-cyan-800">{credit.vintage}</p>
                  </div>
                  <div>
                    <span className="text-cyan-600">Issue Date:</span>
                    <p className="text-cyan-800">{new Date(credit.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-cyan-600">Market Value:</span>
                    <p className="text-cyan-800">₹{(credit.creditsIssued * credit.marketValue).toFixed(0)}</p>
                  </div>
                </div>

                {/* Blockchain Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-blue-600">🔗</div>
                    <h4 className="text-blue-800">Blockchain Record</h4>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Transaction Hash:</span>
                      <span className="text-blue-800 font-mono">{credit.transactionHash.slice(0, 10)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Status:</span>
                      <span className="text-blue-800">✅ Recorded on-chain</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2 text-xs border-blue-300">
                    🔍 View on Explorer
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500">
                    📄 Download Certificate
                  </Button>
                  <Button size="sm" variant="outline" className="border-cyan-200">
                    📋 Copy Transaction Hash
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Revenue Distribution */}
        <Card className="bg-white/70 backdrop-blur-sm border-cyan-200">
          <div className="p-6">
            <h3 className="text-lg text-cyan-800 mb-4">Revenue Distribution</h3>
            
            <div className="space-y-4">
              {/* Panchayat Share */}
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">🏛️</div>
                  </div>
                  <div>
                    <p className="text-emerald-800 text-sm">Panchayat Share ({revenueBreakdown.panchayat}%)</p>
                    <p className="text-emerald-600 text-xs">For community development</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-800">₹{((totalValue * revenueBreakdown.panchayat) / 100).toFixed(0)}</p>
                </div>
              </div>

              {/* Workers Share */}
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">👥</div>
                  </div>
                  <div>
                    <p className="text-cyan-800 text-sm">Workers Share ({revenueBreakdown.workers}%)</p>
                    <p className="text-cyan-600 text-xs">Direct payment to workers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-cyan-800">₹{((totalValue * revenueBreakdown.workers) / 100).toFixed(0)}</p>
                </div>
              </div>

              {/* NCCR Fee */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">⚖️</div>
                  </div>
                  <div>
                    <p className="text-blue-800 text-sm">NCCR Fee ({revenueBreakdown.nccr}%)</p>
                    <p className="text-blue-600 text-xs">Platform and verification costs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-800">₹{((totalValue * revenueBreakdown.nccr) / 100).toFixed(0)}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-cyan-200">
              <div className="flex justify-between items-center">
                <span className="text-cyan-800">Total Revenue:</span>
                <span className="text-cyan-800 text-lg">₹{totalValue.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Schedule */}
        <Card className="bg-white/70 backdrop-blur-sm border-cyan-200">
          <div className="p-6">
            <h3 className="text-lg text-cyan-800 mb-4">Payment Schedule</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="text-emerald-800 text-sm">Next Payment Due</p>
                  <p className="text-emerald-600 text-xs">Quarterly disbursement - March 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-800">₹3,612</p>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">Pending</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-800 text-sm">Last Payment</p>
                  <p className="text-gray-600 text-xs">December 2023 disbursement</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800">₹1,548</p>
                  <Badge className="bg-gray-100 text-gray-700 text-xs">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Health Service Integration */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">

        </Card>
      </div>
    </div>
  );
}
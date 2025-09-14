import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User } from '../App';

interface NotificationCenterProps {
  user: User;
  onBack: () => void;
  onClearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'status-update' | 'verification' | 'payment' | 'training' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'status-update',
    title: 'Project Approved',
    message: 'Your Coastal Mangrove Restoration project has been approved by NCCR. You can now begin restoration activities.',
    timestamp: '2024-01-20T11:00:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'verification',
    title: 'Expert Visit Scheduled',
    message: 'A field verification expert will visit your project site on January 25th between 10:00 AM - 2:00 PM.',
    timestamp: '2024-01-19T14:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Credits Payment Processed',
    message: 'Payment of ₹1,548 for carbon credits has been processed. Check your registered bank account.',
    timestamp: '2024-01-18T09:15:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'training',
    title: 'New Training Module Available',
    message: 'Advanced Mangrove Techniques training module is now available in Bengali and Hindi.',
    timestamp: '2024-01-17T16:20:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Progress Photos Due',
    message: 'Please upload progress photos for your Salt Marsh Conservation project. Due in 3 days.',
    timestamp: '2024-01-16T08:00:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: '6',
    type: 'status-update',
    title: 'Corrections Requested',
    message: 'NCCR has requested corrections for your project submission. Please check the detailed feedback.',
    timestamp: '2024-01-15T13:45:00Z',
    read: true,
    priority: 'high'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'status-update': return '📋';
    case 'verification': return '🔍';
    case 'payment': return '💰';
    case 'training': return '🎓';
    case 'reminder': return '⏰';
    default: return '🔔';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'status-update': return 'bg-blue-100 text-blue-700';
    case 'verification': return 'bg-purple-100 text-purple-700';
    case 'payment': return 'bg-emerald-100 text-emerald-700';
    case 'training': return 'bg-indigo-100 text-indigo-700';
    case 'reminder': return 'bg-amber-100 text-amber-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-amber-100 text-amber-700';
    case 'low': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function NotificationCenter({ user, onBack, onClearNotifications }: NotificationCenterProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const todayNotifications = mockNotifications.filter(n => {
    const notifDate = new Date(n.timestamp);
    const today = new Date();
    return notifDate.toDateString() === today.toDateString();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cyan-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-cyan-600">
            ← Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg text-cyan-800">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-700 text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearNotifications}
            className="text-cyan-600 text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-red-200 p-4 text-center">
            <div className="text-2xl text-red-600 mb-1">{unreadCount}</div>
            <div className="text-xs text-red-700">Unread</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 p-4 text-center">
            <div className="text-2xl text-blue-600 mb-1">{todayNotifications.length}</div>
            <div className="text-xs text-blue-700">Today</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 p-4 text-center">
            <div className="text-2xl text-emerald-600 mb-1">{mockNotifications.length}</div>
            <div className="text-xs text-emerald-700">Total</div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-white/70 backdrop-blur-sm border-cyan-200 transition-all duration-300 ${
                !notification.read ? 'ring-2 ring-cyan-300 shadow-lg' : ''
              }`}
            >
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  {/* Icon and Priority */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                      !notification.read 
                        ? 'bg-gradient-to-br from-cyan-400 to-teal-500 text-white'
                        : 'bg-cyan-100 text-cyan-600'
                    }`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    {notification.priority === 'high' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`text-sm ${!notification.read ? 'text-cyan-800' : 'text-cyan-700'}`}>
                        {notification.title}
                      </h3>
                      <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                        {notification.type.replace('-', ' ')}
                      </Badge>
                      {notification.priority === 'high' && (
                        <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                          High Priority
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-3 ${
                      !notification.read ? 'text-cyan-800' : 'text-cyan-600'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyan-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                      
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline" className="text-xs border-cyan-200">
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs border-cyan-200">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="w-3 h-3 bg-cyan-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Notification Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-cyan-200 mt-8">
          <div className="p-6">
            <h3 className="text-lg text-cyan-800 mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                <div>
                  <p className="text-cyan-800 text-sm">SMS Notifications</p>
                  <p className="text-cyan-600 text-xs">Receive updates via SMS</p>
                </div>
                <div className="w-12 h-6 bg-cyan-200 rounded-full relative">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                <div>
                  <p className="text-cyan-800 text-sm">Email Updates</p>
                  <p className="text-cyan-600 text-xs">Weekly summary emails</p>
                </div>
                <div className="w-12 h-6 bg-cyan-200 rounded-full relative">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-800 text-sm">Push Notifications</p>
                  <p className="text-gray-600 text-xs">Real-time app notifications</p>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="w-5 h-5 bg-gray-400 rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500">
              💾 Save Preferences
            </Button>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200 mt-6">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                <div className="text-white">🚨</div>
              </div>
              <h3 className="text-red-800">Emergency Support</h3>
            </div>
            
            <p className="text-red-700 text-sm mb-4">
              For urgent issues related to project verification, payments, or technical problems, 
              contact our emergency support team.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-red-300 hover:bg-red-100">
                📞 Call Support
              </Button>
              <Button variant="outline" className="border-red-300 hover:bg-red-100">
                💬 Live Chat
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
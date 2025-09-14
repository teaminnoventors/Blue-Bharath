import React from 'react';
import { User, Bell, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  notifications?: number;
  onLogout: () => void;
}

export function Navbar({ user, notifications = 0, onLogout }: NavbarProps) {
  return (
    <div className="h-16 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] border-b border-white/20 px-6 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </div>
        <div className="text-white">
          <h1 className="font-semibold">Blue Carbon Registry</h1>
          <p className="text-sm text-white/80">NCCR Admin Portal</p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white hover:bg-white/20 relative"
        >
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {notifications > 99 ? '99+' : notifications}
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-white/80">{user.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
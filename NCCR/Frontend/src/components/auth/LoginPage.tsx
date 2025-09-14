import React, { useState } from 'react';
import { Shield, User, Lock, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string; role: string; remember: boolean }) => void;
}

const roles = [
  { id: 'SuperAdmin', label: 'NCCR Super Admin', description: 'Full system access' },
  { id: 'Verifier', label: 'Verifier/Expert', description: 'Project verification and field visits' },
  { id: 'GIS Operator', label: 'GIS Operator', description: 'Mapping and drone data management' },
  { id: 'Finance Officer', label: 'Finance Officer', description: 'Certificates and revenue management' }
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    remember: false,
    enable2FA: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.role) {
      onLogin({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        remember: formData.remember
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f7fa] to-[#b2ebf2] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">
              Blue Carbon Registry
            </h1>
            <h2 className="text-2xl text-[#0891b2] mb-6">
              NCCR Admin Portal
            </h2>
            <p className="text-[#64748b] text-lg leading-relaxed max-w-md mx-auto">
              Secure access to project verification, certificate management, 
              and blue carbon credit issuance systems.
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1732721093836-637fb75ae237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3NzQ4MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Government building"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0891b2]/20 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border border-[#0891b2]/20 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-xl mx-auto mb-4 flex items-center justify-center lg:hidden">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#1e3a5f]">
                Secure Login
              </CardTitle>
              <p className="text-[#64748b]">
                Access the Blue Carbon Registry system
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-[#64748b]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@nccr.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 border-[#0891b2]/20 focus:border-[#0891b2]"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-[#64748b]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 border-[#0891b2]/20 focus:border-[#0891b2]"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role">Access Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({...formData, role: value})}
                    required
                  >
                    <SelectTrigger className="border-[#0891b2]/20 focus:border-[#0891b2]">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-sm text-[#64748b]">{role.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remember Me & 2FA */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => setFormData({...formData, remember: !!checked})}
                    />
                    <Label htmlFor="remember" className="text-sm text-[#64748b]">
                      Remember me for 30 days
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enable2fa"
                      checked={formData.enable2FA}
                      onCheckedChange={(checked) => setFormData({...formData, enable2FA: !!checked})}
                    />
                    <Label htmlFor="enable2fa" className="text-sm text-[#64748b]">
                      Enable Two-Factor Authentication
                    </Label>
                  </div>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0891b2] to-[#06b6d4] hover:from-[#0e7490] hover:to-[#0891b2] text-white py-3"
                  disabled={!formData.email || !formData.password || !formData.role}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Login
                </Button>
              </form>

              {/* Footer Links */}
              <div className="text-center space-y-2">
                <button className="text-sm text-[#0891b2] hover:underline">
                  Forgot Password?
                </button>
                <p className="text-xs text-[#64748b]">
                  Protected by government-grade security
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
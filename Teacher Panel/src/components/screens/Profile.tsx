import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Edit,
  Save,
  Camera,
} from 'lucide-react';
import { currentTeacher, todayClasses } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentTeacher.name,
    email: currentTeacher.email,
    phone: currentTeacher.phone,
    address: '123 Education Street, City',
    bio: 'Passionate mathematics teacher with 8+ years of experience in secondary education. Committed to making math engaging and accessible for all students.',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    specialization: 'Algebra, Geometry, Calculus',
    joinDate: 'August 15, 2016',
    employeeId: 'TCH-2016-0421',
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total Classes', value: '6', icon: BookOpen, color: 'text-[#2563EB]' },
    { label: 'Total Students', value: '180', icon: User, color: 'text-[#16A34A]' },
    { label: 'Experience', value: '8 Years', icon: Award, color: 'text-[#F59E0B]' },
    { label: 'Attendance Rate', value: '98%', icon: Clock, color: 'text-[#DC2626]' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={currentTeacher.avatar} alt={currentTeacher.name} />
                  <AvatarFallback className="text-2xl">
                    {currentTeacher.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#2563EB]"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
                  {formData.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentTeacher.role}</p>
                <Badge className="mt-2 bg-[#16A34A]">Active</Badge>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className={isEditing ? 'bg-[#16A34A]' : ''}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{formData.address}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label className="text-gray-600 dark:text-gray-400 mb-2">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Qualification
              </Label>
              {isEditing ? (
                <Input
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              ) : (
                <p className="font-medium text-gray-900 dark:text-white">{formData.qualification}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Specialization
              </Label>
              {isEditing ? (
                <Input
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              ) : (
                <p className="font-medium text-gray-900 dark:text-white">{formData.specialization}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Joining Date
              </Label>
              <p className="font-medium text-gray-900 dark:text-white">{formData.joinDate}</p>
            </div>

            <div>
              <Label className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee ID
              </Label>
              <p className="font-medium text-gray-900 dark:text-white">{formData.employeeId}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Current Classes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {todayClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{cls.className}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cls.subject}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Period {cls.period} • {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm Password" />
              </div>
              <Button className="mt-3 bg-[#2563EB]">Update Password</Button>
            </div>
            
            <Separator />

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notification Preferences</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications for new assignments</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">SMS alerts for parent messages</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Weekly summary reports</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

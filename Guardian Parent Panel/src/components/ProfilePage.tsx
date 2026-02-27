import { X, User, Mail, Phone, MapPin, Calendar, Shield, LogOut, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { guardian, mockChildren } from '../data/mockData'; // ensure guardian data exists

interface ProfilePageProps {
    onClose: () => void;
}

export default function GuardianProfilePage({ onClose }: ProfilePageProps) {
    return (

        <div className="w-full max-w-4xl min-h-screen mx-auto rounded-lg shadow-2xl dark:bg-gray-800">
            {/* Header */}
            <div className="relative p-6 rounded-t-lg bg-gradient-to-br from-blue-500 to-purple-600">

                <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center flex-shrink-0 w-24 h-24 bg-white rounded-full dark:bg-gray-700">
                        <User className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="text-white">
                        <h2 className="mb-2 text-3xl font-bold">{guardian.name}</h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-white bg-transparent border-0">
                                Guardian of: {mockChildren.map(c => c.name).join(', ')}
                            </Badge>
                            <Badge variant="secondary" className="text-white bg-transparent border-0">
                                Role: {guardian.role}
                            </Badge>
                            <Badge variant="secondary" className="text-white bg-transparent border-0">
                                ID: {guardian.id}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Edit Profile Button */}
                <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>

                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{guardian.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:col-start-2 md:row-start-1">
                                <Mail className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{guardian.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{guardian.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 md:col-start-2 md:row-start-2">
                                <Phone className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{guardian.phone}</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Linked Children */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Linked Children
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="space-y-4">
                                {mockChildren.map(child => (
                                    <div key={child.id} className="flex items-start gap-3 p-2 border rounded-md dark:border-neutral-700">
                                        <img src={child.photo} alt={child.name} className="object-cover w-12 h-12 rounded-full" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{child.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{child.class}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">Roll No: {child.rollNumber}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-3">
                            <Button variant="outline" className="flex items-center justify-start w-full gap-2">
                                <Shield className="w-4 h-4 mr-2" />
                                Change Password
                            </Button>
                            <Button variant="outline" className="flex items-center justify-start w-full gap-2">
                                <Shield className="w-4 h-4 mr-2" />
                                Privacy Settings
                            </Button>
                            <Button variant="destructive" className="flex items-center justify-start w-full gap-2">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
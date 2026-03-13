import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Bell,
  CheckCheck,
  Calendar,
  UserCheck,
  MessageSquare,
  FileText,
  AlertCircle,
  Clock,
  Filter,
  Search,
} from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../ui/utils';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  type: 'assignment' | 'message' | 'meeting' | 'exam' | 'leave' | 'alert' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionLink?: string;
  category: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New assignment submission',
    description: 'Emma Wilson submitted "Algebra Homework #5" for Class 7B',
    timestamp: '5 minutes ago',
    isRead: false,
    priority: 'high',
    actionLink: 'homework',
    category: 'Academic',
  },
  {
    id: '2',
    type: 'message',
    title: 'Parent message received',
    description: 'Maria Martinez sent you a message about John\'s progress in Mathematics',
    timestamp: '1 hour ago',
    isRead: false,
    priority: 'high',
    actionLink: 'communication',
    category: 'Communication',
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Faculty meeting reminder',
    description: 'Scheduled for tomorrow at 3:00 PM in Conference Room A',
    timestamp: '3 hours ago',
    isRead: false,
    priority: 'medium',
    actionLink: 'planner',
    category: 'Schedule',
  },
  {
    id: '4',
    type: 'exam',
    title: 'Exam schedule updated',
    description: 'Final exam dates have been published for all classes',
    timestamp: 'Yesterday',
    isRead: true,
    priority: 'medium',
    actionLink: 'exams',
    category: 'Academic',
  },
  {
    id: '5',
    type: 'leave',
    title: 'Leave request approved',
    description: 'Your leave request for March 15 has been approved by the Principal',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'low',
    actionLink: 'leave',
    category: 'Administrative',
  },
  {
    id: '6',
    type: 'assignment',
    title: 'Assignment deadline approaching',
    description: '15 students haven\'t submitted "Geometry Project" due tomorrow',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'high',
    actionLink: 'homework',
    category: 'Academic',
  },
  {
    id: '7',
    type: 'alert',
    title: 'Student attendance alert',
    description: 'Michael Brown has been absent for 3 consecutive days',
    timestamp: '4 days ago',
    isRead: true,
    priority: 'high',
    actionLink: 'students',
    category: 'Alert',
  },
  {
    id: '8',
    type: 'system',
    title: 'System maintenance scheduled',
    description: 'Platform will be under maintenance on Sunday 2:00 AM - 4:00 AM',
    timestamp: '5 days ago',
    isRead: true,
    priority: 'low',
    category: 'System',
  },
  {
    id: '9',
    type: 'message',
    title: 'New chat message',
    description: 'Sarah Thompson replied in Class 7B group chat',
    timestamp: '1 week ago',
    isRead: true,
    priority: 'low',
    actionLink: 'communication',
    category: 'Communication',
  },
  {
    id: '10',
    type: 'assignment',
    title: 'Grading reminder',
    description: '8 assignments pending review in your homework queue',
    timestamp: '1 week ago',
    isRead: true,
    priority: 'medium',
    actionLink: 'homework',
    category: 'Academic',
  },
];

interface NoticesProps {
  onNavigate: (view: string) => void;
}

export function Notices({ onNavigate }: NoticesProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notificationList.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionLink) {
      onNavigate(notification.actionLink);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return FileText;
      case 'message':
        return MessageSquare;
      case 'meeting':
        return Calendar;
      case 'exam':
        return FileText;
      case 'leave':
        return UserCheck;
      case 'alert':
        return AlertCircle;
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#DC2626] text-white';
      case 'medium':
        return 'bg-[#F59E0B] text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredNotifications = notificationList.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'unread' && !n.isRead) ||
      (activeTab === 'read' && n.isRead);

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Notifications & Notices
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with all your important notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#2563EB] text-white px-3 py-1">
            {unreadCount} Unread
          </Badge>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#2563EB]/10">
                <Bell className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#16A34A]/10">
                <CheckCheck className="h-5 w-5 text-[#16A34A]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notificationList.filter(n => n.isRead).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#DC2626]/10">
                <AlertCircle className="h-5 w-5 text-[#DC2626]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notificationList.filter(n => n.priority === 'high').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#F59E0B]/10">
                <Clock className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notificationList.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({notificationList.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">Read ({notificationList.filter(n => n.isRead).length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={cn(
                      'w-full text-left p-4 rounded-lg border transition-all hover:shadow-md',
                      notification.isRead
                        ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-70'
                        : 'bg-blue-50 dark:bg-blue-950/20 border-[#2563EB]/30'
                    )}
                  >
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-lg shrink-0 h-fit',
                          notification.isRead
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-[#2563EB]/10'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-5 w-5',
                            notification.isRead ? 'text-gray-600' : 'text-[#2563EB]'
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-[#2563EB] shrink-0" />
                            )}
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                          </div>
                          <Badge className={cn('text-xs shrink-0', getPriorityColor(notification.priority))}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
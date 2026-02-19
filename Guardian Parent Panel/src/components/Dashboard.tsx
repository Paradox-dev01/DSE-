import { useState } from 'react';
import { 
  Clock, BookOpen, AlertCircle, Calendar, CreditCard, 
  MessageSquare, TrendingUp, CheckCircle, ArrowRight 
} from 'lucide-react';
import { 
  mockAttendance, mockHomework, mockExams, mockFees, 
  mockNotices, mockMessages, mockChildren 
} from '../data/mockData';

interface DashboardProps {
  childId: string;
}

export function Dashboard({ childId }: DashboardProps) {
  const child = mockChildren.find(c => c.id === childId);
  const attendance = mockAttendance[childId] || [];
  const homework = mockHomework[childId] || [];
  const exams = mockExams[childId] || [];
  const fees = mockFees[childId] || [];
  const messages = mockMessages[childId] || [];

  const todayAttendance = attendance[0];
  const pendingHomework = homework.filter(hw => hw.status === 'pending');
  const upcomingExams = exams.slice(0, 2);
  const pendingFees = fees.filter(f => f.status === 'pending');
  const unreadMessages = messages.filter(m => !m.isRead);
  const recentNotices = mockNotices.slice(0, 3);

  // Calculate attendance percentage
  const presentDays = attendance.filter(a => a.status === 'present').length;
  const attendancePercentage = Math.round((presentDays / attendance.length) * 100);

  const getDaysUntil = (dateStr: string) => {
    const today = new Date('2026-02-07');
    const target = new Date(dateStr);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
          Good morning, Parent
        </h1>
        <p className="text-neutral-600 dark:text-neutral-500 dark:text-neutral-400 mt-1">Everything looks good today</p>
      </div>

      {/* Today Overview Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Attendance</p>
              <p className="font-semibold">
                {todayAttendance?.status === 'present' ? 'Present' : 'Not marked yet'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Next Class</p>
              <p className="font-semibold">Mathematics at 10:00 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Homework Pending</p>
              <p className="font-semibold">{pendingHomework.length} assignments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Snapshot */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Attendance</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-neutral-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${attendancePercentage * 2.51} 251`}
                  className={attendancePercentage >= 90 ? 'text-green-500' : attendancePercentage >= 75 ? 'text-yellow-500' : 'text-red-500'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-neutral-900 dark:text-white">{attendancePercentage}%</span>
              </div>
            </div>
            <div>
              <p className={`text-sm font-medium ${attendancePercentage >= 90 ? 'text-green-600' : attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                {attendancePercentage >= 90 ? 'Excellent Attendance' : attendancePercentage >= 75 ? 'Good Attendance' : 'Needs Improvement'}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400 mt-1">
                {presentDays} out of {attendance.length} days present
              </p>
            </div>
          </div>
        </div>

        {/* Fees Due */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Fees Due</h3>
            <CreditCard className="w-5 h-5 text-neutral-400" />
          </div>
          {pendingFees.length > 0 ? (
            <div className="space-y-3">
              {pendingFees.slice(0, 2).map((fee) => (
                <div key={fee.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">${fee.amount}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400">{fee.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-400">Due {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Pay Now
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-neutral-600 dark:text-neutral-500 dark:text-neutral-400">All fees are paid</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Upcoming Exams</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingExams.map((exam) => {
            const daysUntil = getDaysUntil(exam.date);
            return (
              <div key={exam.id} className="border border-neutral-200 rounded-xl p-4 dark:border-neutral-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{exam.subject}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400 mt-1">{exam.syllabus}</p>
                  </div>
                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium dark:bg-orange-900 dark:text-orange-200">
                    {daysUntil} days
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(exam.date).toLocaleDateString()} at {exam.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notices & Messages Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Notices</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentNotices.map((notice) => (
              <div 
                key={notice.id} 
                className={`p-4 rounded-lg border ${
                  notice.isPinned ? 'border-blue-200 bg-blue-50 dark:bg-blue-900 dark:border-blue-700'   // TODO: dark:bg-blue-900  overridden; needs review
                                  : 'border-neutral-200 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-neutral-900 dark:text-white">{notice.title}</h4>
                  {!notice.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">{notice.content}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">{new Date(notice.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Messages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Messages</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 3).map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-neutral-50 transition-colors ${
                  !message.isRead ? 'border-blue-200 bg-blue-50 dark:bg-blue-900 dark:border-blue-700'   // TODO: dark:bg-blue-900  overridden; needs review
                                  : 'border-neutral-200 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img 
                    src={message.avatar} 
                    alt={message.from}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-neutral-900 dark:text-white">{message.from}</h4>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{message.role}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 line-clamp-2">{message.content}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homework Pending */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Pending Homework</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        {pendingHomework.length > 0 ? (
          <div className="space-y-3">
            {pendingHomework.map((hw) => {
              const daysUntil = getDaysUntil(hw.dueDate);
              return (
                <div key={hw.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg dark:border-neutral-700">
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white">{hw.title}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 dark:text-neutral-400 mt-1">{hw.subject}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{hw.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      daysUntil <= 1 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      Due in {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-neutral-600 dark:text-neutral-500 dark:text-neutral-400">All homework completed</p>
          </div>
        )}
      </div>
    </div>
  );
}

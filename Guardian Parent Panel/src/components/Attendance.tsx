import { Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { mockAttendance } from '../data/mockData';

interface AttendanceProps {
  childId: string;
}

export function Attendance({ childId }: AttendanceProps) {
  const attendance = mockAttendance[childId] || [];
  
  // Calculate stats
  const presentDays = attendance.filter(a => a.status === 'present').length;
  const absentDays = attendance.filter(a => a.status === 'absent').length;
  const lateDays = attendance.filter(a => a.status === 'late').length;
  const totalDays = attendance.length;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date('2026-02-01');
    const endDate = new Date('2026-02-28');
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getAttendanceStatus = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendance.find(a => a.date === dateStr);
  };

  const isFutureDate = (date: Date) => {
    const today = new Date('2026-02-07');
    return date > today;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Attendance</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">Track your child's attendance record</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Overall</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">{attendancePercentage}%</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              attendancePercentage >= 90 ? 'bg-green-100' : attendancePercentage >= 75 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                attendancePercentage >= 90 ? 'text-green-600' : attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
          </div>
          <p className={`text-xs mt-2 ${
            attendancePercentage >= 90 ? 'text-green-600' : attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {attendancePercentage >= 90 ? 'Excellent' : attendancePercentage >= 75 ? 'Good' : 'Needs improvement'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{presentDays}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Total days present</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{absentDays}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Total days absent</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Late</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{lateDays}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Total late arrivals</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">February 2026</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-neutral-600 dark:text-neutral-500">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-neutral-600 dark:text-neutral-500">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-neutral-600 dark:text-neutral-500">Late</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: calendarDays[0].getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((date) => {
            const status = getAttendanceStatus(date);
            const isFuture = isFutureDate(date);
            const isToday = date.toISOString().split('T')[0] === '2026-02-07';

            return (
              <div
                key={date.toISOString()}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  isFuture
                    ? 'bg-neutral-50 text-neutral-300'
                    : status?.status === 'present'
                    ? 'bg-green-100 text-green-700'
                    : status?.status === 'absent'
                    ? 'bg-red-100 text-red-700'
                    : status?.status === 'late'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-neutral-100 text-neutral-500'
                } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Absences */}
      {absentDays > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Recent Absences</h2>
          <div className="space-y-3">
            {attendance
              .filter(a => a.status === 'absent')
              .map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      {record.reason && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">Reason: {record.reason}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Warning if attendance is low */}
      {attendancePercentage < 75 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Attendance Alert</h3>
              <p className="text-sm text-yellow-800 mt-1">
                Your child's attendance is below 75%. Regular attendance is important for academic success. Please contact the school if there are any concerns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

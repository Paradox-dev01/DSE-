import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon, Save, Copy, UserCheck, UserX, Clock } from 'lucide-react';
import { students, todayClasses } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export function Attendance() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState('7B');
  const [selectedPeriod, setSelectedPeriod] = useState('3');
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>(() => {
    const initial: Record<number, AttendanceStatus> = {};
    students.filter(s => s.class === selectedClass).forEach(s => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  const classStudents = students.filter(s => s.class === selectedClass);
  const currentClass = todayClasses.find(c => c.className === `Class ${selectedClass}` && c.period.toString() === selectedPeriod);

  const handleStatusToggle = (studentId: number, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const newAttendance: Record<number, AttendanceStatus> = {};
    classStudents.forEach(s => {
      newAttendance[s.id] = 'present';
    });
    setAttendance(newAttendance);
    toast.success('Marked all students present');
  };

  const handleSaveAttendance = () => {
    toast.success('Attendance saved successfully! Guardians will be notified.');
  };

  const handleKeyPress = (e: KeyboardEvent, studentId: number) => {
    const key = e.key.toLowerCase();
    if (key === 'p') handleStatusToggle(studentId, 'present');
    if (key === 'a') handleStatusToggle(studentId, 'absent');
    if (key === 'l') handleStatusToggle(studentId, 'late');
    if (key === 'e') handleStatusToggle(studentId, 'excused');
  };

  const stats = {
    present: Object.values(attendance).filter(s => s === 'present').length,
    absent: Object.values(attendance).filter(s => s === 'absent').length,
    late: Object.values(attendance).filter(s => s === 'late').length,
    excused: Object.values(attendance).filter(s => s === 'excused').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Attendance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Mark student attendance quickly using keyboard shortcuts (P/A/L/E)
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Date Picker */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Class Selector */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Class
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7B">Class 7B</SelectItem>
                  <SelectItem value="8A">Class 8A</SelectItem>
                  <SelectItem value="9C">Class 9C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Selector */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Period
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {todayClasses
                    .filter(c => c.className === `Class ${selectedClass}`)
                    .map(c => (
                      <SelectItem key={c.period} value={c.period.toString()}>
                        Period {c.period} - {c.subject} ({c.time})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" onClick={handleMarkAllPresent}>
              <UserCheck className="mr-2 h-4 w-4" />
              Mark All Present
            </Button>
            <Button variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              Copy Last Class
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#16A34A]">{stats.present}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Present</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DC2626]">{stats.absent}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F59E0B]">{stats.late}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Late</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2563EB]">{stats.excused}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Excused</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentClass ? `${currentClass.subject} - Period ${currentClass.period}` : 'Student Attendance'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classStudents.map((student) => {
              const status = attendance[student.id];
              return (
                <div
                  key={student.id}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all",
                    status === 'present' && "border-[#16A34A] bg-green-50 dark:bg-green-950/20",
                    status === 'absent' && "border-[#DC2626] bg-red-50 dark:bg-red-950/20",
                    status === 'late' && "border-[#F59E0B] bg-amber-50 dark:bg-amber-950/20",
                    status === 'excused' && "border-[#2563EB] bg-blue-50 dark:bg-blue-950/20"
                  )}
                  onKeyDown={(e: any) => handleKeyPress(e, student.id)}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      size="sm"
                      variant={status === 'present' ? 'default' : 'outline'}
                      className={status === 'present' ? 'bg-[#16A34A] hover:bg-[#16A34A]/90' : ''}
                      onClick={() => handleStatusToggle(student.id, 'present')}
                    >
                      P
                    </Button>
                    <Button
                      size="sm"
                      variant={status === 'absent' ? 'default' : 'outline'}
                      className={status === 'absent' ? 'bg-[#DC2626] hover:bg-[#DC2626]/90' : ''}
                      onClick={() => handleStatusToggle(student.id, 'absent')}
                    >
                      A
                    </Button>
                    <Button
                      size="sm"
                      variant={status === 'late' ? 'default' : 'outline'}
                      className={status === 'late' ? 'bg-[#F59E0B] hover:bg-[#F59E0B]/90' : ''}
                      onClick={() => handleStatusToggle(student.id, 'late')}
                    >
                      L
                    </Button>
                    <Button
                      size="sm"
                      variant={status === 'excused' ? 'default' : 'outline'}
                      className={status === 'excused' ? 'bg-[#2563EB] hover:bg-[#2563EB]/90' : ''}
                      onClick={() => handleStatusToggle(student.id, 'excused')}
                    >
                      E
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 flex justify-between items-center shadow-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {stats.present + stats.absent + stats.late + stats.excused} students marked
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90" onClick={handleSaveAttendance}>
            <Save className="mr-2 h-4 w-4" />
            Save & Notify Guardians
          </Button>
        </div>
      </div>
    </div>
  );
}
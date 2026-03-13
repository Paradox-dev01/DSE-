import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BookOpen, Users, ClipboardCheck, BookMarked, GraduationCap, FileText, BarChart } from 'lucide-react';
import { todayClasses, students } from '../../lib/mock-data';

interface MyClassesProps {
  onNavigate: (view: string) => void;
}

export function MyClasses({ onNavigate }: MyClassesProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState('all');

  const filteredClasses = viewTab === 'all' 
    ? todayClasses 
    : viewTab === 'today'
    ? todayClasses.filter(c => c.status === 'active' || c.status === 'upcoming')
    : todayClasses.filter(c => c.status === 'upcoming');

  if (selectedClass) {
    const classInfo = todayClasses.find(c => c.id.toString() === selectedClass);
    const classStudents = students.filter(s => classInfo && s.class === classInfo.className.replace('Class ', ''));

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={() => setSelectedClass(null)}>
          ← Back to Classes
        </Button>

        {/* Class Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {classInfo?.className} - {classInfo?.subject}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Period {classInfo?.period} • {classInfo?.time} • {classInfo?.room}
                </p>
              </div>
              <Badge className="bg-[#2563EB]">{classInfo?.studentCount} Students</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Class Detail Tabs */}
        <Tabs defaultValue="students">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="homework">Homework</TabsTrigger>
            <TabsTrigger value="marks">Marks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classStudents.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.rollNo}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Attendance: </span>
                          <span className={`font-medium ${
                            student.attendance >= 90 ? 'text-[#16A34A]' :
                            student.attendance >= 75 ? 'text-[#F59E0B]' :
                            'text-[#DC2626]'
                          }`}>{student.attendance}%</span>
                        </div>
                        <Badge variant={
                          student.performance === 'excellent' ? 'default' :
                          student.performance === 'good' ? 'secondary' :
                          'destructive'
                        }>
                          {student.performance}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    View and manage attendance records for this class
                  </p>
                  <Button className="mt-4 bg-[#2563EB]" onClick={() => onNavigate('attendance')}>
                    Go to Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Homework & Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Create and manage homework assignments
                  </p>
                  <Button className="mt-4 bg-[#2563EB]" onClick={() => onNavigate('homework')}>
                    Go to Homework
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Marks & Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter and manage exam marks
                  </p>
                  <Button className="mt-4 bg-[#2563EB]" onClick={() => onNavigate('exams')}>
                    Go to Exams & Marks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Today's Lesson - Linear Equations
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Covered topics: Introduction to linear equations, solving simple equations, 
                          word problems. Students were engaged and completed practice exercises.
                        </p>
                        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <span>Syllabus Progress: 45%</span>
                          <span>•</span>
                          <span>Feb 7, 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Attendance</p>
                    <p className="text-2xl font-bold text-[#16A34A] mt-2">89%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Performance</p>
                    <p className="text-2xl font-bold text-[#2563EB] mt-2">76%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">At-Risk Students</p>
                    <p className="text-2xl font-bold text-[#F59E0B] mt-2">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Classes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage all your classes
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={viewTab} onValueChange={setViewTab}>
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{cls.className}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.subject}</p>
                </div>
                <Badge
                  variant={
                    cls.status === 'active'
                      ? 'default'
                      : cls.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                  }
                  className={cls.status === 'active' ? 'bg-[#2563EB]' : ''}
                >
                  {cls.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{cls.studentCount} Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <BookOpen className="h-4 w-4" />
                  <span>Period {cls.period} • {cls.time}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedClass(cls.id.toString())}
                  >
                    Open
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#2563EB]"
                    onClick={() => onNavigate('attendance')}
                  >
                    Attendance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
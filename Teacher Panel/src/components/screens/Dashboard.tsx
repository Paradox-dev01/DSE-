import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Clock,
  CheckCircle,
  BookMarked,
  GraduationCap,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  Plus,
  FileText,
  Users,
  Star,
  Circle,
} from "lucide-react";
import {
  todayClasses,
  pendingHomework,
  pendingMarks,
  messages,
  upcomingExams,
  currentTeacher,
} from "../../lib/mock-data";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const activeClass = todayClasses.find((c) => c.status === "active");
  const completedClasses = todayClasses.filter(
    (c) => c.status === "completed",
  ).length;
  const totalClasses = todayClasses.length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Enhanced Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 md:p-8 text-white shadow-xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium text-blue-100">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {getGreeting()}, Dr. {currentTeacher.name.split(" ")[1]}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your classes today
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-xs font-medium text-blue-100">
                    Today's Classes
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  {completedClasses}/{totalClasses}
                </p>
                <p className="text-xs text-blue-100">Completed</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-1">
                  <Circle className="h-5 w-5 text-green-300" />
                  <span className="text-xs font-medium text-blue-100">
                    Performance
                  </span>
                </div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-blue-100">Attendance Rate</p>
              </div>
            </div>
          </div>

          {/* Active Class Banner */}
          {activeClass && (
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-400 flex items-center justify-center animate-pulse">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-100">Currently Teaching</p>
                  <p className="font-semibold text-lg">
                    {activeClass.className} - {activeClass.subject}
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-blue-100">
                    Period {activeClass.period}
                  </p>
                  <p className="font-medium">{activeClass.time}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-[#2563EB] hover:bg-[#2563EB]/90"
          onClick={() => onNavigate("attendance")}
        >
          <ClipboardCheck className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
        <Button variant="outline" onClick={() => onNavigate("homework")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Homework
        </Button>
        <Button variant="outline" onClick={() => onNavigate("exams")}>
          <FileText className="mr-2 h-4 w-4" />
          Enter Marks
        </Button>
        <Button variant="outline" onClick={() => onNavigate("communication")}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message Class
        </Button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Today's Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-[#2563EB]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedClasses}/{totalClasses}
            </div>
            <Progress
              value={(completedClasses / totalClasses) * 100}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Classes completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Reviews
              </CardTitle>
              <BookMarked className="h-4 w-4 text-[#F59E0B]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {pendingHomework.reduce(
                (acc, hw) => acc + (hw.total - hw.submitted),
                0,
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Homework submissions to review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Marks Entry
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-[#16A34A]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {pendingMarks.reduce(
                (acc, mark) => acc + (mark.total - mark.entered),
                0,
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Student marks pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#DC2626]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {messages.filter((m) => m.unread).length}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Classes Timeline
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("classes")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center gap-4 p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        cls.status === "completed"
                          ? "bg-green-100 dark:bg-green-950"
                          : cls.status === "active"
                            ? "bg-blue-100 dark:bg-blue-950"
                            : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {cls.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-[#16A34A]" />
                      ) : (
                        <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {cls.className}
                      </h4>
                      <Badge
                        variant={
                          cls.status === "active"
                            ? "default"
                            : cls.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          cls.status === "active" ? "bg-[#2563EB]" : ""
                        }
                      >
                        {cls.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{cls.subject}</span>
                      <span>•</span>
                      <span>Period {cls.period}</span>
                      <span>•</span>
                      <span>{cls.time}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {cls.studentCount}
                      </span>
                    </div>
                  </div>
                  {cls.status !== "completed" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Open
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                      >
                        Attendance
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Homework Review */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5" />
                Pending Homework Review
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("homework")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingHomework.map((hw) => (
                <div
                  key={hw.id}
                  className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {hw.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {hw.class} • {hw.subject}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress
                          value={(hw.submitted / hw.total) * 100}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {hw.submitted}/{hw.total}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {hw.dueDate}
                    </span>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Marks Entry */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Pending Marks Entry
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("exams")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingMarks.map((mark) => (
                <div
                  key={mark.id}
                  className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {mark.exam}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {mark.class} • {mark.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={(mark.entered / mark.total) * 100}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {mark.entered}/{mark.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Exam Date: {mark.date}
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                    >
                      Enter Marks
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Exams
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("planner")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {exam.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exam.class} • {exam.subject}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>📅 {exam.date}</span>
                        <span>⏱️ {exam.duration}</span>
                        <span>📝 {exam.totalMarks} marks</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages Waiting */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages Waiting
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("communication")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messages.slice(0, 3).map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg border dark:border-gray-700 ${
                    message.unread
                      ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {message.from}
                        </h4>
                        {message.unread && (
                          <div className="h-2 w-2 rounded-full bg-[#2563EB]"></div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {message.preview}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

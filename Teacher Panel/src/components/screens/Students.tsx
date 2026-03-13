import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  Search,
  Phone,
  Mail,
  AlertTriangle,
  MessageSquare,
  Calendar,
  PhoneCall,
} from "lucide-react";
import { students } from "../../lib/mock-data";
import { Progress } from "../ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock attendance trend data
const attendanceTrendData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 87 },
  { month: "May", attendance: 91 },
  { month: "Jun", attendance: 89 },
];

// Mock marks data
const marksData = [
  { subject: "Math", marks: 85 },
  { subject: "Science", marks: 78 },
  { subject: "English", marks: 92 },
  { subject: "History", marks: 74 },
  { subject: "Geography", marks: 88 },
];

// Colors for charts
const CHART_COLORS = {
  primary: "#2563EB",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  purple: "#8B5CF6",
  pink: "#EC4899",
};

export function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.class.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const student = students.find((s) => s.id === selectedStudent);

  // Handle contact guardian - opens email or phone based on device
  const handleContactGuardian = () => {
    if (!student) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile, initiate phone call
      window.location.href = `tel:${student.guardianPhone}`;
    } else {
      // On desktop, open email client
      window.location.href = `mailto:${student.guardianEmail}`;
    }
  };

  // Handle schedule meeting - opens calendar with prefilled details
  const handleScheduleMeeting = () => {
    if (!student) return;

    const subject = encodeURIComponent(
      `Parent-Teacher Meeting for ${student.name}`,
    );
    const body = encodeURIComponent(
      `Dear ${student.guardianName},\n\n` +
        `I would like to schedule a meeting to discuss ${student.name}'s academic progress.\n\n` +
        `Best regards,\nTeacher`,
    );

    // Check if it's mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile, try to open calendar app
      window.location.href = `calshow:`;
    } else {
      // On desktop, open email as fallback or use calendar link
      window.location.href = `mailto:${student.guardianEmail}?subject=${subject}&body=${body}`;
    }
  };

  // Handle email click
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // Handle phone click
  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="text-sm text-[#2563EB]">
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for marks
  const MarksTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="text-sm text-[#16A34A]">Marks: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Students Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage student information
        </p>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, roll number, or class..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedStudent(student.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {student.rollNo}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{student.class}</Badge>
                    <Badge
                      variant={
                        student.performance === "excellent"
                          ? "default"
                          : student.performance === "good"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        student.performance === "excellent"
                          ? "bg-[#16A34A]"
                          : ""
                      }
                    >
                      {student.performance}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Attendance
                    </span>
                    <span
                      className={`font-medium ${
                        student.attendance >= 90
                          ? "text-[#16A34A]"
                          : student.attendance >= 75
                            ? "text-[#F59E0B]"
                            : "text-[#DC2626]"
                      }`}
                    >
                      {student.attendance}%
                    </span>
                  </div>
                  <Progress value={student.attendance} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Profile Drawer */}
      <Sheet
        open={selectedStudent !== null}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {student && (
            <>
              <SheetHeader>
                <SheetTitle>Student Profile</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Student Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {student.rollNo}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{student.class}</Badge>
                      <Badge
                        variant={
                          student.performance === "excellent"
                            ? "default"
                            : student.performance === "good"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          student.performance === "excellent"
                            ? "bg-[#16A34A]"
                            : ""
                        }
                      >
                        {student.performance}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Attendance
                      </p>
                      <p
                        className={`text-2xl font-bold mt-1 ${
                          student.attendance >= 90
                            ? "text-[#16A34A]"
                            : student.attendance >= 75
                              ? "text-[#F59E0B]"
                              : "text-[#DC2626]"
                        }`}
                      >
                        {student.attendance}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Performance
                      </p>
                      <p className="text-2xl font-bold mt-1 capitalize text-gray-900 dark:text-white">
                        {student.performance}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Guardian Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Guardian Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Name
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {student.guardianName}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#2563EB] transition-colors"
                      onClick={() => handlePhoneClick(student.guardianPhone)}
                    >
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {student.guardianPhone}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#2563EB] transition-colors"
                      onClick={() => handleEmailClick(student.guardianEmail)}
                    >
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {student.guardianEmail}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Attendance Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={attendanceTrendData}>
                          <defs>
                            <linearGradient
                              id="attendanceGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor={CHART_COLORS.primary}
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor={CHART_COLORS.primary}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-gray-200 dark:stroke-gray-700"
                          />
                          <XAxis
                            dataKey="month"
                            className="text-xs text-gray-600 dark:text-gray-400"
                          />
                          <YAxis
                            className="text-xs text-gray-600 dark:text-gray-400"
                            domain={[0, 100]}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="attendance"
                            stroke={CHART_COLORS.primary}
                            strokeWidth={2}
                            fill="url(#attendanceGradient)"
                            name="Attendance"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Graph - Bar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Subject-wise Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={marksData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-gray-200 dark:stroke-gray-700"
                          />
                          <XAxis
                            dataKey="subject"
                            className="text-xs text-gray-600 dark:text-gray-400"
                          />
                          <YAxis
                            className="text-xs text-gray-600 dark:text-gray-400"
                            domain={[0, 100]}
                          />
                          <Tooltip content={<MarksTooltip />} />
                          <Bar
                            dataKey="marks"
                            fill={CHART_COLORS.success}
                            radius={[4, 4, 0, 0]}
                          >
                            {marksData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.marks >= 80
                                    ? CHART_COLORS.success
                                    : entry.marks >= 60
                                      ? CHART_COLORS.warning
                                      : CHART_COLORS.danger
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Overall Performance Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Overall Performance Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Excellent",
                                value:
                                  student.performance === "excellent" ? 100 : 0,
                              },
                              {
                                name: "Good",
                                value: student.performance === "good" ? 100 : 0,
                              },
                              {
                                name: "Weak",
                                value: student.performance === "weak" ? 100 : 0,
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill={CHART_COLORS.success} />
                            <Cell fill={CHART_COLORS.warning} />
                            <Cell fill={CHART_COLORS.danger} />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#16A34A]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Excellent
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Good
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Weak
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    onClick={handleContactGuardian}
                  >
                    {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
                      <PhoneCall className="mr-2 h-4 w-4" />
                    ) : (
                      <Mail className="mr-2 h-4 w-4" />
                    )}
                    {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                      ? "Call Guardian"
                      : "Email Guardian"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleScheduleMeeting}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </div>
                {student.performance === "weak" && (
                  <Button
                    variant="outline"
                    className="w-full border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-colors"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Flag for Attention
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

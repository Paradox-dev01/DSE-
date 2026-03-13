import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Calendar as CalendarIcon,
  BarChart,
  FileText,
  HelpCircle,
  Keyboard,
  Upload,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Types
interface Event {
  id: string;
  title: string;
  date: Date;
  type: "class" | "exam" | "homework" | "meeting";
}

interface Resource {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  url: string;
}

interface LeaveRequest {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
}

// Custom hook for file upload
function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
  ): Promise<{ id: string; url: string }> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // In a real app, you would upload to your backend here
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });

      // Simulate successful upload
      return {
        id: Date.now().toString(),
        url: URL.createObjectURL(file), // This is just for demo - in real app, use the URL from backend
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      throw err;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadFile, uploading, error, progress };
}

// Calendar View Component
function CalendarView({ onClose }: { onClose: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Mathematics Class - Grade 10",
      date: new Date(),
      type: "class",
    },
    {
      id: "2",
      title: "Final Exam - Science",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "exam",
    },
    {
      id: "3",
      title: "Homework: Algebra Worksheet",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: "homework",
    },
    {
      id: "4",
      title: "Parent-Teacher Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      type: "meeting",
    },
  ]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "homework":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "meeting":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calendar</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="h-24 bg-gray-50 dark:bg-gray-900 rounded-lg"
                ></div>
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDay(day);
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`h-24 p-1 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors dark:border-gray-700 ${
                      isToday
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                    onClick={() =>
                      alert(
                        `Viewing events for ${monthNames[currentDate.getMonth()]} ${day}`,
                      )
                    }
                  >
                    <div
                      className={`font-medium text-sm ${
                        isToday
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${getEventColor(event.type)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Planner Component
export function Planner() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Planner
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your schedule and plan lessons
        </p>
      </div>

      {!showCalendar ? (
        <Card>
          <CardContent className="pt-6">
            <div className="h-96 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">Calendar View</p>
              <p className="text-sm mt-2">
                View classes, exams, homework deadlines, and meetings
              </p>
              <Button
                className="mt-4 bg-[#2563EB] hover:bg-[#1d4ed8]"
                onClick={() => setShowCalendar(true)}
              >
                Open Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <CalendarView onClose={() => setShowCalendar(false)} />
      )}
    </div>
  );
}

// Reports Component
export function Reports() {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    setExporting(format);

    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create dummy data for export
    const data = {
      classPerformance: [
        { class: "Grade 10A", average: 85, students: 30 },
        { class: "Grade 10B", average: 78, students: 28 },
        { class: "Grade 11A", average: 92, students: 25 },
      ],
      attendance: [
        { date: "2024-01-01", present: 85, absent: 15, late: 5 },
        { date: "2024-01-02", present: 88, absent: 12, late: 3 },
      ],
      homework: [
        { assignment: "Math Worksheet", completed: 45, pending: 5 },
        { assignment: "Science Project", completed: 38, pending: 12 },
      ],
    };

    // Create and download file
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: format === "pdf" ? "application/pdf" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExporting(null);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View analytics and generate reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Average: 85%</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click to view detailed analytics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Present: 92%</p>
                <p className="text-sm text-gray-400 mt-2">
                  This month's attendance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homework Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Completed: 88%
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Average completion rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleExport("pdf")}
                disabled={exporting !== null}
              >
                {exporting === "pdf" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </>
                )}
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleExport("excel")}
                disabled={exporting !== null}
              >
                {exporting === "excel" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export as Excel
                  </>
                )}
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleExport("csv")}
                disabled={exporting !== null}
              >
                {exporting === "csv" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Leave Component
export function Leave() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "Sick Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate dates
    if (!formData.fromDate || !formData.toDate) {
      alert("Please select both from and to dates");
      setSubmitting(false);
      return;
    }

    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      alert("From date cannot be after to date");
      setSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      submittedAt: new Date(),
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setShowForm(false);
    setFormData({ type: "Sick Leave", fromDate: "", toDate: "", reason: "" });
    setSubmitting(false);
    alert("Leave request submitted successfully!");
  };

  const getStatusColor = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Leave & Substitution
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Apply for leave and manage substitutions
        </p>
      </div>

      {!showForm && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#2563EB] hover:bg-[#1d4ed8]"
          >
            <FileText className="mr-2 h-4 w-4" />
            Apply for Leave
          </Button>
        </div>
      )}

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Apply for Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Emergency Leave</option>
                  <option>Vacation</option>
                  <option>Professional Development</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    value={formData.fromDate}
                    onChange={(e) =>
                      setFormData({ ...formData, fromDate: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    To Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    value={formData.toDate}
                    onChange={(e) =>
                      setFormData({ ...formData, toDate: e.target.value })
                    }
                    min={
                      formData.fromDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter reason for leave..."
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#2563EB] hover:bg-[#1d4ed8]"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Submit Leave Request
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        // Show leave requests history
        <Card>
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            {leaveRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-12 w-12 mx-auto mb-3" />
                <p>No leave requests yet</p>
                <p className="text-sm mt-1">
                  Click "Apply for Leave" to submit a request
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {request.type}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {new Date(request.fromDate).toLocaleDateString()} -{" "}
                      {new Date(request.toDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {request.reason}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {request.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Resources Component
export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, error, progress } = useFileUpload();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF, DOC, DOCX, PPT, PPTX, XLS, or XLSX files");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    try {
      const result = await uploadFile(file);

      const newResource: Resource = {
        id: result.id,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        url: result.url,
      };

      setResources([newResource, ...resources]);
      setShowUpload(false);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((r) => r.id !== id));
      if (selectedResource?.id === id) {
        setSelectedResource(null);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("presentation")) return "📊";
    if (type.includes("sheet")) return "📑";
    return "📁";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Access and manage teaching resources
        </p>
      </div>

      {/* Upload Section */}
      {showUpload ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upload Resource</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpload(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  const input = fileInputRef.current;
                  if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                    handleFileSelect({
                      target: { files: dataTransfer.files },
                    } as any);
                  }
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                className="hidden"
              />

              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {uploading ? "Uploading..." : "Upload Resource"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop or click to select files (PDF, DOC, PPT, XLS) -
                Max 10MB
              </p>

              {uploading ? (
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {progress}% uploaded
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Select File
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowUpload(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>Error: {error}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resource List */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Resource Library</CardTitle>
                <Button onClick={() => setShowUpload(true)} size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent>
                {resources.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <FileText className="h-16 w-16 mb-4" />
                    <p className="text-lg font-medium">No Resources Yet</p>
                    <p className="text-sm mt-2">
                      Upload your first teaching material
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resources.map((resource) => (
                      <div
                        key={resource.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedResource?.id === resource.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                            : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedResource(resource)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {getFileIcon(resource.type)}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {resource.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(resource.size)} • Uploaded{" "}
                              {resource.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(resource.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resource Preview */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedResource ? (
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-6xl">
                        {getFileIcon(selectedResource.type)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {selectedResource.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Type:{" "}
                        {selectedResource.type.split("/")[1]?.toUpperCase() ||
                          "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Size: {formatFileSize(selectedResource.size)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Uploaded:{" "}
                        {selectedResource.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() =>
                        window.open(selectedResource.url, "_blank")
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <p className="text-sm">Select a resource to preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// Help Component
export function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqs = [
    {
      id: 1,
      category: "Attendance",
      question: "How do I mark attendance for my class?",
      answer:
        "Go to the Attendance section, select your class, and mark each student as Present, Absent, Late, or Excused. You can also use keyboard shortcuts: P for Present, A for Absent, L for Late, and E for Excused.",
    },
    {
      id: 2,
      category: "Attendance",
      question: "Can I mark attendance for multiple classes at once?",
      answer:
        "Yes, you can use the bulk attendance feature to mark attendance for multiple classes or date ranges at once.",
    },
    {
      id: 3,
      category: "Resources",
      question: "How do I upload teaching materials?",
      answer:
        'Navigate to the Resources section and click the "Upload" button. You can drag and drop files or select them from your computer. Supported formats include PDF, DOC, DOCX, PPT, PPTX, XLS, and XLSX.',
    },
    {
      id: 4,
      category: "Resources",
      question: "What is the maximum file size for uploads?",
      answer: "The maximum file size for uploads is 10MB per file.",
    },
    {
      id: 5,
      category: "Leave",
      question: "How do I apply for leave?",
      answer:
        'Go to the Leave & Substitution section and click "Apply for Leave". Fill in the leave type, dates, and reason, then submit the form. Your request will be reviewed by the administration.',
    },
    {
      id: 6,
      category: "Reports",
      question: "How do I generate performance reports?",
      answer:
        "Visit the Reports section and click on any of the export options (PDF, Excel, or CSV) to download the report. You can also view charts and analytics directly on the page.",
    },
    {
      id: 7,
      category: "Shortcuts",
      question: "What keyboard shortcuts are available?",
      answer:
        "In the attendance section, you can use: P for Present, A for Absent, L for Late, and E for Excused. More shortcuts will be added in future updates.",
    },
    {
      id: 8,
      category: "General",
      question: "How do I contact support?",
      answer:
        "You can contact support by email at support@teacherportal.com or by phone at 1-800-123-4567. Support hours are Monday-Friday, 9 AM to 6 PM.",
    },
  ];

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get help and support
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full p-4 pl-12 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedCategory(category === "All" ? null : category)
            }
            className={selectedCategory === category ? "bg-[#2563EB]" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <HelpCircle className="h-12 w-12 mx-auto mb-3" />
                <p>No results found</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg dark:border-gray-700"
                >
                  <button
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                    }
                  >
                    <div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 block mb-1">
                        {faq.category}
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedFaq === faq.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 pt-2 text-gray-600 dark:text-gray-400 border-t dark:border-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                Contact Support
              </Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Shortcuts Component
export function Shortcuts() {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

  const shortcuts = [
    { key: "P", description: "Mark Present", category: "Attendance" },
    { key: "A", description: "Mark Absent", category: "Attendance" },
    { key: "L", description: "Mark Late", category: "Attendance" },
    { key: "E", description: "Mark Excused", category: "Attendance" },
    { key: "Ctrl + S", description: "Save Current Form", category: "General" },
    { key: "Ctrl + F", description: "Search", category: "General" },
    { key: "?", description: "Show Keyboard Shortcuts", category: "General" },
    { key: "Esc", description: "Close Modal / Cancel", category: "General" },
    { key: "Ctrl + N", description: "New Resource", category: "Resources" },
    { key: "Ctrl + P", description: "Print Report", category: "Reports" },
  ];

  const categories = ["All", ...new Set(shortcuts.map((s) => s.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredShortcuts = shortcuts.filter(
    (s) =>
      !selectedCategory ||
      selectedCategory === "All" ||
      s.category === selectedCategory,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Keyboard Shortcuts
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Learn keyboard shortcuts to work faster
        </p>
      </div>

      {/* Toggle Shortcuts */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Enable Keyboard Shortcuts
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Turn keyboard shortcuts on or off
              </p>
            </div>
            <button
              onClick={() => setShortcutsEnabled(!shortcutsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                shortcutsEnabled
                  ? "bg-[#2563EB]"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  shortcutsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedCategory(category === "All" ? null : category)
            }
            className={selectedCategory === category ? "bg-[#2563EB]" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredShortcuts
                .filter((s) => s.category === "Attendance")
                .map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-gray-900 dark:text-white">
                      {shortcut.description}
                    </span>
                    <kbd className="px-3 py-1 bg-white dark:bg-gray-900 border rounded font-mono text-sm shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>General Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredShortcuts
                .filter((s) => s.category === "General")
                .map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-gray-900 dark:text-white">
                      {shortcut.description}
                    </span>
                    <kbd className="px-3 py-1 bg-white dark:bg-gray-900 border rounded font-mono text-sm shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>All Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredShortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <span className="text-gray-900 dark:text-white block">
                      {shortcut.description}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {shortcut.category}
                    </span>
                  </div>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-900 border rounded font-mono text-sm shadow-sm">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Keyboard className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  Press ? for Help
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Press ? anywhere to see available shortcuts
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Check className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  Save Time
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use shortcuts to mark attendance 3x faster
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <AlertCircle className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  Customize
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  More customization options coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

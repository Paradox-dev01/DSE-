import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Save, Lock, Upload } from "lucide-react";
import { students, upcomingExams } from "../../lib/mock-data";
import { toast } from "sonner";

export function ExamsMarks() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [marks, setMarks] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState(null);

  // Load saved marks from localStorage when component mounts or exam changes
  useEffect(() => {
    if (selectedExam) {
      const savedMarks = localStorage.getItem(`exam_${selectedExam}_marks`);
      const savedLockState = localStorage.getItem(
        `exam_${selectedExam}_locked`,
      );

      if (savedMarks) {
        setMarks(JSON.parse(savedMarks));
      } else {
        setMarks({});
      }

      setIsLocked(savedLockState === "true");
    }

    // Cleanup function
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [selectedExam]);

  // Set up auto-save
  useEffect(() => {
    if (selectedExam && !isLocked) {
      const interval = setInterval(() => {
        handleAutoSave();
      }, 3000);

      setAutoSaveInterval(interval);

      return () => clearInterval(interval);
    }
  }, [selectedExam, marks, isLocked]);

  const handleMarkChange = (studentId, value) => {
    if (!isLocked) {
      // Allow empty string or numbers only
      if (value === "" || /^\d*$/.test(value)) {
        const exam = upcomingExams.find((e) => e.id === selectedExam);

        // If it's not empty, validate the range
        if (value !== "") {
          const numValue = parseInt(value, 10);
          if (numValue >= 0 && numValue <= exam.totalMarks) {
            setMarks((prev) => ({ ...prev, [studentId]: value }));
          } else {
            toast.error(`Marks must be between 0 and ${exam.totalMarks}`);
          }
        } else {
          // Allow empty value (user clearing the input)
          setMarks((prev) => ({ ...prev, [studentId]: value }));
        }
      }
    }
  };

  const handleAutoSave = () => {
    if (selectedExam && Object.keys(marks).length > 0) {
      localStorage.setItem(`exam_${selectedExam}_marks`, JSON.stringify(marks));
      toast.success("Marks auto-saved", { duration: 2000 });
    }
  };

  const handleSave = () => {
    if (selectedExam) {
      localStorage.setItem(`exam_${selectedExam}_marks`, JSON.stringify(marks));
      toast.success("Marks saved as draft");
    }
  };

  const handleSubmit = () => {
    // Validate all marks are entered
    const exam = upcomingExams.find((e) => e.id === selectedExam);
    const examStudents = students.filter((s) => s.class === exam.class);
    const missingMarks = examStudents.filter(
      (student) => !marks[student.id] || marks[student.id] === "",
    );

    if (missingMarks.length > 0) {
      toast.error(
        `Please enter marks for all students (${missingMarks.length} remaining)`,
      );
      return;
    }

    setIsLocked(true);
    localStorage.setItem(`exam_${selectedExam}_locked`, "true");
    localStorage.setItem(`exam_${selectedExam}_marks`, JSON.stringify(marks));

    // Here you would typically send data to backend
    console.log("Submitting marks:", marks);

    toast.success("Marks submitted successfully! Sent to admin for approval.");
  };

  const handleBulkUpload = () => {
    // This would open a file upload dialog
    toast.info("Bulk upload feature coming soon!");
  };

  const getGradeDetails = (percentage) => {
    if (percentage >= 90)
      return {
        grade: "A+",
        bgColor: "bg-emerald-600",
        textColor: "text-white",
        badgeVariant: "default",
      };
    if (percentage >= 80)
      return {
        grade: "A",
        bgColor: "bg-green-500",
        textColor: "text-white",
        badgeVariant: "default",
      };
    if (percentage >= 70)
      return {
        grade: "B",
        bgColor: "bg-blue-500",
        textColor: "text-white",
        badgeVariant: "default",
      };
    if (percentage >= 60)
      return {
        grade: "C",
        bgColor: "bg-sky-500",
        textColor: "text-white",
        badgeVariant: "default",
      };
    if (percentage >= 50)
      return {
        grade: "D",
        bgColor: "bg-amber-500",
        textColor: "text-white",
        badgeVariant: "default",
      };
    return {
      grade: "F",
      bgColor: "bg-rose-600",
      textColor: "text-white",
      badgeVariant: "destructive",
    };
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return "text-emerald-600 font-semibold";
    if (percentage >= 80) return "text-green-500 font-semibold";
    if (percentage >= 70) return "text-blue-500 font-semibold";
    if (percentage >= 60) return "text-sky-500 font-semibold";
    if (percentage >= 50) return "text-amber-500 font-semibold";
    return "text-rose-600 font-semibold";
  };

  const exam = selectedExam
    ? upcomingExams.find((e) => e.id === selectedExam)
    : null;
  const examStudents = exam
    ? students.filter((s) => s.class === exam.class)
    : [];

  if (selectedExam && exam) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => {
            setSelectedExam(null);
            setMarks({});
            setIsLocked(false);
          }}
        >
          ← Back to Exams List
        </Button>

        {/* Exam Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {exam.name} - {exam.subject}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {exam.class} • {exam.date} • {exam.totalMarks} marks
                </p>
              </div>
              {isLocked && (
                <Badge variant="secondary" className="bg-gray-500 text-white">
                  <Lock className="mr-1 h-3 w-3" />
                  Locked
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Entry Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Enter Marks</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBulkUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Upload
                </Button>
                {!isLocked && (
                  <>
                    <Button variant="outline" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleSubmit}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Submit & Lock
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="w-32">Marks Obtained</TableHead>
                    <TableHead className="w-32">Total Marks</TableHead>
                    <TableHead className="w-32">Percentage</TableHead>
                    <TableHead className="w-24">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examStudents.map((student) => {
                    // Convert marks to number for calculations
                    const marksValue = marks[student.id];
                    const obtainedMarks =
                      marksValue && marksValue !== ""
                        ? parseFloat(marksValue)
                        : null;
                    const percentage =
                      obtainedMarks !== null
                        ? (obtainedMarks / exam.totalMarks) * 100
                        : null;
                    const gradeDetails =
                      percentage !== null ? getGradeDetails(percentage) : null;

                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.rollNo}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max={exam.totalMarks}
                            value={marks[student.id] || ""}
                            onChange={(e) =>
                              handleMarkChange(student.id, e.target.value)
                            }
                            disabled={isLocked}
                            className="w-24"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>{exam.totalMarks}</TableCell>
                        <TableCell>
                          {percentage !== null ? (
                            <span className={getPercentageColor(percentage)}>
                              {percentage.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {gradeDetails ? (
                            <Badge
                              variant={gradeDetails.badgeVariant}
                              className={`${gradeDetails.bgColor} ${gradeDetails.textColor} font-medium px-3 py-1 min-w-[3rem] text-center`}
                            >
                              {gradeDetails.grade}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {!isLocked && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                💡 Tip: Use Tab key to navigate between cells. Changes are
                auto-saved every 3 seconds.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Exams & Marks
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Enter and manage examination marks
        </p>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingExams.map((exam) => {
          const savedMarks = localStorage.getItem(`exam_${exam.id}_marks`);
          const isExamLocked =
            localStorage.getItem(`exam_${exam.id}_locked`) === "true";
          const marksCount = savedMarks
            ? Object.keys(JSON.parse(savedMarks)).length
            : 0;
          const totalStudents = students.filter(
            (s) => s.class === exam.class,
          ).length;

          return (
            <Card
              key={exam.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedExam(exam.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{exam.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {exam.subject} • {exam.class}
                    </p>
                  </div>
                  <Badge
                    variant={isExamLocked ? "secondary" : "outline"}
                    className={isExamLocked ? "bg-gray-500 text-white" : ""}
                  >
                    {isExamLocked
                      ? "Locked"
                      : marksCount > 0
                        ? `${marksCount}/${totalStudents}`
                        : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {exam.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {exam.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Marks:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {exam.totalMarks}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExam(exam.id);
                  }}
                >
                  {isExamLocked
                    ? "View Marks"
                    : marksCount > 0
                      ? "Continue Entry"
                      : "Enter Marks"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

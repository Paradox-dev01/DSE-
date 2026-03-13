import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Plus,
  Upload,
  Calendar,
  CheckCircle,
  Clock,
  X,
  FileText,
} from "lucide-react";
import {
  pendingHomework as initialPendingHomework,
  homeworkSubmissions,
  students,
} from "../../lib/mock-data";
import { toast } from "sonner";

// Types
interface Homework {
  id: number;
  title: string;
  class: string;
  subject: string;
  dueDate: string;
  submitted: number;
  total: number;
  pending: number;
  description?: string;
  totalMarks?: number;
  attachments?: File[];
}

interface NewHomeworkData {
  title: string;
  description: string;
  class: string;
  subject: string;
  dueDate: string;
  totalMarks: number;
  attachments: File[];
}

export function Homework() {
  const [selectedHomework, setSelectedHomework] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [homeworkList, setHomeworkList] = useState<Homework[]>(
    initialPendingHomework,
  );
  const [newHomework, setNewHomework] = useState<NewHomeworkData>({
    title: "",
    description: "",
    class: "",
    subject: "",
    dueDate: "",
    totalMarks: 100,
    attachments: [],
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setNewHomework((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...fileArray],
      }));
      toast.success(`${fileArray.length} file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    setNewHomework((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleCreateHomework = () => {
    // Validate form
    if (
      !newHomework.title ||
      !newHomework.class ||
      !newHomework.subject ||
      !newHomework.dueDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new homework object
    const newHomeworkItem: Homework = {
      id: Date.now(), // Use timestamp as temporary ID
      title: newHomework.title,
      class: newHomework.class,
      subject: newHomework.subject,
      dueDate: new Date(newHomework.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      submitted: 0,
      total: 30, // Assuming class size of 30 students
      pending: 30,
      description: newHomework.description,
      totalMarks: newHomework.totalMarks,
      attachments: newHomework.attachments,
    };

    // Add to homework list
    setHomeworkList((prev) => [newHomeworkItem, ...prev]);

    // Show success message with file info if any
    if (newHomework.attachments.length > 0) {
      toast.success(
        `Homework created successfully! ${newHomework.attachments.length} file(s) attached.`,
      );
    } else {
      toast.success(
        "Homework created successfully! Students have been notified.",
      );
    }

    // Reset form and close dialog
    setNewHomework({
      title: "",
      description: "",
      class: "",
      subject: "",
      dueDate: "",
      totalMarks: 100,
      attachments: [],
    });
    setCreateDialogOpen(false);
  };

  const handleGradeSubmission = (studentId: number, score: number) => {
    toast.success(`Grade ${score} published successfully!`);
  };

  // Handle input changes for new homework
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewHomework((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (selectedHomework) {
    const homework = homeworkList.find((h) => h.id === selectedHomework);

    if (!homework) {
      return <div>Homework not found</div>;
    }

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={() => setSelectedHomework(null)}>
          ← Back to Homework List
        </Button>

        {/* Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {homework.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {homework.class} • {homework.subject}
                </p>
                {homework.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    {homework.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Due Date
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {homework.dueDate}
                </p>
                {homework.totalMarks && (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Total Marks
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {homework.totalMarks}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Attachments */}
            {homework.attachments && homework.attachments.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachments:
                </p>
                <div className="flex flex-wrap gap-2">
                  {homework.attachments.map((file, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-3 w-3" />
                      {file.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Submission Progress
                </span>
                <span className="text-sm font-medium">
                  {homework.submitted}/{homework.total}
                </span>
              </div>
              <Progress
                value={
                  ((homework.submitted || 0) / (homework.total || 1)) * 100
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {homeworkSubmissions.map((submission) => {
                const student = students.find(
                  (s) => s.id === submission.studentId,
                );
                return (
                  <div
                    key={submission.studentId}
                    className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={student?.avatar}
                          alt={student?.name}
                        />
                        <AvatarFallback>
                          {student?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {student?.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student?.rollNo}
                            </p>
                          </div>
                          <Badge
                            variant={
                              submission.status === "graded"
                                ? "default"
                                : submission.status === "submitted"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              submission.status === "graded"
                                ? "bg-[#16A34A]"
                                : submission.status === "submitted"
                                  ? "bg-[#2563EB]"
                                  : ""
                            }
                          >
                            {submission.status === "graded" && (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {submission.status === "submitted" && (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {submission.status === "pending" && (
                              <X className="mr-1 h-3 w-3" />
                            )}
                            {submission.status}
                          </Badge>
                        </div>
                        {submission.status !== "pending" && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Submitted: {submission.submittedAt}
                            </p>
                            {submission.files.length > 0 && (
                              <div className="mt-2">
                                {submission.files.map((file, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                  >
                                    📄 {file}
                                  </Button>
                                ))}
                              </div>
                            )}
                            {submission.status === "submitted" && (
                              <div className="mt-3 flex gap-2">
                                <Input
                                  type="number"
                                  placeholder="Score"
                                  className="w-24"
                                  max={homework.totalMarks || 100}
                                />
                                <Button
                                  size="sm"
                                  className="bg-[#16A34A]"
                                  onClick={() =>
                                    handleGradeSubmission(
                                      submission.studentId,
                                      85,
                                    )
                                  }
                                >
                                  Publish Grade
                                </Button>
                              </div>
                            )}
                            {submission.status === "graded" && (
                              <div className="mt-2">
                                <Badge className="bg-[#16A34A]">
                                  Score: {submission.score}/
                                  {homework.totalMarks || 100}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Homework & Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage homework assignments
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2563EB]">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Algebra: Linear Equations"
                  value={newHomework.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Assignment instructions and requirements..."
                  rows={4}
                  value={newHomework.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="class">Class *</Label>
                  <Input
                    id="class"
                    name="class"
                    placeholder="e.g., 7B"
                    value={newHomework.class}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g., Mathematics"
                    value={newHomework.subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={newHomework.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    placeholder="100"
                    value={newHomework.totalMarks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <Label>Attach Files</Label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    disabled={isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload Files"}
                  </Button>
                </div>

                {/* File List */}
                {newHomework.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {newHomework.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#2563EB]" onClick={handleCreateHomework}>
                  Create & Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Homework List */}
      {homeworkList.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No homework assignments yet. Create your first assignment!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {homeworkList.map((hw) => (
            <Card
              key={hw.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedHomework(hw.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{hw.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {hw.class} • {hw.subject}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Submissions
                      </span>
                      <span className="text-sm font-medium">
                        {hw.submitted}/{hw.total}
                      </span>
                    </div>
                    <Progress value={(hw.submitted / hw.total) * 100} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {hw.dueDate}</span>
                    </div>
                    {hw.pending > 0 && (
                      <Badge
                        variant="outline"
                        className="text-[#F59E0B] border-[#F59E0B]"
                      >
                        {hw.pending} pending
                      </Badge>
                    )}
                  </div>

                  {/* Show attachment indicator */}
                  {hw.attachments && hw.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FileText className="h-3 w-3" />
                      <span>{hw.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

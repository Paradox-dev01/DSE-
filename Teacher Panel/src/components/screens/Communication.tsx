import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Send,
  Paperclip,
  Mic,
  Users,
  User,
  Bell,
  X,
  File,
  FileText,
  Image,
} from "lucide-react";
import { chatMessages, students, currentTeacher } from "../../lib/mock-data";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

// Types for messages
interface Message {
  id: number;
  sender: string;
  senderType:
    | "teacher"
    | "student"
    | "parent"
    | "teacher_colleague"
    | "authority";
  message: string;
  timestamp: string;
  readBy?: number;
  avatar?: string;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

interface Student {
  id: number;
  name: string;
  avatar?: string;
  grade?: string;
  guardianName?: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  status: "online" | "offline" | "away";
  avatar?: string;
}

interface Authority {
  id: number;
  name: string;
  role: string;
  status: "online" | "offline" | "away";
  avatar?: string;
}

export function Communication() {
  const [activeTab, setActiveTab] = useState("class");
  const [message, setMessage] = useState("");
  const [selectedClass, setSelectedClass] = useState("7B");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedParent, setSelectedParent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedAuthority, setSelectedAuthority] = useState<Authority | null>(
    null,
  );
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementTarget, setAnnouncementTarget] = useState("All Classes");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // State for messages in each section
  const [classMessages, setClassMessages] = useState(chatMessages.class);
  const [studentMessages, setStudentMessages] = useState<{
    [key: number]: Message[];
  }>({});
  const [parentMessages, setParentMessages] = useState<{
    [key: string]: Message[];
  }>({
    default: chatMessages.parent,
  });
  const [teacherMessages, setTeacherMessages] = useState<{
    [key: number]: Message[];
  }>({
    1: [
      {
        id: 1,
        sender: "Prof. Michael Chen",
        senderType: "teacher_colleague",
        message: "Hi Sarah! Do you have the lab schedule for next week?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "Dr. Sarah Johnson",
        senderType: "teacher",
        message:
          "Yes! I'll share it with you in a moment. We have Lab 2 booked for Tuesday and Thursday.",
        timestamp: "10:35 AM",
      },
    ],
  });

  const [authorityMessages, setAuthorityMessages] = useState<{
    [key: number]: Message[];
  }>({
    1: [
      {
        id: 1,
        sender: "Principal Office",
        senderType: "authority",
        message:
          "Reminder: Faculty meeting scheduled for tomorrow at 3 PM in the conference room. Please confirm your attendance.",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        sender: "Dr. Sarah Johnson",
        senderType: "teacher",
        message:
          "Confirmed. I'll be there at 3 PM. Thank you for the reminder.",
        timestamp: "Yesterday",
      },
    ],
  });

  // Mock data for conversations
  const classes = [
    { id: "7B", name: "Class 7B - Mathematics", studentCount: 32 },
    { id: "8A", name: "Class 8A - Science", studentCount: 28 },
    { id: "9C", name: "Class 9C - Physics", studentCount: 30 },
  ];

  const teachers: Teacher[] = [
    { id: 1, name: "Prof. Michael Chen", subject: "Physics", status: "online" },
    { id: 2, name: "Dr. Emily Watson", subject: "Chemistry", status: "online" },
    { id: 3, name: "Mr. James Miller", subject: "English", status: "offline" },
    { id: 4, name: "Ms. Patricia Davis", subject: "History", status: "online" },
    { id: 5, name: "Dr. Robert Kumar", subject: "Biology", status: "away" },
  ];

  const authorities: Authority[] = [
    { id: 1, name: "Principal Office", role: "Principal", status: "online" },
    { id: 2, name: "Vice Principal", role: "Administration", status: "online" },
    { id: 3, name: "Academic Head", role: "Academics", status: "away" },
    { id: 4, name: "Examination Cell", role: "Examinations", status: "online" },
    {
      id: 5,
      name: "HR Department",
      role: "Human Resources",
      status: "offline",
    },
  ];

  const handleFileAttach = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*,.pdf,.doc,.docx,.txt";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      const newAttachments: Attachment[] = files.map((file, index) => ({
        id: `attach-${Date.now()}-${index}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));
      setAttachments([...attachments, ...newAttachments]);
      toast.success(`${files.length} file(s) attached successfully`);
    };
    input.click();
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.info("Recording started... Click again to stop");
    } else {
      setIsRecording(false);
      // Create a voice message attachment
      const voiceAttachment: Attachment = {
        id: `voice-${Date.now()}`,
        name: `Voice message ${new Date().toLocaleTimeString()}.webm`,
        type: "audio/webm",
        size: 0,
      };
      setAttachments([...attachments, voiceAttachment]);
      toast.success("Voice message recorded successfully");
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) {
      toast.error("Please type a message or attach a file");
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: "Dr. Sarah Johnson",
      senderType: "teacher",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      readBy: activeTab === "class" ? 0 : undefined,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    // Add message based on active tab
    switch (activeTab) {
      case "class":
        if (selectedClass) {
          setClassMessages([...classMessages, newMessage]);
          toast.success(`Message sent to Class ${selectedClass}`);
        } else {
          toast.error("Please select a class first");
          return;
        }
        break;
      case "students":
        if (selectedStudent) {
          const studentId = selectedStudent.id;
          setStudentMessages((prev) => ({
            ...prev,
            [studentId]: [...(prev[studentId] || []), newMessage],
          }));
          toast.success(`Message sent to ${selectedStudent.name}`);
        } else {
          toast.error("Please select a student first");
          return;
        }
        break;
      case "parents":
        if (selectedParent) {
          const parentId = selectedParent.id.toString();
          setParentMessages((prev) => ({
            ...prev,
            [parentId]: [...(prev[parentId] || []), newMessage],
          }));
          toast.success(`Message sent to ${selectedParent.guardianName}`);
        } else {
          toast.error("Please select a parent first");
          return;
        }
        break;
      case "teachers":
        if (selectedTeacher) {
          const teacherId = selectedTeacher.id;
          setTeacherMessages((prev) => ({
            ...prev,
            [teacherId]: [...(prev[teacherId] || []), newMessage],
          }));
          toast.success(`Message sent to ${selectedTeacher.name}`);
        } else {
          toast.error("Please select a teacher first");
          return;
        }
        break;
      case "authority":
        if (selectedAuthority) {
          const authorityId = selectedAuthority.id;
          setAuthorityMessages((prev) => ({
            ...prev,
            [authorityId]: [...(prev[authorityId] || []), newMessage],
          }));
          toast.success(`Message sent to ${selectedAuthority.name}`);
        } else {
          toast.error("Please select an authority first");
          return;
        }
        break;
    }

    setMessage("");
    setAttachments([]);
  };

  const handleSendAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }

    toast.success(`Announcement sent to ${announcementTarget}`);
    setAnnouncementTitle("");
    setAnnouncementMessage("");
    setAttachments([]);
  };

  const getCurrentMessages = (): Message[] => {
    switch (activeTab) {
      case "class":
        return classMessages;
      case "students":
        return selectedStudent ? studentMessages[selectedStudent.id] || [] : [];
      case "parents":
        return selectedParent
          ? parentMessages[selectedParent.id.toString()] || []
          : [];
      case "teachers":
        return selectedTeacher ? teacherMessages[selectedTeacher.id] || [] : [];
      case "authority":
        return selectedAuthority
          ? authorityMessages[selectedAuthority.id] || []
          : [];
      default:
        return [];
    }
  };

  const getChatTitle = () => {
    switch (activeTab) {
      case "class":
        return selectedClass
          ? `Class ${selectedClass} - Mathematics`
          : "Select a class";
      case "students":
        return selectedStudent ? selectedStudent.name : "Select a student";
      case "parents":
        return selectedParent
          ? selectedParent.guardianName || "Parent"
          : "Select a parent";
      case "teachers":
        return selectedTeacher ? selectedTeacher.name : "Select a teacher";
      case "authority":
        return selectedAuthority
          ? selectedAuthority.name
          : "Select an authority";
      case "announcements":
        return "Create Announcement";
      default:
        return "Communication Center";
    }
  };

  const getChatSubtitle = () => {
    switch (activeTab) {
      case "class":
        return selectedClass ? `${students.length} students` : "";
      case "students":
        return selectedStudent
          ? `Student • Grade ${selectedStudent.grade || "7B"}`
          : "";
      case "parents":
        return selectedParent ? `Parent of ${selectedParent.name}` : "";
      case "teachers":
        return selectedTeacher ? selectedTeacher.subject : "";
      case "authority":
        return selectedAuthority ? selectedAuthority.role : "";
      default:
        return "";
    }
  };

  const getPlaceholderText = () => {
    switch (activeTab) {
      case "class":
        return "Type a message to the class...";
      case "students":
        return selectedStudent
          ? `Message ${selectedStudent.name}...`
          : "Select a student to message";
      case "parents":
        return selectedParent
          ? `Message ${selectedParent.guardianName}...`
          : "Select a parent to message";
      case "teachers":
        return selectedTeacher
          ? `Message ${selectedTeacher.name}...`
          : "Select a teacher to message";
      case "authority":
        return selectedAuthority
          ? `Message ${selectedAuthority.name}...`
          : "Select an authority to message";
      default:
        return "Type a message...";
    }
  };

  const renderAttachmentPreview = (attachment: Attachment) => {
    const Icon = attachment.type.startsWith("image/")
      ? Image
      : attachment.type.startsWith("audio/")
        ? Mic
        : FileText;

    return (
      <div
        key={attachment.id}
        className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm truncate max-w-[150px]">
          {attachment.name}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5"
          onClick={() => removeAttachment(attachment.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  const renderMessageWithAttachments = (msg: Message) => {
    return (
      <div>
        <div>{msg.message}</div>
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {msg.attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-2 text-sm opacity-80"
              >
                {att.type.startsWith("image/") ? (
                  <div className="relative">
                    <img
                      src={att.url}
                      alt={att.name}
                      className="max-w-[200px] max-h-[150px] rounded-lg object-cover"
                    />
                  </div>
                ) : att.type.startsWith("audio/") ? (
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    <span>Voice message</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="truncate max-w-[150px]">{att.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChatArea = () => {
    const currentMessages = getCurrentMessages();
    const hasSelected =
      activeTab === "class"
        ? selectedClass
        : activeTab === "students"
          ? selectedStudent
          : activeTab === "parents"
            ? selectedParent
            : activeTab === "teachers"
              ? selectedTeacher
              : activeTab === "authority"
                ? selectedAuthority
                : null;

    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{getChatTitle()}</CardTitle>
              {getChatSubtitle() && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {getChatSubtitle()}
                </p>
              )}
            </div>
            {hasSelected && activeTab === "class" && (
              <Badge className="bg-[#16A34A]">{getChatSubtitle()}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {hasSelected ? (
            <>
              <ScrollArea className="h-96 pr-4">
                <div className="space-y-4">
                  {currentMessages.length > 0 ? (
                    currentMessages.map((msg) => {
                      const isTeacher = msg.senderType === "teacher";
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${isTeacher ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                isTeacher ? currentTeacher.avatar : undefined
                              }
                            />
                            <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex-1 ${isTeacher ? "text-right" : ""}`}
                          >
                            <div className="flex items-center gap-2 mb-1 justify-start">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {msg.sender}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {msg.timestamp}
                              </span>
                            </div>
                            <div
                              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                isTeacher
                                  ? "bg-[#2563EB] text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                              }`}
                            >
                              {renderMessageWithAttachments(msg)}
                            </div>
                            {msg.readBy !== undefined && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Read by {msg.readBy} students
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Attachments preview */}
              {attachments.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 p-2 border rounded-lg">
                  {attachments.map(renderAttachmentPreview)}
                </div>
              )}

              {/* Message Input */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFileAttach}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceRecord}
                  className={
                    isRecording ? "bg-red-100 text-red-600 animate-pulse" : ""
                  }
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder={getPlaceholderText()}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={!hasSelected}
                />
                <Button
                  className="bg-[#2563EB]"
                  onClick={handleSendMessage}
                  disabled={
                    !hasSelected ||
                    (!message.trim() && attachments.length === 0)
                  }
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <p>Select a {activeTab.slice(0, -1)} to start chatting</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Communication Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Connect with students, parents, and staff
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="class">Class</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="authority">Authority</TabsTrigger>
          <TabsTrigger value="announcements">Announce</TabsTrigger>
        </TabsList>

        {/* Class Chat */}
        <TabsContent value="class" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {classes.map((cls) => (
                    <Button
                      key={cls.id}
                      variant={selectedClass === cls.id ? "default" : "outline"}
                      className={`w-full justify-start ${selectedClass === cls.id ? "bg-[#2563EB] text-white" : ""}`}
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {cls.name}
                      <Badge
                        className={`ml-auto ${selectedClass === cls.id ? "bg-white text-[#2563EB]" : ""}`}
                      >
                        {cls.studentCount}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderChatArea()}
          </div>
        </TabsContent>

        {/* Students Chat */}
        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.map((student) => (
                    <Button
                      key={student.id}
                      variant={
                        selectedStudent?.id === student.id
                          ? "default"
                          : "outline"
                      }
                      className={`w-full justify-start ${selectedStudent?.id === student.id ? "bg-[#2563EB] text-white" : ""}`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      {student.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderChatArea()}
          </div>
        </TabsContent>

        {/* Parents Chat */}
        <TabsContent value="parents" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Parents / Guardians</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.map((student) => (
                    <Button
                      key={student.id}
                      variant={
                        selectedParent?.id === student.id
                          ? "default"
                          : "outline"
                      }
                      className={`w-full justify-start text-left ${selectedParent?.id === student.id ? "bg-[#2563EB] text-white" : ""}`}
                      onClick={() => setSelectedParent(student)}
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {student.guardianName || "Parent"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Parent of {student.name}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderChatArea()}
          </div>
        </TabsContent>

        {/* Teachers Chat */}
        <TabsContent value="teachers" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Teacher Colleagues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teachers.map((teacher) => (
                    <Button
                      key={teacher.id}
                      variant={
                        selectedTeacher?.id === teacher.id
                          ? "default"
                          : "outline"
                      }
                      className={`w-full justify-start text-left ${selectedTeacher?.id === teacher.id ? "bg-[#2563EB] text-white" : ""}`}
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {teacher.name.split(" ")[1]?.[0] || teacher.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {teacher.subject}
                        </p>
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          teacher.status === "online"
                            ? "bg-[#16A34A]"
                            : teacher.status === "away"
                              ? "bg-[#F59E0B]"
                              : "bg-gray-400"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderChatArea()}
          </div>
        </TabsContent>

        {/* Authority Chat */}
        <TabsContent value="authority" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  School Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {authorities.map((authority) => (
                    <Button
                      key={authority.id}
                      variant={
                        selectedAuthority?.id === authority.id
                          ? "default"
                          : "outline"
                      }
                      className={`w-full justify-start text-left ${selectedAuthority?.id === authority.id ? "bg-[#2563EB] text-white" : ""}`}
                      onClick={() => setSelectedAuthority(authority)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{authority.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{authority.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {authority.role}
                        </p>
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          authority.status === "online"
                            ? "bg-[#16A34A]"
                            : authority.status === "away"
                              ? "bg-[#F59E0B]"
                              : "bg-gray-400"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {renderChatArea()}
          </div>
        </TabsContent>

        {/* Announcements */}
        <TabsContent value="announcements" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Announcement</CardTitle>
                <Button
                  className="bg-[#2563EB]"
                  onClick={handleSendAnnouncement}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Send Announcement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    To
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      "All Classes",
                      "Class 7B",
                      "Class 8A",
                      "Class 9C",
                      "All Teachers",
                      "All Parents",
                    ].map((target) => (
                      <Button
                        key={target}
                        variant={
                          announcementTarget === target ? "default" : "outline"
                        }
                        onClick={() => setAnnouncementTarget(target)}
                        className={
                          announcementTarget === target ? "bg-[#2563EB]" : ""
                        }
                      >
                        {target}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Title
                  </label>
                  <Input
                    placeholder="Announcement title..."
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Type your announcement message..."
                    rows={6}
                    value={announcementMessage}
                    onChange={(e) => setAnnouncementMessage(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" onClick={handleFileAttach}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach Files
                  </Button>
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachments.map(renderAttachmentPreview)}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

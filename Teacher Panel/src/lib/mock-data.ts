// Mock data for the Teacher Panel

export const currentTeacher = {
  id: 1,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@school.edu",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  subjects: ["Mathematics", "Physics"],
  classes: ["7B", "8A", "9C"]
};

export const academicYear = "2025-2026";

export const todayClasses = [
  {
    id: 1,
    className: "Class 7B",
    subject: "Mathematics",
    period: 1,
    time: "08:00 - 08:45",
    studentCount: 32,
    room: "Room 204",
    status: "completed"
  },
  {
    id: 2,
    className: "Class 8A",
    subject: "Mathematics",
    period: 2,
    time: "08:50 - 09:35",
    studentCount: 28,
    room: "Room 204",
    status: "completed"
  },
  {
    id: 3,
    className: "Class 7B",
    subject: "Physics",
    period: 3,
    time: "10:00 - 10:45",
    studentCount: 32,
    room: "Lab 2",
    status: "active"
  },
  {
    id: 4,
    className: "Class 9C",
    subject: "Mathematics",
    period: 5,
    time: "12:00 - 12:45",
    studentCount: 30,
    room: "Room 204",
    status: "upcoming"
  },
  {
    id: 5,
    className: "Class 8A",
    subject: "Physics",
    period: 6,
    time: "12:50 - 13:35",
    studentCount: 28,
    room: "Lab 2",
    status: "upcoming"
  }
];

export const students = [
  {
    id: 1,
    name: "Emma Wilson",
    rollNo: "7B-001",
    class: "7B",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    attendance: 92,
    performance: "excellent",
    guardianName: "Michael Wilson",
    guardianPhone: "+1 234-567-8901",
    guardianEmail: "m.wilson@email.com"
  },
  {
    id: 2,
    name: "Liam Brown",
    rollNo: "7B-002",
    class: "7B",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    attendance: 88,
    performance: "good",
    guardianName: "Sarah Brown",
    guardianPhone: "+1 234-567-8902",
    guardianEmail: "s.brown@email.com"
  },
  {
    id: 3,
    name: "Olivia Davis",
    rollNo: "7B-003",
    class: "7B",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    attendance: 95,
    performance: "excellent",
    guardianName: "James Davis",
    guardianPhone: "+1 234-567-8903",
    guardianEmail: "j.davis@email.com"
  },
  {
    id: 4,
    name: "Noah Martinez",
    rollNo: "7B-004",
    class: "7B",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    attendance: 78,
    performance: "weak",
    guardianName: "Maria Martinez",
    guardianPhone: "+1 234-567-8904",
    guardianEmail: "m.martinez@email.com"
  },
  {
    id: 5,
    name: "Ava Garcia",
    rollNo: "7B-005",
    class: "7B",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    attendance: 90,
    performance: "good",
    guardianName: "Carlos Garcia",
    guardianPhone: "+1 234-567-8905",
    guardianEmail: "c.garcia@email.com"
  },
  {
    id: 6,
    name: "Ethan Anderson",
    rollNo: "8A-001",
    class: "8A",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    attendance: 85,
    performance: "good",
    guardianName: "Lisa Anderson",
    guardianPhone: "+1 234-567-8906",
    guardianEmail: "l.anderson@email.com"
  },
  {
    id: 7,
    name: "Sophia Taylor",
    rollNo: "8A-002",
    class: "8A",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
    attendance: 93,
    performance: "excellent",
    guardianName: "David Taylor",
    guardianPhone: "+1 234-567-8907",
    guardianEmail: "d.taylor@email.com"
  },
  {
    id: 8,
    name: "Mason Thomas",
    rollNo: "8A-003",
    class: "8A",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop",
    attendance: 72,
    performance: "weak",
    guardianName: "Jennifer Thomas",
    guardianPhone: "+1 234-567-8908",
    guardianEmail: "j.thomas@email.com"
  }
];

export const pendingHomework = [
  {
    id: 1,
    title: "Algebra: Linear Equations",
    class: "7B",
    subject: "Mathematics",
    dueDate: "2026-02-10",
    submitted: 28,
    total: 32,
    pending: 4
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    class: "7B",
    subject: "Physics",
    dueDate: "2026-02-09",
    submitted: 30,
    total: 32,
    pending: 2
  },
  {
    id: 3,
    title: "Quadratic Equations Practice",
    class: "8A",
    subject: "Mathematics",
    dueDate: "2026-02-11",
    submitted: 22,
    total: 28,
    pending: 6
  }
];

export const pendingMarks = [
  {
    id: 1,
    exam: "Unit Test 2 - Algebra",
    class: "7B",
    subject: "Mathematics",
    date: "2026-02-05",
    entered: 25,
    total: 32
  },
  {
    id: 2,
    exam: "Monthly Test - Mechanics",
    class: "8A",
    subject: "Physics",
    date: "2026-02-03",
    entered: 20,
    total: 28
  }
];

export const notices = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    content: "Scheduled for February 15, 2026",
    date: "2026-02-05",
    priority: "high"
  },
  {
    id: 2,
    title: "Annual Day Preparation",
    content: "Please coordinate with students for cultural activities",
    date: "2026-02-06",
    priority: "medium"
  },
  {
    id: 3,
    title: "Midterm Exam Schedule",
    content: "Exam schedule released. Check your timetable",
    date: "2026-02-07",
    priority: "high"
  }
];

export const alerts = [
  {
    id: 1,
    type: "attendance",
    student: "Noah Martinez",
    class: "7B",
    message: "Attendance dropped to 78%",
    severity: "warning"
  },
  {
    id: 2,
    type: "performance",
    student: "Mason Thomas",
    class: "8A",
    message: "Failing last 3 tests",
    severity: "danger"
  },
  {
    id: 3,
    type: "homework",
    student: "Liam Brown",
    class: "7B",
    message: "3 assignments pending",
    severity: "warning"
  }
];

export const messages = [
  {
    id: 1,
    from: "Maria Martinez",
    fromType: "parent",
    subject: "Noah's recent absence",
    preview: "Hello, I wanted to inform you about Noah's absence last week...",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    from: "Principal Office",
    fromType: "staff",
    subject: "Faculty Meeting",
    preview: "Reminder: Faculty meeting scheduled for tomorrow at 3 PM...",
    time: "5 hours ago",
    unread: true
  },
  {
    id: 3,
    from: "Sarah Brown",
    fromType: "parent",
    subject: "Thank you",
    preview: "Thank you for your support with Liam's studies...",
    time: "1 day ago",
    unread: false
  }
];

export const upcomingExams = [
  {
    id: 1,
    name: "Midterm Examination",
    subject: "Mathematics",
    class: "7B",
    date: "2026-02-20",
    duration: "2 hours",
    totalMarks: 100
  },
  {
    id: 2,
    name: "Midterm Examination",
    subject: "Physics",
    class: "7B",
    date: "2026-02-22",
    duration: "2 hours",
    totalMarks: 100
  },
  {
    id: 3,
    name: "Unit Test 3",
    subject: "Mathematics",
    class: "8A",
    date: "2026-02-15",
    duration: "1 hour",
    totalMarks: 50
  }
];

export const homeworkSubmissions = [
  {
    studentId: 1,
    studentName: "Emma Wilson",
    submittedAt: "2026-02-08 14:30",
    status: "submitted",
    files: ["algebra_homework.pdf"],
    score: null
  },
  {
    studentId: 2,
    studentName: "Liam Brown",
    submittedAt: null,
    status: "pending",
    files: [],
    score: null
  },
  {
    studentId: 3,
    studentName: "Olivia Davis",
    submittedAt: "2026-02-08 16:20",
    status: "graded",
    files: ["homework_solutions.pdf"],
    score: 95
  },
  {
    studentId: 4,
    studentName: "Noah Martinez",
    submittedAt: null,
    status: "pending",
    files: [],
    score: null
  }
];

export const attendanceRecords = [
  {
    date: "2026-02-07",
    class: "7B",
    period: 3,
    records: [
      { studentId: 1, status: "present" },
      { studentId: 2, status: "present" },
      { studentId: 3, status: "present" },
      { studentId: 4, status: "absent" },
      { studentId: 5, status: "present" }
    ]
  }
];

export const chatMessages = {
  class: [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      senderType: "teacher",
      message: "Good morning everyone! Don't forget to submit your homework by tomorrow.",
      timestamp: "2026-02-07 09:00",
      readBy: 28
    },
    {
      id: 2,
      sender: "Emma Wilson",
      senderType: "student",
      message: "Good morning ma'am! I have a doubt about question 5.",
      timestamp: "2026-02-07 09:15",
      readBy: 32
    }
  ],
  parent: [
    {
      id: 1,
      sender: "Maria Martinez",
      senderType: "parent",
      message: "Hello Dr. Johnson, Noah was sick yesterday. He'll submit the assignment today.",
      timestamp: "2026-02-06 10:30"
    },
    {
      id: 2,
      sender: "Dr. Sarah Johnson",
      senderType: "teacher",
      message: "Thank you for informing me. Please ensure he catches up on the missed class.",
      timestamp: "2026-02-06 11:00"
    }
  ]
};

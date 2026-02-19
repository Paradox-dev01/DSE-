export interface Child {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  photo: string;
  studentId: string;
}

export interface AttendanceData {
  date: string;
  status: 'present' | 'absent' | 'late';
  reason?: string;
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'late';
  attachments?: string[];
}

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  syllabus: string;
}

export interface Fee {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidAmount?: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'event' | 'emergency' | 'general';
  isRead: boolean;
  isPinned: boolean;
  attachments?: string[];
}

export interface Message {
  id: string;
  from: string;
  role: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  requiresApproval: boolean;
  status?: 'approved' | 'pending' | 'declined';
  category: string;
}

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    class: 'Grade 5-A',
    rollNumber: '15',
    photo: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop',
    studentId: 'STU2024001'
  },
  {
    id: '2',
    name: 'Oliver Johnson',
    class: 'Grade 3-B',
    rollNumber: '22',
    photo: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=200&h=200&fit=crop',
    studentId: 'STU2024002'
  }
];

export const mockAttendance: Record<string, AttendanceData[]> = {
  '1': [
    { date: '2026-02-07', status: 'present' },
    { date: '2026-02-06', status: 'present' },
    { date: '2026-02-05', status: 'present' },
    { date: '2026-02-04', status: 'present' },
    { date: '2026-02-03', status: 'absent', reason: 'Sick' },
  ]
};

export const mockHomework: Record<string, Homework[]> = {
  '1': [
    {
      id: 'hw1',
      subject: 'Mathematics',
      title: 'Chapter 5 Exercise',
      description: 'Complete questions 1-10 from the textbook',
      dueDate: '2026-02-08',
      status: 'pending'
    },
    {
      id: 'hw2',
      subject: 'English',
      title: 'Essay Writing',
      description: 'Write a 300-word essay on "My Favorite Season"',
      dueDate: '2026-02-10',
      status: 'pending'
    }
  ]
};

export const mockExams: Record<string, Exam[]> = {
  '1': [
    {
      id: 'exam1',
      subject: 'Mathematics',
      date: '2026-02-15',
      time: '9:00 AM',
      syllabus: 'Chapters 1-5'
    },
    {
      id: 'exam2',
      subject: 'Science',
      date: '2026-02-18',
      time: '10:00 AM',
      syllabus: 'Chapters 1-4'
    }
  ]
};

export const mockFees: Record<string, Fee[]> = {
  '1': [
    {
      id: 'fee1',
      type: 'Tuition Fee - February',
      amount: 1200,
      dueDate: '2026-02-10',
      status: 'pending'
    },
    {
      id: 'fee2',
      type: 'Transport Fee - February',
      amount: 300,
      dueDate: '2026-02-10',
      status: 'pending'
    },
    {
      id: 'fee3',
      type: 'Tuition Fee - January',
      amount: 1200,
      dueDate: '2026-01-10',
      status: 'paid',
      paidAmount: 1200
    }
  ]
};

export const mockNotices: Notice[] = [
  {
    id: 'notice1',
    title: 'Annual Sports Day',
    content: 'Our annual sports day will be held on February 20th. All students are expected to participate.',
    date: '2026-02-05',
    category: 'event',
    isRead: false,
    isPinned: true
  },
  {
    id: 'notice2',
    title: 'Mid-term Examination Schedule',
    content: 'Mid-term examinations will commence from February 15th. Please ensure your child is well prepared.',
    date: '2026-02-04',
    category: 'academic',
    isRead: true,
    isPinned: false
  },
  {
    id: 'notice3',
    title: 'Parent-Teacher Meeting',
    content: 'A parent-teacher meeting is scheduled for February 12th at 2:00 PM.',
    date: '2026-02-03',
    category: 'general',
    isRead: true,
    isPinned: false
  }
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg1',
      from: 'Mrs. Sarah Williams',
      role: 'Math Teacher',
      content: 'Emma is doing excellent work in class. Keep up the good work!',
      timestamp: '2026-02-06 10:30 AM',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: 'msg2',
      from: 'Mr. James Cooper',
      role: 'Class Teacher',
      content: 'Please remind Emma to bring her science project tomorrow.',
      timestamp: '2026-02-05 3:45 PM',
      isRead: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ]
};

export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Field Trip to Science Museum',
    date: '2026-02-14',
    time: '9:00 AM',
    description: 'Educational trip to the National Science Museum. Permission form required.',
    requiresApproval: true,
    status: 'pending',
    category: 'Field Trip'
  },
  {
    id: 'event2',
    title: 'Annual Sports Day',
    date: '2026-02-20',
    time: '8:00 AM',
    description: 'Annual sports event with various competitions.',
    requiresApproval: false,
    category: 'Sports'
  }
];

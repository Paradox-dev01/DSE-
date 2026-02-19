import { useState } from 'react';
import { BookOpen, FileText, Trophy, Download, MessageSquare, Mail, Phone, Book, X, MapPin } from 'lucide-react';
import { mockHomework } from '../data/mockData';

interface AcademicsProps {
  childId: string;
}

type Tab = 'subjects' | 'homework' | 'results' | 'materials' | 'authors';

const subjects = [
  { 
    id: 1, 
    name: 'Mathematics', 
    teacher: 'Mrs. Sarah Williams',
    email: 'sarah.williams@school.edu',
    phone: '+1 234-567-8901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  { 
    id: 2, 
    name: 'English', 
    teacher: 'Mr. James Cooper',
    email: 'james.cooper@school.edu',
    phone: '+1 234-567-8902',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  { 
    id: 3, 
    name: 'Science', 
    teacher: 'Dr. Emily Chen',
    email: 'emily.chen@school.edu',
    phone: '+1 234-567-8903',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  { 
    id: 4, 
    name: 'Social Studies', 
    teacher: 'Mrs. Patricia Brown',
    email: 'patricia.brown@school.edu',
    phone: '+1 234-567-8904',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop'
  }
];

const studyMaterials = [
  { id: 1, subject: 'Mathematics', title: 'Chapter 5 - Algebra Notes', type: 'PDF', date: '2026-02-05' },
  { id: 2, subject: 'Science', title: 'Physics Lab Manual', type: 'PDF', date: '2026-02-04' },
  { id: 3, subject: 'English', title: 'Grammar Workbook', type: 'PDF', date: '2026-02-03' },
];

const results = [
  { subject: 'Mathematics', test: 'Mid-term Test', score: 92, grade: 'A', date: '2026-01-25' },
  { subject: 'English', test: 'Essay Assignment', score: 88, grade: 'A-', date: '2026-01-24' },
  { subject: 'Science', test: 'Chapter Test', score: 95, grade: 'A+', date: '2026-01-23' },
  { subject: 'Social Studies', test: 'Quiz', score: 85, grade: 'B+', date: '2026-01-22' },
];

const schoolAuthorities = [
  {
    id: 1,
    name: 'Dr. Robert Mitchell',
    position: 'Principal',
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    email: 'robert.mitchell@school.edu',
    phone: '+1 234-567-8900',
    experience: '15 years',
    qualifications: 'PhD in Educational Leadership',
    office: 'Main Building, Room 101'
  },
  {
    id: 2,
    name: 'Mrs. Sarah Williams',
    position: 'Mathematics Teacher',
    department: 'Academic Staff',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    email: 'sarah.williams@school.edu',
    phone: '+1 234-567-8901',
    experience: '8 years',
    qualifications: 'M.Ed in Mathematics Education',
    office: 'Science Block, Room 205'
  },
  {
    id: 3,
    name: 'Mr. James Cooper',
    position: 'English Teacher & Class Coordinator',
    department: 'Academic Staff',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    email: 'james.cooper@school.edu',
    phone: '+1 234-567-8902',
    experience: '10 years',
    qualifications: 'M.A. in English Literature',
    office: 'Arts Block, Room 302'
  },
  {
    id: 4,
    name: 'Dr. Emily Chen',
    position: 'Science Department Head',
    department: 'Academic Staff',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    email: 'emily.chen@school.edu',
    phone: '+1 234-567-8903',
    experience: '12 years',
    qualifications: 'PhD in Biology',
    office: 'Science Block, Room 101'
  },
  {
    id: 5,
    name: 'Mrs. Patricia Brown',
    position: 'Social Studies Teacher',
    department: 'Academic Staff',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop',
    email: 'patricia.brown@school.edu',
    phone: '+1 234-567-8904',
    experience: '9 years',
    qualifications: 'M.A. in History',
    office: 'Humanities Block, Room 201'
  },
  {
    id: 6,
    name: 'Mr. David Anderson',
    position: 'Vice Principal',
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    email: 'david.anderson@school.edu',
    phone: '+1 234-567-8905',
    experience: '13 years',
    qualifications: 'M.Ed in School Administration',
    office: 'Main Building, Room 102'
  },
  {
    id: 7,
    name: 'Ms. Jennifer Taylor',
    position: 'Student Counselor',
    department: 'Student Services',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    email: 'jennifer.taylor@school.edu',
    phone: '+1 234-567-8906',
    experience: '7 years',
    qualifications: 'M.A. in Psychology',
    office: 'Student Center, Room 15'
  },
  {
    id: 8,
    name: 'Mr. Michael Johnson',
    position: 'Athletic Director',
    department: 'Sports & Activities',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    email: 'michael.johnson@school.edu',
    phone: '+1 234-567-8907',
    experience: '11 years',
    qualifications: 'B.S. in Physical Education',
    office: 'Sports Complex, Main Office'
  },
  {
    id: 9,
    name: 'Mrs. Lisa Martinez',
    position: 'Librarian',
    department: 'Library Services',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    email: 'lisa.martinez@school.edu',
    phone: '+1 234-567-8908',
    experience: '6 years',
    qualifications: 'M.L.I.S',
    office: 'Library, Main Desk'
  },
  {
    id: 10,
    name: 'Mr. Thomas Wright',
    position: 'IT Coordinator',
    department: 'Technology Services',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    email: 'thomas.wright@school.edu',
    phone: '+1 234-567-8909',
    experience: '5 years',
    qualifications: 'B.S. in Computer Science',
    office: 'IT Center, Room 5'
  }
];

export function Academics({ childId }: AcademicsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('subjects');
  const [selectedAuthority, setSelectedAuthority] = useState<any>(null);
  const homework = mockHomework[childId] || [];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'subjects', label: 'Subjects' },
    { id: 'homework', label: 'Homework' },
    { id: 'results', label: 'Results' },
    { id: 'materials', label: 'Study Materials' },
    { id: 'authors', label: 'School Authorities' },
  ];

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Administration': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Academic Staff': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Student Services': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Sports & Activities': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'Library Services': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400';
      default: return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Academics</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">Track your child's academic progress</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-600 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <img 
                  src={subject.avatar} 
                  alt={subject.teacher}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{subject.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">{subject.teacher}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                      <Mail className="w-4 h-4" />
                      <span>{subject.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                      <Phone className="w-4 h-4" />
                      <span>{subject.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                      View Materials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'homework' && (
        <div className="space-y-4">
          {homework.map((hw) => (
            <div key={hw.id} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{hw.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hw.status === 'submitted' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : hw.status === 'late' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    }`}>
                      {hw.status.charAt(0).toUpperCase() + hw.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">{hw.subject}</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-3">{hw.description}</p>
                  {hw.attachments && hw.attachments.length > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      <FileText className="w-4 h-4" />
                      <span>{hw.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Due Date</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{new Date(hw.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Excellent Performance!</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-500">Keep up the great work</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Test</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                {results.map((result, index) => (
                  <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">{result.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-500">{result.test}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">{result.score}/100</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        result.score >= 90 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : result.score >= 80 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{new Date(result.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="space-y-4">
          {studyMaterials.map((material) => (
            <div key={material.id} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{material.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-500">{material.subject}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Uploaded on {new Date(material.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'authors' && (
        <>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold">School Authorities</h2>
                <p className="text-sm opacity-90 mt-1">Meet our dedicated team of educators and administrators</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schoolAuthorities.map((authority) => (
              <div 
                key={authority.id} 
                onClick={() => setSelectedAuthority(authority)}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={authority.avatar} 
                    alt={authority.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{authority.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">{authority.position}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getDepartmentColor(authority.department)}`}>
                      {authority.department}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{authority.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                    <Phone className="w-4 h-4" />
                    <span>{authority.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-500">Experience</span>
                    <span className="font-medium text-neutral-900 dark:text-white">{authority.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Authority Detail Modal */}
          {selectedAuthority && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={selectedAuthority.avatar} 
                    alt={selectedAuthority.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{selectedAuthority.name}</h2>
                    <p className="text-neutral-600 dark:text-neutral-500 mt-1">{selectedAuthority.position}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getDepartmentColor(selectedAuthority.department)}`}>
                      {selectedAuthority.department}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedAuthority(null)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{selectedAuthority.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{selectedAuthority.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{selectedAuthority.office}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Professional Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Experience</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">{selectedAuthority.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Department</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">{selectedAuthority.department}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Qualifications</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">{selectedAuthority.qualifications}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </button>
                    <button 
                      onClick={() => setSelectedAuthority(null)}
                      className="px-4 py-3 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

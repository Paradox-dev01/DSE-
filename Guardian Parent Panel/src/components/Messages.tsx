import { useState } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';
import { mockMessages } from '../data/mockData';

interface MessagesProps {
  childId: string;
}

const conversations = [
  { 
    id: 1, 
    name: 'Mrs. Sarah Williams',
    role: 'Math Teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Emma is doing excellent work in class.',
    timestamp: '2026-02-06 10:30 AM',
    unread: true
  },
  { 
    id: 2, 
    name: 'Mr. James Cooper',
    role: 'Class Teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Please remind Emma to bring her science project tomorrow.',
    timestamp: '2026-02-05 3:45 PM',
    unread: false
  },
  { 
    id: 3, 
    name: 'Dr. Emily Chen',
    role: 'Science Teacher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Great job on the recent lab assignment!',
    timestamp: '2026-02-04 2:15 PM',
    unread: false
  }
];

export function Messages({ childId }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const messages = mockMessages[childId] || [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Mock send message
      alert('Message sent!');
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white dark:text-white">Messages</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">Communicate with teachers and staff</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          {/* Conversations List */}
          <div className="border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="font-semibold text-neutral-900 dark:text-white dark:text-white">Conversations</h2>
            </div>
            <div>
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors border-b border-neutral-100 dark:border-neutral-800 ${  // TODO: hover color
                    selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.unread && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-neutral-900"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-900 dark:text-white dark:text- truncate">{conversation.name}</h3>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{conversation.role}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-neutral-400 mt-1">{conversation.timestamp}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedConversation.avatar} 
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white dark:text-white">{selectedConversation.name}</h3>
                  <p className="text-xs text-neutral-500">{selectedConversation.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                </button>
                <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                </button>
                <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(m => m.from === selectedConversation.name)
                .map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <img 
                      src={message.avatar} 
                      alt={message.from}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-md">
                        <p className="text-sm text-neutral-900 dark:text-white dark:text-white">{message.content}</p>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 ml-2">{message.timestamp}</p>
                    </div>
                  </div>
                ))}

              {/* Sample reply */}
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-md">
                    <p className="text-sm">Thank you for the update! We'll make sure to review the homework together.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

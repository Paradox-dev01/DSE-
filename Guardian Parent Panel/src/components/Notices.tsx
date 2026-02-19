import { useState } from 'react';
import { Bell, Pin, FileText, X, Filter } from 'lucide-react';
import { mockNotices } from '../data/mockData';

type CategoryFilter = 'all' | 'academic' | 'event' | 'emergency' | 'general';

export function Notices() {
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredNotices = categoryFilter === 'all' 
    ? mockNotices 
    : mockNotices.filter(n => n.category === categoryFilter);

  const pinnedNotices = filteredNotices.filter(n => n.isPinned);
  const regularNotices = filteredNotices.filter(n => !n.isPinned);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      case 'emergency': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700 dark:text-neutral-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Notices & Announcements</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">Stay updated with school announcements</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          {(['all', 'academic', 'event', 'emergency', 'general'] as CategoryFilter[]).map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors dark:bg-neutral-800 dark:border-neutral-00 ${
                categoryFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 dark:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Pin className="w-5 h-5 text-blue-600" />
            Pinned Notices
          </h2>
          {pinnedNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Pin className="w-4 h-4 text-blue-600" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                      {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{notice.title}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 line-clamp-2">{notice.content}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">{new Date(notice.date).toLocaleDateString()}</p>
                </div>
                {!notice.isRead && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Regular Notices */}
      <div className="space-y-3">
        {pinnedNotices.length > 0 && (
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">All Notices</h2>
        )}
        {regularNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className={`bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 cursor-pointer hover:shadow-md transition-all ${
              !notice.isRead ? 'border-blue-200 dark:border-blue-500' : 'border-neutral-200 dark:border-neutral-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                    {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{notice.title}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 line-clamp-2">{notice.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{new Date(notice.date).toLocaleDateString()}</p>
                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <FileText className="w-3 h-3" />
                      <span>{notice.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
              </div>
              {!notice.isRead && (
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {selectedNotice.isPinned && <Pin className="w-5 h-5 text-blue-600" />}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedNotice.category)}`}>
                    {selectedNotice.category.charAt(0).toUpperCase() + selectedNotice.category.slice(1)}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{selectedNotice.title}</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{new Date(selectedNotice.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedNotice.content}</p>
            </div>

            {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Attachments</h3>
                <div className="space-y-2">
                  {selectedNotice.attachments.map((attachment: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Attachment {index + 1}</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

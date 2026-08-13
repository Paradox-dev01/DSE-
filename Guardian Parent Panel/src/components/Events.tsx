import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, X, AlertCircle } from 'lucide-react';
import { mockEvents } from '../data/mockData';

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const upcomingEvents = mockEvents.filter(e => new Date(e.date) >= new Date('2026-02-07'));
  const pastEvents = mockEvents.filter(e => new Date(e.date) < new Date('2026-02-07'));

  const handleApproval = (approved: boolean) => {
    alert(approved ? 'Event participation approved!' : 'Event participation declined.');
    setShowApprovalModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Events & Activities</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">View and manage school events</p>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map((event) => {
            const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date('2026-02-07').getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                    {event.requiresApproval && event.status === 'pending' && (
                      <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        Approval Required
                      </span>
                    )}
                  </div>
                  {daysUntil <= 3 && (
                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                      {daysUntil} days
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {event.requiresApproval ? (
                  event.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowApprovalModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Review & Approve
                      </button>
                    </div>
                  ) : event.status === 'approved' ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                      <X className="w-4 h-4" />
                      <span>Declined</span>
                    </div>
                  )
                ) : (
                  <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors">
                    View Details
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 opacity-75">
                <span className="px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full text-xs font-medium">
                  {event.category}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mt-3 mb-2">{event.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Approval Required</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">Please review and approve your child's participation</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">{selectedEvent.title}</h3>
              <p className="text-sm text-neutral-700 mb-4">{selectedEvent.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEvent.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-yellow-800">
                By approving, you consent to your child's participation in this event. Please ensure all required permissions and medical information are up to date.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApproval(false)}
                className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => handleApproval(true)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

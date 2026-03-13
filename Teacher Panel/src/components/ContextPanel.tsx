import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AlertCircle, AlertTriangle, Bell } from 'lucide-react';
import { notices, alerts } from '../lib/mock-data';
import { cn } from './ui/utils';

export function ContextPanel() {
  return (
    <aside className="w-80 border-l bg-gray-50 dark:bg-gray-900 dark:border-gray-800 hidden 2xl:block">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-4">
          {/* Recent Notices */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notice.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notice.content}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {notice.date}
                      </p>
                    </div>
                    <Badge
                      variant={notice.priority === 'high' ? 'destructive' : 'secondary'}
                      className="shrink-0"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    alert.severity === 'danger'
                      ? "bg-red-50 dark:bg-red-950/20 border-[#DC2626]"
                      : "bg-amber-50 dark:bg-amber-950/20 border-[#F59E0B]"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      className={cn(
                        "h-4 w-4 mt-0.5",
                        alert.severity === 'danger' ? "text-[#DC2626]" : "text-[#F59E0B]"
                      )}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {alert.student}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {alert.class} • {alert.message}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {alert.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
}
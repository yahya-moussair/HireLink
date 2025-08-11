import React from 'react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RecruiterMessagesIndex = ({ conversations = [] }) => {
  const openConversation = (userId) => {
    router.get(`/chatify/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {conversations.length === 0 ? (
              <div className="text-center text-gray-600">No conversations yet.</div>
            ) : (
              <div className="space-y-3">
                {conversations.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={c.user.avatar_url || c.user.profile_picture_url} />
                        <AvatarFallback>{c.user.name?.[0] ?? 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{c.user.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[240px]">{c.last_message}</div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => openConversation(c.user.id)}>Open</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterMessagesIndex;



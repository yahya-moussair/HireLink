import React, { useState, useEffect, useRef } from 'react';
import { router } from "@inertiajs/react";
import { 
    ArrowLeft, Send, Paperclip, Smile, MoreVertical,
    Phone, Video, Search, User, Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const RecruiterMessageShow = ({ otherUser, messages, user }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && !isSending) {
            if (!otherUser || !otherUser.id) {
                alert('User ID is missing. Cannot send message.');
                console.log('otherUser:', otherUser);
                return;
            }
            setIsSending(true);
            console.log('otherUser:', otherUser, 'otherUser.id:', otherUser.id);
            router.post(route('recruiter.messages.send', { user: otherUser.id }), {
                message: newMessage
            }, {
                onSuccess: () => {
                    setNewMessage('');
                    setIsSending(false);
                },
                onError: () => {
                    setIsSending(false);
                }
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => router.get(`/chatify/${otherUser.id}`)}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Messages
                            </Button>
                             <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={otherUser.avatar_url || otherUser.profile_picture_url} />
                                    <AvatarFallback className="bg-[#202b61] text-white">
                                        {otherUser.name?.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-lg font-semibold text-[#00193f]">{otherUser.name}</h1>
                                    <p className="text-sm text-[#202b61]">{otherUser.Specialization || 'User'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Video className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Card className="bg-white border-0 shadow-lg h-[calc(100vh-200px)]">
                    <CardContent className="p-0 h-full flex flex-col">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages && messages.length > 0 ? (
                                messages.map((message, index) => {
                                    const isOwnMessage = message.from_id === user.id;
                                    const showDate = index === 0 || 
                                        new Date(message.created_at).toDateString() !== 
                                        new Date(messages[index - 1].created_at).toDateString();
                                    return (
                                        <div key={message.id}>
                                            {showDate && (
                                                <div className="flex justify-center mb-4">
                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                                        {new Date(message.created_at).toLocaleDateString()}
                                                    </Badge>
                                                </div>
                                            )}
                                            <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                    {!isOwnMessage && (
                                                        <Avatar className="w-8 h-8 flex-shrink-0">
                                                            <AvatarImage src={otherUser.avatar_url || otherUser.profile_picture_url} />
                                                            <AvatarFallback className="bg-[#202b61] text-white text-xs">
                                                                {otherUser.name?.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div className={`rounded-lg px-4 py-2 ${
                                                        isOwnMessage 
                                                            ? 'bg-[#202b61] text-white' 
                                                            : 'bg-gray-100 text-gray-900'
                                                    }`}>
                                                        <p className="text-sm">{message.body}</p>
                                                        <div className={`flex items-center mt-1 text-xs ${
                                                            isOwnMessage ? 'text-gray-200' : 'text-gray-500'
                                                        }`}>
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {formatTime(message.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <User className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-[#00193f] mb-2">Start a conversation</h3>
                                        <p className="text-gray-600">Send a message to begin chatting with {otherUser.name}</p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex items-end space-x-3">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Smile className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim() || isSending}
                                        className="bg-[#202b61] hover:bg-[#2980d1] text-white"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RecruiterMessageShow;

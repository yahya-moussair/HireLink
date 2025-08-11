import React, { useState } from 'react';
import { 
    MessageSquare, Search, Send, MoreVertical, Phone, Video,
    Paperclip, Smile, Send as SendIcon, User, Building, Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const MessagesIndex = ({ conversations, currentUser }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageText, setMessageText] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, unread, recruiters

    const filteredConversations = conversations?.filter(conv => {
        if (searchTerm && !conv.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (activeTab === 'unread' && !conv.unread) return false;
        if (activeTab === 'recruiters' && conv.type !== 'recruiter') return false;
        return true;
    }) || [];

    const handleSendMessage = () => {
        if (messageText.trim() && selectedConversation) {
            console.log('Sending message:', messageText, 'to:', selectedConversation.id);
            setMessageText('');
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
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <img src='/images/logo.png' alt="HireLink Logo" className="w-40"/>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2980d1] focus:border-transparent w-80"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-[#00193f] hover:text-[#2980d1]">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                New Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
                    {/* Left Sidebar - Conversations List */}
                    <div className="lg:col-span-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Conversations</CardTitle>
                                <div className="space-y-3">
                                    <Input
                                        placeholder="Search conversations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full"
                                    />
                                    
                                    {/* Tabs */}
                                    <div className="flex space-x-1">
                                        <Button
                                            variant={activeTab === 'all' ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setActiveTab('all')}
                                            className="flex-1"
                                        >
                                            All
                                        </Button>
                                        <Button
                                            variant={activeTab === 'unread' ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setActiveTab('unread')}
                                            className="flex-1"
                                        >
                                            Unread
                                        </Button>
                                        <Button
                                            variant={activeTab === 'recruiters' ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setActiveTab('recruiters')}
                                            className="flex-1"
                                        >
                                            Recruiters
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                                    {filteredConversations.map((conversation) => (
                                        <div
                                            key={conversation.id}
                                            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                            }`}
                                            onClick={() => setSelectedConversation(conversation)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                                                    <AvatarFallback>
                                                        {conversation.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className={`text-sm font-medium truncate ${
                                                            conversation.unread ? 'text-gray-900' : 'text-gray-700'
                                                        }`}>
                                                            {conversation.name}
                                                        </p>
                                                        <span className="text-xs text-gray-500">
                                                            {formatTime(conversation.last_message_at)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {conversation.last_message}
                                                        </p>
                                                        {conversation.unread && (
                                                            <Badge variant="secondary" className="ml-auto">
                                                                {conversation.unread_count}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {conversation.type === 'recruiter' && (
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <Building className="h-3 w-3 text-blue-500" />
                                                            <span className="text-xs text-blue-600">Recruiter</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Chat Area */}
                    <div className="lg:col-span-3">
                        <Card className="h-full flex flex-col">
                            {selectedConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <CardHeader className="border-b">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                                                    <AvatarFallback>
                                                        {selectedConversation.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                                                    <p className="text-sm text-gray-600">
                                                        {selectedConversation.type === 'recruiter' ? 'Recruiter' : 'User'}
                                                        {selectedConversation.online && (
                                                            <span className="ml-2 text-green-600">• Online</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
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
                                    </CardHeader>

                                    {/* Messages Area */}
                                    <CardContent className="flex-1 p-0">
                                        <div className="h-full flex flex-col">
                                            {/* Messages List */}
                                            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                                {selectedConversation.messages?.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex ${message.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                                                    >
                                                        <div className={`max-w-xs lg:max-w-md ${
                                                            message.sender_id === currentUser?.id ? 'order-2' : 'order-1'
                                                        }`}>
                                                            <div className={`rounded-lg px-3 py-2 ${
                                                                message.sender_id === currentUser?.id
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-gray-100 text-gray-900'
                                                            }`}>
                                                                <p className="text-sm">{message.content}</p>
                                                                <p className={`text-xs mt-1 ${
                                                                    message.sender_id === currentUser?.id
                                                                        ? 'text-blue-100'
                                                                        : 'text-gray-500'
                                                                }`}>
                                                                    {formatTime(message.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {message.sender_id !== currentUser?.id && (
                                                            <Avatar className="w-6 h-6 ml-2 order-2">
                                                                <AvatarImage src={selectedConversation.avatar} />
                                                                <AvatarFallback className="text-xs">
                                                                    {selectedConversation.name.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Message Input */}
                                            <div className="border-t p-4">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Paperclip className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Smile className="h-4 w-4" />
                                                    </Button>
                                                    <Input
                                                        placeholder="Type a message..."
                                                        value={messageText}
                                                        onChange={(e) => setMessageText(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        className="flex-1"
                                                    />
                                                    <Button 
                                                        onClick={handleSendMessage}
                                                        disabled={!messageText.trim()}
                                                        size="sm"
                                                    >
                                                        <SendIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <CardContent className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                                        <p className="text-gray-600">
                                            Choose a conversation from the list to start messaging
                                        </p>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesIndex;

import React, { useState } from 'react';
import { UserIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const usersData = [
    { id: 1, name: 'Alice', avatar: '', lastMessage: 'See you soon!', lastMessageTime: '10:30 AM' },
    { id: 2, name: 'Bob', avatar: '', lastMessage: 'Thanks!', lastMessageTime: '10:28 AM' },
    { id: 3, name: 'Charlie', avatar: '', lastMessage: 'Let me know.', lastMessageTime: '10:25 AM' },
];

const messagesData = {
    1: [
        { sender: 'Alice', text: 'Hi there!', time: '10:00 AM' },
        { sender: 'You', text: 'Hello Alice!', time: '10:01 AM' },
        { sender: 'Alice', text: 'See you soon!', time: '10:30 AM' },
    ],
    2: [
        { sender: 'Bob', text: 'Hey!', time: '10:20 AM' },
        { sender: 'You', text: 'Hi Bob!', time: '10:21 AM' },
        { sender: 'Bob', text: 'Thanks!', time: '10:28 AM' },
    ],
    3: [
        { sender: 'Charlie', text: 'Let me know.', time: '10:25 AM' },
    ],
};

function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(usersData[0]);
    const [messages, setMessages] = useState(messagesData[selectedUser.id]);
    const [input, setInput] = useState('');

    React.useEffect(() => {
        setMessages(messagesData[selectedUser.id]);
    }, [selectedUser]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { sender: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-80 bg-white flex flex-col">
                <div className="p-6 bg-gradient-to-r border-r-[1px] border-r-white from-[#ad46ff] to-[#ad46ff]">
                    <h2 className="text-2xl font-bold text-white">Chats</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {usersData.map(user => (
                        <div
                            key={user.id}
                            className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-purple-100 transition ${selectedUser.id === user.id ? 'bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 shadow-lg border-l-4 border-[#ad46ff]' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <UserIcon className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-800 truncate">{user.name}</div>
                                <div className="text-gray-500 text-sm truncate">{user.lastMessage}</div>
                            </div>
                            <div className="text-xs text-gray-400">{user.lastMessageTime}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                <div className="p-5 bg-gradient-to-r from-[#ad46ff] to-[#ad46ff]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {selectedUser.avatar ? (
                                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <UserIcon className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                        <div>
                            <div className="font-semibold text-white">{selectedUser.name}</div>
                            <div className="text-xs text-white">Online</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50" style={{ backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png")', backgroundRepeat: 'repeat', backgroundSize: 'auto' }}>
                    {messages && messages.length > 0 ? (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${msg.sender === 'You' ? 'bg-[#ad46ff] text-white' : 'bg-white text-gray-800 border border-[#ad46ff]'}`}>
                                    <div>{msg.text}</div>
                                    <div className={`text-xs ${msg.sender === 'You' ? 'text-white' : 'text-gray-400'} mt-1 text-right`}>{msg.time}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400">No messages yet.</div>
                    )}
                </div>
                {/* Input Area */}
                <div className="p-4 bg-white flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type your message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                    />
                    <button
                        className="bg-[#ad46ff] hover:bg-[#9c3de6] text-white rounded-full p-2 transition"
                        onClick={handleSend}
                    >
                        {/* Fix icon direction: remove rotate-90 */}
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage; 
'use client';

import { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Sparkles, User } from 'lucide-react';

const mockChats = [
  { 
    id: 1, 
    name: 'Alice Freeman', 
    lastMsg: 'Where is my order? It was supposed to...', 
    time: '2m ago', 
    type: 'Complaint', 
    unread: true,
    history: [
      { sender: 'user', text: 'Hi, I ordered the premium coffee bean package 3 days ago.' },
      { sender: 'user', text: 'Where is my order? It was supposed to arrive yesterday.' }
    ],
    aiDraft: "Hi Alice, I apologize for the delay. I've checked your order #4492 and it is out for delivery today. You should receive it by 5 PM."
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    lastMsg: 'Do you have bulk discounts?', 
    time: '1h ago', 
    type: 'Inquiry', 
    unread: false,
    history: [
      { sender: 'user', text: 'Hello, I run a local cafe.' },
      { sender: 'user', text: 'Do you have bulk discounts if I buy 50kg?' }
    ],
    aiDraft: "Hi Bob! Yes, we love supporting local cafes. For orders over 20kg, we offer a 15% discount. Would you like me to send you a quote?"
  },
  { 
    id: 3, 
    name: 'Charlie Davis', 
    lastMsg: 'Thanks for the quick help!', 
    time: '1d ago', 
    type: 'Resolved', 
    unread: false,
    history: [
      { sender: 'user', text: 'My discount code is not working.' },
      { sender: 'me', text: 'I fixed it for you, try SAVE20 now.' },
      { sender: 'user', text: 'Thanks for the quick help!' }
    ],
    aiDraft: "You're welcome, Charlie! Enjoy your coffee."
  },
];

export default function ChatWindow() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [inputText, setInputText] = useState('');

  const loadAiDraft = () => {
    setInputText(selectedChat.aiDraft);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex h-[600px] overflow-hidden">
      
      {/* LEFT: Sidebar List */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                setInputText('');
              }}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-white transition ${selectedChat.id === chat.id ? 'bg-white border-l-4 border-l-blue-600 shadow-sm' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-sm ${selectedChat.id === chat.id ? 'text-blue-900' : 'text-slate-700'}`}>{chat.name}</h4>
                <span className="text-xs text-slate-400">{chat.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate mb-2">{chat.lastMsg}</p>
              
              {/* Intent Badge */}
              <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                chat.type === 'Complaint' ? 'bg-red-100 text-red-600' :
                chat.type === 'Inquiry' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {chat.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {selectedChat.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{selectedChat.name}</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">● Online via WhatsApp</p>
            </div>
          </div>
          <div className="flex gap-4 text-slate-400">
            <Phone size={20} className="hover:text-blue-600 cursor-pointer" />
            <Video size={20} className="hover:text-blue-600 cursor-pointer" />
            <MoreVertical size={20} className="hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {selectedChat.history.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                 msg.sender === 'me' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
               }`}>
                 {msg.text}
               </div>
            </div>
          ))}
          
          {/* AI Suggestion Box */}
          {selectedChat.type !== 'Resolved' && inputText === '' && (
            <div className="flex justify-start">
               <div className="max-w-[80%] bg-purple-50 border border-purple-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold text-xs uppercase tracking-wide">
                   <Sparkles size={14} /> AI Suggestion
                 </div>
                 <p className="text-slate-600 text-sm mb-3 italic">"{selectedChat.aiDraft}"</p>
                 <button 
                   onClick={loadAiDraft}
                   className="text-xs bg-purple-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                 >
                   Use this reply
                 </button>
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
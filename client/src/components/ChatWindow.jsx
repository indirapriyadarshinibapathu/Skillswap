import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'mentor', text: 'Hey Priya! Ready for today’s session?' },
    { id: 2, sender: 'user', text: 'Hi! Yes, ready with my React doubts.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl h-[500px] flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
        <span className="font-semibold text-sm text-gray-900">Live Chat</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-200 text-xs p-2.5 rounded-lg focus:outline-none focus:border-indigo-600"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
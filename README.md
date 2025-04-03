# Socket.io Chat

## Summary
This is a simple program that allows user to create a server, and others can join as clients and chat with each other.

## Author
Lang Min

## Working Files
- ./server/index.js
- ./src/main.jsx
- ./src/App.jsx
- ./src/App.css
- ./components/Chat.jsx
- ./index.html

## How To Run
To run the program, clone the project first. <br>
In the project terminal, run
```bash
npm install
```
To run the server, run
```bash
cd server
node index.js
```
To run the client, run
```bash
cd ..
npm run dev
```

## Creative Addition
I added a auto-scroll feature to the client side (Chat.jsx). Now, when the window is full and new message comes in, the window scroll automatically to the new message.

## Video
[Watch on YouTube](https://youtu.be/qFv8DwqfDK4)

## Gen AI Usage
### Usage 1
I asked ChatGPT 4o to provide an example of client side based on my code from the tutorial. I referred and modified the answer. <br>
Prompt: Can you modify the html file so that they fit into a React project? <br>
Answer: 
```javascript
// src/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
const socket = io(); // Assumes server is running on same origin
function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [clientInfo, setClientInfo] = useState({ id: '', ip: '' });
  const messagesEndRef = useRef(null);
  useEffect(() => {
    socket.on('your info', (data) => {
      setClientInfo(data);
      setMessages((msgs) => [...msgs, `You are connected as ${data.id} (${data.ip})`]);
    });
    socket.on('chat message', (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });
    return () => {
      socket.off('your info');
      socket.off('chat message');
    };
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    }
  };
  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Socket.IO Chat</h2>
      <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
      </form>
    </div>
  );
}
export default Chat;
```

### Usage 2
I asked Claude 3.7 Sonnet what is the structure if I convert my code to a React + Vite project. I used this answer.
Prompt: Suppose I want to transfer these two files so that they fit into a React + Vite project with JavaScript. Where do I put the client <script>? <br>
Answer: 
```
my-chat-app/
├── src/
│   ├── components/
│   │   └── Chat.jsx       # Your chat component
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Entry point
├── server/
│   └── index.js           # Your Socket.IO server code
└── index.html             # Vite's HTML template
```
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('your info', (data) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    }
  };

  // Auto-scroll to the bottom when new messages arrive (creative addition)
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <>
      <ul id="messages">
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default Chat;
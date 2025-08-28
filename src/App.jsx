import { useState, useEffect, useRef } from 'react'
import './App.css'

// Message component to display individual messages
function Message({ message, isOwn }) {
  return (
    <div className={`message ${isOwn ? 'message-own' : 'message-other'}`}>
      <div className="message-header">
        <span className="message-username">{message.username}</span>
        <span className="message-time">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  )
}

// Message input component
function MessageInput({ onSendMessage, currentUser }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

// User login component
function UserLogin({ onLogin }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
    }
  }

  return (
    <div className="login-container">
      <h1>Welcome to Chat App</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          className="login-input"
        />
        <button type="submit" className="login-button">
          Join Chat
        </button>
      </form>
    </div>
  )
}

// Online users component
function OnlineUsers({ users, currentUser }) {
  return (
    <div className="online-users">
      <h3>Online Users ({users.length})</h3>
      <ul>
        {users.map(user => (
          <li key={user} className={user === currentUser ? 'current-user' : ''}>
            {user} {user === currentUser && '(you)'}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Main chat component
function ChatApp({ currentUser, onLogout }) {
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([currentUser])
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  // Simulate other users joining/leaving
  useEffect(() => {
    const simulateUsers = () => {
      const possibleUsers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
      const activeUsers = [currentUser]
      
      // Randomly add 1-3 other users
      const numOtherUsers = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < numOtherUsers; i++) {
        const availableUsers = possibleUsers.filter(user => !activeUsers.includes(user))
        if (availableUsers.length > 0) {
          const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)]
          activeUsers.push(randomUser)
        }
      }
      
      setOnlineUsers(activeUsers)
    }

    simulateUsers()
    
    // Simulate users joining/leaving every 30 seconds
    const interval = setInterval(simulateUsers, 30000)
    return () => clearInterval(interval)
  }, [currentUser])

  // Simulate receiving messages from other users
  useEffect(() => {
    const simulateIncomingMessages = () => {
      const otherUsers = onlineUsers.filter(user => user !== currentUser)
      if (otherUsers.length === 0) return

      const sampleMessages = [
        "Hello everyone! 👋",
        "How's it going?",
        "Anyone working on anything interesting?",
        "Great to see everyone here!",
        "What do you think about this?",
        "I agree with that point",
        "That's a good idea!",
        "Thanks for sharing!"
      ]

      // Randomly send a message from another user every 15-45 seconds
      const randomDelay = Math.random() * 30000 + 15000
      
      setTimeout(() => {
        const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)]
        const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)]
        
        const newMessage = {
          id: Date.now() + Math.random(),
          content: randomMessage,
          username: randomUser,
          timestamp: new Date().toLocaleTimeString()
        }
        
        setMessages(prev => [...prev, newMessage])
      }, randomDelay)
    }

    if (onlineUsers.length > 1) {
      simulateIncomingMessages()
    }
  }, [onlineUsers, currentUser, messages.length])

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      content,
      username: currentUser,
      timestamp: new Date().toLocaleTimeString()
    }
    
    setMessages(prev => [...prev, newMessage])
  }

  const handleClearMessages = () => {
    setMessages([])
    localStorage.removeItem('chatMessages')
  }

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h1>Chat App</h1>
        <div className="header-actions">
          <button onClick={handleClearMessages} className="clear-button">
            Clear Chat
          </button>
          <button onClick={onLogout} className="logout-button">
            Logout ({currentUser})
          </button>
        </div>
      </div>
      
      <div className="chat-main">
        <div className="chat-sidebar">
          <OnlineUsers users={onlineUsers} currentUser={currentUser} />
        </div>
        
        <div className="chat-content">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>No messages yet. Start the conversation! 💬</p>
              </div>
            ) : (
              messages.map(message => (
                <Message
                  key={message.id}
                  message={message}
                  isOwn={message.username === currentUser}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <MessageInput onSendMessage={handleSendMessage} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // Check for saved user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser')
    if (savedUser) {
      setCurrentUser(savedUser)
    }
  }, [])

  const handleLogin = (username) => {
    setCurrentUser(username)
    localStorage.setItem('chatUser', username)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('chatUser')
  }

  if (!currentUser) {
    return <UserLogin onLogin={handleLogin} />
  }

  return <ChatApp currentUser={currentUser} onLogout={handleLogout} />
}

export default App

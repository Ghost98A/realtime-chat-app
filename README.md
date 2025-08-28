# Realtime Chat App

A modern real-time chat application built with React and Vite. This app features a clean, responsive interface with simulated real-time messaging functionality.

## Features

- 🚀 **User Authentication**: Simple username-based login system
- 💬 **Real-time Messaging**: Simulated real-time chat with other users
- 👥 **Online Users**: Display of currently online users
- 💾 **Message Persistence**: Messages are saved to localStorage
- 📱 **Responsive Design**: Mobile-friendly interface
- ✨ **Modern UI**: Clean, modern design with animations
- 🔄 **Auto-scroll**: Automatically scrolls to latest messages

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

1. **Login**: Enter a username to join the chat
2. **Send Messages**: Type your message and press Enter or click Send
3. **View Online Users**: See who's currently online in the sidebar
4. **Clear Chat**: Use the Clear Chat button to remove all messages
5. **Logout**: Click the Logout button to return to the login screen

## Technical Features

- **React Hooks**: Uses modern React hooks for state management
- **localStorage**: Persists user data and chat messages
- **Responsive CSS**: Mobile-first responsive design
- **Simulated Real-time**: Mimics real-time chat with automated responses
- **Auto-positioning**: Messages automatically scroll to bottom

## Architecture

The app is structured with the following main components:

- `App.jsx` - Main application component with routing logic
- `UserLogin` - Login interface component
- `ChatApp` - Main chat interface
- `Message` - Individual message display component
- `MessageInput` - Message composition component
- `OnlineUsers` - Online users sidebar component

## Customization

You can easily customize the app by:

- Modifying the color scheme in `App.css`
- Adding new simulated users in the `possibleUsers` array
- Changing the message simulation timing and frequency
- Adding new features like emoji support, file uploads, etc.

## Future Enhancements

This app could be extended with:

- Real WebSocket connections for true real-time messaging
- User avatars and profiles
- Message reactions and threading
- File and image sharing
- Private messaging
- Chat rooms and channels
- Message encryption

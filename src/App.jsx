import { HubConnectionBuilder } from '@microsoft/signalr'
import React from "react";
import Header from './components/Header/Header'
import WaitingRoom from './components/WaitingRoom/WaitingRoom'
import { useState, useEffect } from 'react'
import Chat from './components/Chat/Chat'
import Register from './components/Authorization/Register/Register';
import {
    getChats,
    createChat,
    deleteChat
} from "./api/chatService";
import Login from './components/Authorization/Login/Login';

export default function App() {
  const [connection, setConnection] = useState(null)
  const [chatName, setChatName] = useState('')
  const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [user, setUser] = useState({ name: '' })

  useEffect(() => {
    loadChats();
}, []);

async function loadChats() {
    setLoadingChats(true);

    try {
        const result = await getChats();
        console.log(result);
        setChats(result.chats ?? result);
    }
    finally {
        setLoadingChats(false);
    }
}

async function handleCreateChat() {
    const name = prompt("Chat name");

    if (!name)
        return;

    await createChat(name);

    await loadChats();
}

async function handleDeleteChat(id) {
    if (!window.confirm("Delete this chat?"))
        return;

    await deleteChat(id);

    await loadChats();
}

  const joinChat = async (userName, chatName) => {
    var connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5102/chat')
      .withAutomaticReconnect()
      .build()

    connection.on('ReceiveMessageAsync', (userName, message) => {
      setMessages((messages) => [
        ...messages,
        { userName, message, isAdmin: false, isResponder: userName === user.name},
      ])
    })

    connection.on('ReceiveAdminMessageAsync', (userName, message) => {
      setMessages((messages) => [
        ...messages,
        { userName, message, isAdmin: true },
      ])
    })
    try {
      await connection.start()
      await connection.invoke('JoinChatAsync', { userName, chatName })

      setConnection(connection)
      setChatName(chatName)
      setUser({ ...user, name: userName })
    } catch (error) {
      console.log(error)
    }
  }

  const closeChat = async () => {
    connection.stop()
    setConnection(null)
    setMessages([])
    setChatName('')
  }
  // TODO: add router
  return (
    <>
      <Header />
      <main>
        <button onClick={handleCreateChat}>
            Create chat
          </button>

          {loadingChats && <p>Loading chats...</p>}

        <ul>
          {chats.map(chat => (
            <li key={chat.id}>
              <strong>{chat.name}</strong>

              <button
                onClick={() => handleDeleteChat(chat.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {connection ? (
          <Chat
            messages={messages}
            chatName={chatName}
            closeChat={closeChat}
            sendMessage={sendMessage}
          />
        ) : (
          <WaitingRoom joinChat={joinChat}/>
        )}
        { <hr/> }
        { <Register/> }
        { <Login/> }
      </main>
    </>
  )
}

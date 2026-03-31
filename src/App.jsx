import { HubConnectionBuilder } from '@microsoft/signalr'
import React from "react";
import Header from './components/Header/Header'
import WaitingRoom from './components/WaitingRoom/WaitingRoom'
import { useState } from 'react'
import Chat from './components/Chat/Chat'
import Register from './components/Authorization/Register/Register';

export default function App() {
  const [connection, setConnection] = useState(null)
  const [chatName, setChatName] = useState('')
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState({ name: '' })

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

  const sendMessage = (message) => {
     connection.invoke('SendMessageAsync', message)
  }

  const closeChat = async () => {
    connection.stop()
    setConnection(null)
    setMessages([])
    setChatName('')
  }
  return (
    <>
      <Header />
      <main>
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
      </main>
    </>
  )
}

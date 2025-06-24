import { HubConnectionBuilder } from '@microsoft/signalr'
import React from "react";
import Header from './components/Header/Header'
import WaitingRoom from './components/WaitingRoom/WaitingRoom'
import { useState } from 'react'
import Chat from './components/Chat/Chat'
import axios from 'axios';
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

    connection.on('ReceiveMessage', (userName, message) => {
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
    axios
      .post(`//localhost:5102/api/chats/f1cd55ab-ff61-4537-bd58-c6e9f9c1b637:post-message`, {
        authorId: '82c28ae8-19e1-4bc4-9ef1-1f4bf5aab753',
        content: message
      })
      .then((response) => {
        console.log(response.data);
      });
    // connection.invoke('SendMessageAsync', message)
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
        {/* {connection ? (
          <Chat
            messages={messages}
            chatName={chatName}
            closeChat={closeChat}
            sendMessage={sendMessage}
          />
        ) : (
          <WaitingRoom joinChat={joinChat}/>
        )} */}
        {/* <br /><hr /><br /> */}
        <Register/>
      </main>
    </>
  )
}

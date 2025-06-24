import classes from './Chat.module.css'
import Button from '../UI/button/Button/Button'
import ChatMessage from '../ChatMessage/ChatMessage'
import ChatAdminMessage from '../ChatAdminMessage/ChatAdminMessage'
import DefaultInput from '../UI/input/DefaultInput/DefaultInput'
import { useEffect, useRef, useState } from 'react'

function Chat({ messages, chatName, closeChat, sendMessage }) {
  const [message, setMessage] = useState('')
  const messageEndRef = useRef()

  useEffect(() => {
    messageEndRef.current.scrollIntoView()
  }, [messages])

  const onSendMessage = () => {
    sendMessage(message)
    setMessage('')
  }

  return (
    <div className={classes.chat}>
      <div className={classes.chatHeader}>
        <h2>{chatName}</h2>
        <Button onClick={closeChat}>Выйти</Button>
      </div>
      <div className={classes.chatBody}>
        <div className={classes.chatMessagesArea}>
          {messages.map((messageInfo, index) =>
            messageInfo.isAdmin ? (
              <ChatAdminMessage messageInfo={messageInfo} key={index} />
            ) : (
              <ChatMessage messageInfo={messageInfo} key={index} />
            )
          )}
          <span ref={messageEndRef} />
        </div>
        <div className={classes.chatMessageWrite}>
          <Button style={{ fontSize: '13px' }} onClick={onSendMessage}>
            Отправить
          </Button>
          <DefaultInput
            value={message}
            onKeyDown={(e) =>
              e.key == 'Enter' ? onSendMessage(e.target.value) : null
            }
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Введите сообщение'
          />
        </div>
      </div>
    </div>
  )
}

export default Chat

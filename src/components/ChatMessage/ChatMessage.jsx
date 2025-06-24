import classes from './ChatMessage.module.css'

function ChatMessage({ messageInfo }) {
  return (
    <div className={classes.messageContainer}>
      <span className={classes.userName}>{messageInfo.userName}</span>
      <div className={classes.messageBody}>{messageInfo.message}</div>
    </div>
  )
}

export default ChatMessage

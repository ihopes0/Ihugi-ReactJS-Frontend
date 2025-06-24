import classes from './ChatAdminMessage.module.css'

function ChatAdminMessage({ messageInfo }) {
  return (
    <div className={classes.messageContainer}>
      <span className={classes.userName}>{messageInfo.userName}</span>
      <div className={classes.messageBody}>{messageInfo.message}</div>
    </div>
  )
}

export default ChatAdminMessage

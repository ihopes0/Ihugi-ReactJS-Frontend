import classes from './WaitingRoom.module.css'
import DefaultInput from '../UI/input/DefaultInput/DefaultInput'
import Button from '../UI/button/Button/Button'
import useInput from '../../hooks/useInput'

export default function WaitingRoom({ joinChat }) {
  const inputUserName = useInput()
  const inputChatName = useInput()

  const onSubmit = (e) => {
    e.preventDefault()
    joinChat(inputUserName.value, inputChatName.value)
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <h2>Онлайн чат</h2>

      <div className={classes.textFieldContainer}>
        <div className={classes.textField}>
          <label htmlFor='userName'>Имя пользователя</label>
          <DefaultInput
            name='userName'
            placeholder='Введите ваше имя'
            {...inputUserName}
          />
        </div>

        <div className={classes.textField}>
          <label htmlFor='chatName'>Название чата</label>
          <DefaultInput
            name='chatName'
            placeholder='Введите имя чата'
            {...inputChatName}
          />
        </div>
      </div>

      <Button
        isActive={inputChatName.value && inputUserName.value}
        disabled={!inputChatName.value || !inputUserName.value}
        type='submit'
      >
        Присоединиться
      </Button>
    </form>
  )
}

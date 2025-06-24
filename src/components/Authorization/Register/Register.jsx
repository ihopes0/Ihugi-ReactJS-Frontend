import { useRef, useState, useEffect } from 'react'
import DefaultInput from '../../UI/input/DefaultInput/DefaultInput'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../UI/button/Button/Button'
import classes from './Register.module.css'
import axios from '../../../api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%$]).{8,24}$/
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const REGISTER_URL = '/api/users'

function Register() {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // поставить фокус при загрузке страницы
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // валидация имени пользователя
  useEffect(() => {
    const isValidUsername = USER_REGEX.test(user)
    console.log(isValidUsername)
    console.log(user)
    setValidName(isValidUsername)
  }, [user])

  useEffect(() => {
    const isValidPwd = PWD_REGEX.test(pwd)
    console.log(isValidPwd)
    console.log(pwd)
    setValidPwd(isValidPwd)
    const isMatch = pwd === matchPwd
    setValidMatch(isMatch)
  }, [pwd, matchPwd])

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(email)
    console.log(isValidEmail)
    console.log(email)
    setValidEmail(isValidEmail)
  }, [email]);

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // если кнопка была активирована через js
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    const v3 = EMAIL_REGEX.test(email)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ Name: user, Password: pwd, Email: email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(response.data)
      setSuccess(true)
    } catch (error) {}
  }

  return (
    <>
      {success ? (
        <section className={classes.form}>
          <h2>Успех</h2>
          <p>
            <a href='#'>Войти в аккаунт</a>
          </p>
        </section>
      ) : (
        <section className={classes.form}>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <div className={classes.textFieldContainer}>
              <div className={classes.textField}>
                <label htmlFor='username'>
                  Имя пользователя:
                  <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <DefaultInput
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id='uidnote'
                  className={
                    userFocus && user && !validName
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Имя пользователя: <br />
                  - должно содержать от 4 до 24 знаков <br />
                  - должно начинаться с буквы <br />- может иметь дефис или
                  подчеркивание
                </p>
              </div>
            </div>
            <div className={classes.textFieldContainer}>
              <div className={classes.textField}>
                <label htmlFor='email'>
                  Электронная почта:
                  <span className={validEmail ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validEmail || !email ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <DefaultInput
                  id='email'
                  autoComplete='off'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby='emailnote'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id='emailnote'
                  className={
                    emailFocus && !validEmail && false
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Мыло
                </p>
              </div>
            </div>
            <div className={classes.textFieldContainer}>
              <div className={classes.textField}>
                <label htmlFor='password'>
                  Пароль:
                  <span className={validPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <DefaultInput
                  type='password'
                  id='password'
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id='pwdnote'
                  className={
                    pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Пароль должен: <br />
                  - содержать от 8 до 24 знаков <br />
                  - содержать в себе хотя бы 1 прописную и одну строчную букву,
                  а также одну цифру и специальный знак <br />- разрешенные
                  специальные знаки:
                  <span aria-label='восклицательный знак'>!</span>
                  <span aria-label='собака'>@</span>
                  <span aria-label='решетка'>#</span>
                  <span aria-label='процент'>%</span>
                  <span aria-label='знак доллара'>$</span>
                </p>
              </div>
            </div>
            <div className={classes.textFieldContainer}>
              <div className={classes.textField}>
                <label htmlFor='confirm-pwd'>
                  Подтвердите пароль:
                  <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <DefaultInput
                  type='password'
                  id='confirm-pwd'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id='confirmnote'
                  className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Должен соответствовать введеному выше паролю.
                </p>
              </div>
            </div>

            <Button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Зарегистрироваться
            </Button>
            <p style={{ margin: '0px' }}>
              Есть аккаунт?
              <br />
              <a href='#'>Войти</a>
            </p>
          </form>
        </section>
      )}
    </>
  )
}

export default Register

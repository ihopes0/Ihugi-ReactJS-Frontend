import { useEffect } from 'react'
import classes from './Header.module.css'
import useClock from '../../hooks/useClock'

export default function Header() {
  const clock = useClock(1000)

  useEffect(() => {
    function tick() {
      clock.setNow(new Date())
      clearTimeout()
      return setTimeout(tick, clock.updateInterval)
    }

    const timeout = setTimeout(tick, clock.updateInterval)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <header className={classes.header}>
      <h3>Ihugi</h3>

      <span>
        {clock.now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </header>
  )
}

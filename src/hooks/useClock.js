import { useState } from 'react'

export default function useClock(interval = 1000) {
  const [now, setNow] = useState(new Date())
  var updateInterval = interval

  return { now, setNow, updateInterval }
}

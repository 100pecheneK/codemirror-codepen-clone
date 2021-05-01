import React, { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

export default function useLocalStorage(
  key: string,
  initialValue: string | (() => {})
) {
  const prefexedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefexedKey)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })
  useEffect(() => {
    localStorage.setItem(prefexedKey, JSON.stringify(value))
  }, [prefexedKey, value])
  return [value, setValue]
}

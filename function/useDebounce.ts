import { useEffect, useState } from 'react'

//어떤 값이 들어오는지 모르기 때문에 value = T라는 제네릭을 선언!
//useDebounce 말은 즉슨 600 동안 값이 안바뀌었다면 이값으로 하겠다!
const useDebounce = <T = any>(value: T, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState<T>(() => value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay]) 
  
  return debounceValue
}

export default useDebounce

import { useEffect, useState } from 'react'

// Devuelve el valor recién cuando dejó de cambiar durante `delay` ms.
// Sirve para no pedirle a RAWG una búsqueda por cada letra que se tipea.
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export default useDebounce

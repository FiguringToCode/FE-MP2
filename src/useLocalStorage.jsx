import { useEffect, useState } from "react";


const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            const parsed = item ? JSON.parse(item) : initialValue
            return Array.isArray(parsed) ? parsed : initialValue
        } catch (error) {
            return initialValue
        }
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export default useLocalStorage
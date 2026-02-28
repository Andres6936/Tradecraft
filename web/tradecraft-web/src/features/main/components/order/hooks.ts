import { useState } from "react"

const useDispatchAction = () => {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = async (fn: () => Promise<void> | void) => {
    setIsLoading(true)
    try {
      await fn()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    dispatch,
  }
}

export {useDispatchAction}

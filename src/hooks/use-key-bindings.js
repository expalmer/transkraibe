import { useEffect } from 'react'

export const useKeyBindings = ({ handlePlayPause }) => {
  useEffect(() => {
    let timeout
    const handler = (e) => {
      if (e.keyCode === 32) {
        handlePlayPause()
      }
    }
    
    window.addEventListener('keyup', handler)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('keyup', handler)
    }
  }, [handlePlayPause])
}

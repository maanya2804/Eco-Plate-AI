import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Fetches the backend health endpoint to know whether we're in demo mode.
 * Falls back to demoMode=true if the backend is unreachable.
 */
export function useApiMode() {
  const [demoMode, setDemoMode] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/health')
      .then((res) => setDemoMode(res.data.demoMode))
      .catch(() => setDemoMode(true))
      .finally(() => setLoading(false))
  }, [])

  return { demoMode, loading }
}

import { useCallback, useEffect, useState } from "react"

export type FetchedDataType<T> = {
  data: T | null
  err: unknown | null
  isLoading: boolean
  fetchData: () => Promise<void>
}

const useFetchFn = <T>(fn: () => Promise<T>): FetchedDataType<T> => {
  const [data, setData] = useState<T | null>(null)
  const [err, setErr] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)

      const data = await fn()

      setData(data)
      setIsLoading(false)
    } catch (error) {
      setErr(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [fn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, err, isLoading, fetchData }
}

export default useFetchFn

import { useCallback, useState } from "react"

function useAppQuery<P, T>(
    api: (args: P) => Promise<T>
): [(args?: P) => Promise<T>, boolean, () => void] {
    const [isLoading, setLoading] = useState(false)

    const reset = () => {
        setLoading(false)
    }

    const call = useCallback(
        async (args?: P) => {
            setLoading(true)
            try {
                return await api(args!)
            } catch (e) {
                throw e
            } finally {
                setLoading(false)
            }
        },
        [api]
    )

    return [call, isLoading, reset]
}

export default useAppQuery

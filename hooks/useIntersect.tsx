import React, { useEffect, useRef, useState } from "react"

const useIntersect = (
    props?: useIntersectProps
): [
    React.Dispatch<React.SetStateAction<HTMLDivElement | null>>,
    { isIntersecting: boolean; ratio: number }
] => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>()
    const [element, setElement] = useState<HTMLDivElement | null>(null)
    const [data, setData] = useState({ isIntersecting: false, ratio: 0 })

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([firstEntry]) => {
                setEntry(firstEntry)
            },
            {
                root: props?.root,
                rootMargin: props?.rootMargin,
                threshold: props?.threshold ?? 0.0,
            }
        )

        const currentObserver = observer
        currentObserver.disconnect()

        if (element) {
            currentObserver.observe(element)
        }

        return () => {
            currentObserver.disconnect()
        }
    }, [element])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!entry?.isIntersecting) {
            return
        }
        setData({ isIntersecting: true, ratio: entry.intersectionRatio })
    }, [entry])

    return [setElement, data]
}

interface useIntersectProps extends IntersectionObserverInit {}

export default useIntersect

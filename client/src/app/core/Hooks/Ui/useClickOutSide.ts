import { MutableRefObject, useEffect, useRef, useState } from "react"

const useClickOutSide = <T extends HTMLDivElement>(callback?: () => void, ) => {
    const [outside, setOutside] = useState(false)
    const ref = useRef<T | null>(null)
    console.log({ref, outside})
    useEffect(() => {
        const globalClick = (e: MouseEvent) => {
            console.log({event: e, ref})
            if (ref?.current && !ref.current.contains(e.target as Node)) {
                console.log('outside')
                setOutside(true)
                if (callback) {
                    callback()
                }
            } else {
                setOutside(false)
            }
        }

        window.addEventListener('click', globalClick)

        return () => {
            window.removeEventListener('click', globalClick)
        }

    }, [outside])

    return { ref, outside, setOutside }
}



export default useClickOutSide
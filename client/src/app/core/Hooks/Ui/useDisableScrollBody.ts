import { useEffect } from "react"

const useDisableScrollBody = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])
}



export default useDisableScrollBody
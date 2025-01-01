import { useContext } from "react"
import { AuthenticationContext } from "../../Context/Authentication.context"

const user = false  

type TProtectACtion<T extends object> = (props: T) => void


const useProtectActions = <T extends object = object,>() => {

    const { setShowBoxAuth } = useContext(AuthenticationContext)

    const protect = () => {
        if (user) {
            return (props: T, onAction: TProtectACtion<T>) => onAction(props)
        } else {
            return () =>
                setShowBoxAuth(true)
        }
    }

    return protect()

}


export default useProtectActions
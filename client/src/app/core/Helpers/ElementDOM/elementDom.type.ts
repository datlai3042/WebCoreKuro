type CallbackClose = () => void

export type CreateDomAlertProps = {
    title?: string,
    buttonText?: string
    isCloseMask?: boolean
    callback?: CallbackClose
}
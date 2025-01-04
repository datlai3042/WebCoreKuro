type CallbackClose = () => void

export type CreateDomAlertProps = {
    title?: string,
    content?:string
    button: {
        text: string,
        action: (callback?: () => void) => void
    }
    isCloseMask?: boolean
    callback?: CallbackClose
}
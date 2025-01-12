type TFunctionImageProps = {
    listImage: { url: string, file: File }[]
    origin: string
    onSetImageActive: ({url, file}: { url: string, file: File } ) => void
}


export type { TFunctionImageProps }
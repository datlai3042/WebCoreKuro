import { ReactElement } from "react"

type TDownloadImage = {
    url: string,
    file?: File,
    ButtonDowload?: ReactElement
    content?:string
}

export type {TDownloadImage}
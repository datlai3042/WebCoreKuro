type TListImagesProps = {
    images: { url: string, file: File }[]
    onSetImageActive: ({ url, file }: { url: string, file: File }) => void

    origin: string
}

export type { TListImagesProps }
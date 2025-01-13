/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

type TFormItemProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>,
    placeholder: string,
    error?: boolean,
    customError?: (msg: string) => React.ComponentType<{ msg: string }>
    onValidate?: (obj: unknown) => boolean
    isTheme?: boolean,
    direction?: 'X' | 'Y',
}

type TFormItemControl<TFieldValues extends FieldValues = FieldValues> = {
    instanceControl: UseFormReturn<TFieldValues, any, undefined>
}


export type { TFormItemProps, TFormItemControl }
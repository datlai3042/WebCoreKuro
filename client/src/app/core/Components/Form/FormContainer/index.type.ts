import { FieldValues, UseFormReturn } from "react-hook-form"

type TFormContainer<TFieldValues extends FieldValues = FieldValues> = {
    config: TFormItemConfig<TFieldValues>[],
    formInit: TFormInit<TFieldValues>,
} & React.FormHTMLAttributes<HTMLFormElement>

type TFormInit<T extends object = object> = {
    initialValues: T,
    formId: string
}

type TFormItemConfig<TFieldValues extends FieldValues = FieldValues> = {
    width: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (_instance: UseFormReturn<TFieldValues, any, undefined>) => React.ReactNode
}
export type { TFormContainer }

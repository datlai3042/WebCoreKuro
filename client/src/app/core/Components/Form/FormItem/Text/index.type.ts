import { FieldValues } from "react-hook-form";
import { TFormItemControl, TFormItemProps } from "../../index.type";

type TFormText<TFieldValues extends FieldValues = FieldValues> = { config: TFormItemProps<TFieldValues>, } & React.InputHTMLAttributes<HTMLInputElement> & TFormItemControl<TFieldValues>

export type { TFormText }
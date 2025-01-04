import { SetStateAction } from "react";
import { CreateDomAlertProps } from "../../Helpers/ElementDOM/elementDom.type";

type TErrorApp = {
    name: TErrorAppType;
    payload: CreateDomAlertProps;
} | null;

type TApplicationError = {
    errorApp: TErrorApp;
    setErrorApp: React.Dispatch<SetStateAction<TErrorApp>>;
    clearErroApp: () => void;
};


type TErrorAppType = 'AUTH' | 'API' | 'APP'

type TGenerateAlertErrorInfo = {
    type: TErrorAppType,
    payload: CreateDomAlertProps
}

export type { TErrorApp, TApplicationError, TErrorAppType, TGenerateAlertErrorInfo }
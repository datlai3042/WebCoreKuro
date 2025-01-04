import elementDom from "../../Helpers/ElementDOM";
import { ALERT_ERROR_TITLE_API, ALERT_ERROR_TITLE_APPLICATION, ALERT_ERROR_TITLE_AUTH, ALERT_ERROR_TITLE_DEFAULT } from "./applicationError.constant";
import { TErrorAppType, TGenerateAlertErrorInfo } from "./applicationError.type";

export const generateAlertError = (args: TGenerateAlertErrorInfo) => {
    const { payload, type } = args
    const titleResult = generateAlertErrorTitle(type)
    return elementDom.createElementAlert({ ...payload, title: titleResult })
}


export const generateAlertErrorTitle = (title: TErrorAppType) => {
    let titleResult = ALERT_ERROR_TITLE_DEFAULT
    if (title === 'API') {
        titleResult = ALERT_ERROR_TITLE_API
    }
    if (title === 'APP') {
        titleResult = ALERT_ERROR_TITLE_APPLICATION
    }
    if (title === 'AUTH') {
        titleResult = ALERT_ERROR_TITLE_AUTH
    }

    return titleResult
}
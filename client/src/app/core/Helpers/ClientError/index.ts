import { RequestInstance, ResponseInstance } from "../../Http/http.type"
import elementDom from "../ElementDOM"

class ResloveErrorUi {
    public catchError<T extends object = object>(res: ResponseInstance<T>, onClose: () => void) {
        const { code } = res
        console.log({ res, code })
        if (+code === 401) {
            return elementDom.createElementAlert({
                button: { text: "Hủy", action: onClose },
                content: "Gọi api failed",
                title: "AUTH_FAILED",
            },)
        }
        if (+code === 403) {
            return elementDom.createElementAlert({
                button: { text: "Hủy", action: onClose },
                content: "Gọi api failed",
                title: "AUTH_FAILED",
            },)
        }
    }
}


const resloveErroUiInstance = new ResloveErrorUi()

export default resloveErroUiInstance
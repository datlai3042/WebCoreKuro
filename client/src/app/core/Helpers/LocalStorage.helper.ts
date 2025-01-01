import elementDom from "./ElementDOM";

class LocalStorageHelper {
    getItem(key: string) {
        if (!localStorage.getItem(key)) {

            elementDom.createElementAlert({ title: 'Không tìm thấy key', buttonText: 'Đóng', isCloseMask: true, });

           
        }
        return JSON.parse(localStorage.getItem(key)!)
    }
    setItem<TValue extends object | string | number | Array<TValue>>(key: string, value: TValue) {
        return localStorage.setItem(key, JSON.stringify(value))
    }
    removeItem(key: string) {
        return localStorage.removeItem(key)
    }
}

const storage = new LocalStorageHelper()


export default storage
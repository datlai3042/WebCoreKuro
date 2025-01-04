import { CreateDomAlertProps } from "./elementDom.type";
class ElementDOM {
  createElementAlert(props: CreateDomAlertProps) {
    const { button, isCloseMask, title, content, callback } = props;

    const root = document.createElement("div");
    const onCloseAction = () => {
      root.onclick = () => {
        document.body.removeChild(root);
      };
    };
    const container = document.createElement("div");
    root.className = "root__container";

    container.className = "alert__container";

    const wrapper = document.createElement("div");
    wrapper.className = 'alert__wrapper'

    const contentDOM = document.createElement('div')
    const actionDOM = document.createElement('div')
    contentDOM.className = 'alert__content'
    actionDOM.className = 'alert__action'



    const titleDOM = document.createElement("p");
    const textDOM = document.createElement("p");

    titleDOM.className = 'alert__title'
    titleDOM.textContent = title || "";
    textDOM.textContent = content || "";
    textDOM.className = 'alert__text'


    contentDOM.appendChild(titleDOM)
    contentDOM.appendChild(textDOM)
    console.log({ props })
    const buttonAction = document.createElement("button");
    actionDOM.appendChild(buttonAction)
    buttonAction.className = 'custom-button'
    buttonAction.textContent = button?.text || "";
  

    wrapper.appendChild(contentDOM);
    wrapper.appendChild(actionDOM);

    document.body.appendChild(root);
    container.appendChild(wrapper)
    root.appendChild(container);
    if (isCloseMask) {
      onCloseAction();
      if (callback) {
        callback();
      }
    }

    container.onclick = (e) => {
      e.stopPropagation();
    };
    buttonAction.onclick = () => {
      if (callback) {
        onCloseAction();
        callback();
      }
      button.action()
      document.body.removeChild(root);
    };
  }
}

const elementDom = new ElementDOM();
export default elementDom;

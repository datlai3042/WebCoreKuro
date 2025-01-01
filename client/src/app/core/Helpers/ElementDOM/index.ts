import { CreateDomAlertProps } from "./elementDom.type";
class ElementDOM {
  createElementAlert(props: CreateDomAlertProps) {
    const { buttonText, isCloseMask, title, callback } = props;

    const container = document.createElement("div");
    const onCloseAction = () => {
      container.onclick = () => {
        document.body.removeChild(container);
      };
    };

    const wrapper = document.createElement("div");
    const text = document.createElement("p");
    const buttonClose = document.createElement("button");
    container.className = "alert__container";
    wrapper.className = "alert__wrapper";
    buttonClose.className = 'custom-button'
    text.textContent = title || "";
    buttonClose.textContent = buttonText || "";
    
    container.appendChild(wrapper);

    wrapper.appendChild(text);
    wrapper.appendChild(buttonClose);
    document.body.appendChild(container);
    if (isCloseMask) {
      onCloseAction();
      if (callback) {
        callback();
      }
    }

    wrapper.onclick = (e) => {
      e.stopPropagation();
    };
    buttonClose.onclick = () => {
      if (callback) {
        onCloseAction();
        callback();
      }
      document.body.removeChild(container);
    };
    console.log({ container });
  }
}

const elementDom = new ElementDOM();
export default elementDom;

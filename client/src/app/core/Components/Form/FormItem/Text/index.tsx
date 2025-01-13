import { useMemo, useState } from "react";
import Box from "../../../Box";
import { TFormText } from "./index.type";

import Label from "../../../Label";
import styles from "../../styles.module.scss";
import { FieldValues } from "react-hook-form";

const FormText = <TFieldValues extends FieldValues = FieldValues>(
  props: TFormText<TFieldValues>
) => {
  const { config, instanceControl, ...native } = props;
  const {
    name,
    placeholder,
    isTheme = true,
    direction = "Y",
    error = false,
  } = config;


  const [focus, setFocus] = useState(false);

  const [value, setValue] = useState("");

  const renderStyleFormItem = useMemo(() => {
    let style = {};
    if (direction) {
      if (direction === "X") {
        style = { ...style, flexDirection: "row" };
      } else {
        style = { ...style, flexDirection: "column" };
      }
    }
    return style;
  }, [direction]);

 
  const configStyleInput = () => {
    return error ? styles["input__common--isError"] : "";
  };

  const configStyleLabel = () => {
    const  classStyles = [];

    if (!error) {
      classStyles.push(
        focus || value ? styles.label__focus : styles.label__notFocus
      );
    }

    if (error) {
      classStyles.push(styles["label--isError"]);
    }

    console.log({ classStyles });
    return classStyles.join("");
  };

  console.log({ config: configStyleLabel() });

  return (
    <Box
      isTheme={isTheme}
      style={renderStyleFormItem}
      className={`${styles.formItem__wrapper}`}
    >
      <Label
        htmlFor={name}
        content={placeholder}
        className={`${styles.label} ${configStyleLabel()}`}
      />
      <input
        {...native} // Gộp các thuộc tính từ native trước
        {...instanceControl.control.register(name)} // Gộp thuộc tính từ register
        onChange={(e) => {
          instanceControl.control.register(name)?.onChange?.(e); // Gọi sự kiện onChange từ register
          native?.onChange?.(e); // Gọi sự kiện onChange từ native nếu có
          setValue(e.target.value);
          if(!!instanceControl.formState.errors[name]) {
            instanceControl.clearErrors(name)
          }
        }}
        onBlur={(e) => {
          instanceControl.control.register(name)?.onBlur?.(e); // Gọi sự kiện onBlur từ register
          native?.onBlur?.(e); // Gọi sự kiện onBlur từ native nếu có
          setFocus(false);
        }}
        className={`${native.className || ""} ${
          styles.input__common
        } ${configStyleInput()}`}
        id={name}
        onFocus={() => setFocus(true)}
      />
    </Box>
  );
};

export default FormText;

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
  } = config;
  const [focus, setFocus] = useState(false);
  
  const [value, setValue] = useState("");
  const isError = !!instanceControl.formState.errors[name]
  console.log({instanceControl, isError, msg: instanceControl.formState.errors[name]?.message})

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
    return isError ? styles["input__common--isError"] : "";
  };

  const configStyleLabel = () => {
    const classStyles = [];

    if (!isError) {
      classStyles.push(
        focus || value ? styles.label__focus : styles.label__notFocus
      );
    }

    if (isError) {
      classStyles.push(styles["label--isError"]);
    }

    return classStyles.join("");
  };

  return (
    <Box className={`${styles.field__wrapper}`}>
      <Box
        isTheme={isTheme}
        style={renderStyleFormItem}
        className={`${styles.input__block}`}
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
            if (!!instanceControl.formState.errors[name]) {
              instanceControl.clearErrors(name);
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
      <span className="pl-[1rem] text-red-500 font-bold text-[1.2rem]">
        {isError && instanceControl.formState.errors[name]?.message as React.ReactNode}
      </span>
    </Box>
  );
};

export default FormText;

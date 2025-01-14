import React from "react";
import Box from "../../Box";
import { TFormContainer } from "./index.type";
import { FieldValues, Path, useForm ,} from "react-hook-form";
import Button from "@/app/core/Ui/Button";
import styles from "../styles.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";

const FormContainer = <TFieldValues extends FieldValues = FieldValues>(
  props: TFormContainer<TFieldValues>
) => {
  const { config, formInit, ...native } = props;
  const { initialValues, formId , schemaValidate} = formInit;
  const formInstance = useForm({
    defaultValues: async () => initialValues,
    shouldUnregister: true,
    resolver: zodResolver(schemaValidate) 
  });

  console.log({formInstance: formInstance.formState.errors})

  const onSubmit = (formData: TFieldValues) => {
    // console.log({ formData });
    formInstance.setError("first_name" as Path<TFieldValues>, {
      message: "First name đã được sử dụng",
    });
    formInstance.setError("first_name2" as Path<TFieldValues>, {
      message: "First name2 đã được sử dụng",
    });

    formInstance.setError("email" as Path<TFieldValues>, {
      message: "Email đã được sử dụng",
    });
    formInstance.setError("username" as Path<TFieldValues>, {
      message: "Username đã được sử dụng",
    });
  };

  return (
    <Box className="flex flex-col gap-[3rem] ">
      <form
        id={formId}
        onSubmit={formInstance.handleSubmit(onSubmit)}
        {...native}
        className={`${
          formInstance.formState.errors &&
          Object.keys(formInstance.formState.errors).length <= 0
            ? "gap-[1.6rem_1rem]"
            : "gap-[2.4rem_1rem]"
        } flex  flex-wrap justify-between`}
      >
        {config.map((item, index) => {
          const {isFullMobile = true} = item
         
          return (
            <Box
              key={index}
              style={{ width: item.width }}
              className={`${
                isFullMobile ? styles["field__container--isFull"] : ""
              } ${styles.form__field}`}
            >
              {item.render(formInstance)}
            </Box>
          );
        })}
      </form>
      <Button type="submit" form={formId} loading={true} className="min-w-[12rem]">
        Gửi
      </Button>
    </Box>
  );
};

export default FormContainer;

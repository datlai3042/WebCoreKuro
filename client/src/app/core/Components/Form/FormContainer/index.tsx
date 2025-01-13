import React from "react";
import Box from "../../Box";
import { TFormContainer } from "./index.type";
import { FieldValues, Path, useForm } from "react-hook-form";
import Button from "@/app/core/Ui/Button";

const FormContainer = <TFieldValues extends FieldValues = FieldValues>(
  props: TFormContainer<TFieldValues>
) => {
  const { config, formInit, ...native } = props;
  const { initialValues, formId } = formInit;
  const formInstance = useForm({
    defaultValues: async () => initialValues,
    shouldUnregister: true,
  });

  const onSubmit = (formData: TFieldValues) => {
    // console.log({ formData });
    formInstance.setError('first_name' as Path<TFieldValues>, {message: 'First name đã được sử dụng'})
    formInstance.setError('email' as Path<TFieldValues>, {message: 'Email đã được sử dụng'})
    formInstance.setError('username' as Path<TFieldValues>, {message: 'Username đã được sử dụng'})

  };

  const ref1 = formInstance.register("username" as Path<TFieldValues>);
  console.log({ ref1 });

  return (
    <Box className="flex flex-col gap-[3rem]">
      <form
        id={formId}
        onSubmit={formInstance.handleSubmit(onSubmit)}
        {...native}
        className="flex gap-[3rem_2rem] flex-wrap"
      >
        {config.map((item, index) => (
          <Box key={index} style={{ width: item.width }}>
            {item.render(formInstance)}
          </Box>
        ))}
      </form>
      <Button type="submit" form={formId}>
        Gửi
      </Button>
    </Box>
  );
};

export default FormContainer;

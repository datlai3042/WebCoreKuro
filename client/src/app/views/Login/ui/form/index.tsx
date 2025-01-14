import Box from "@/app/core/Components/Box";
import { FormContainer } from "@/app/core/Components/Form";
import FormText from "@/app/core/Components/Form/FormItem/Text";
import { Paragraph } from "@/app/core/Components/Text";
import {z} from 'zod'
const initForm = {
  password: "",
  email: "",

};

const loginSchemaValidate = z.object({
  email: z.string().email('Vui lòng nhập email'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu')
})

const LoginForm = () => {
  return (
    <Box className="w-full h-full flex flex-col gap-[3rem] rounded-lg p-[2rem] bg-[var(--bg-theme)]">
      <Paragraph
        className=" text-[3rem] font-bold text-[#175fef]"
        isTheme={false}
      >
        Đăng nhập hệ thống
      </Paragraph>

      <FormContainer
        formInit={{ initialValues: initForm, formId: "Login", schemaValidate: loginSchemaValidate }}
        style={{ width: "100%" }}
        config={[
          {
            width: "48%",
            isFullMobile: false,
            render: (_instance) => {
              return (
                <FormText
                  instanceControl={_instance}
                  config={{
                    name: "email",
                    placeholder: "Nhập email",
                  }}
                />
              );
            },
          },

          {
            width: "48%",
            isFullMobile: false,
            render: (_instance) => {
              return (
                <FormText
                  instanceControl={_instance}
                  config={{
                    name: "password",
                    placeholder: "Nhập mật khẩu",
                  }}
                />
              );
            },
          },

        ]}
      />
    </Box>
  );
};

export default LoginForm;

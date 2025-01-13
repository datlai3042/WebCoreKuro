import Box from "@/app/core/Components/Box";
import { FormContainer } from "@/app/core/Components/Form";
import FormText from "@/app/core/Components/Form/FormItem/Text";
import { Paragraph } from "@/app/core/Components/Text";

const initForm = {
  username: "",
  email: "",
  last_name: "",
  first_name: "",
};

const LoginForm = () => {
  return (
    <Box className="w-full h-[calc(100vh-80px)] px-[4rem] mt-[6rem] flex flex-col gap-[3rem]">
      <Paragraph
        className=" text-[3rem] font-bold text-[#175fef]"
        isTheme={false}
      >
        Đăng nhập hệ thống
      </Paragraph>

      <FormContainer
        formInit={{ initialValues: initForm, formId: "Login" }}
        style={{ width: "100%" }}
        config={[
          {
            width: "48%",
            render: (_instance) => {
              console.log({ _instance });
              const isError = _instance.formState;
              return (
                <Box className="flex flex-col gap-[.6rem]">
                  <FormText
                    instanceControl={_instance}
                    config={{
                      name: "first_name",
                      placeholder: "Nhập First Name",
                      error: !!isError.errors["first_name"],
                    }}
                  />
                  <span className="pl-[1rem] text-red-500 font-bold text-[1.2rem]">
                    {isError.errors["first_name"]?.message}
                  </span>
                </Box>
              );
            },
          },

          {
            width: "48%",
            render: (_instance) => (
              <FormText
                instanceControl={_instance}
                config={{
                  name: "last_name",
                  placeholder: "Nhập Last Name",
                }}
              />
            ),
          },
          {
            width: "70%",
            render: (_instance) => {
              console.log({ _instance });
              const isError = _instance.formState;
              return (
                <Box className="flex flex-col gap-[.6rem]">
                  <FormText
                    instanceControl={_instance}
                    config={{
                      name: "username",
                      placeholder: "Nhập username",
                      error: !!isError.errors["username"],
                    }}
                  />
                  <span className="pl-[1rem] text-red-500 font-bold text-[1.2rem]">
                    {isError.errors["username"]?.message}
                  </span>
                </Box>
              );
            },
          },

          {
            width: "25%",
            render: (_instance) => {
              console.log({ _instance });
              const isError = _instance.formState;
              return (
                <Box className="flex flex-col gap-[.6rem]">
                  <FormText
                    instanceControl={_instance}
                    config={{
                      name: "email",
                      placeholder: "Nhập email",
                      error: !!isError.errors["email"],
                    }}
                  />
                  <span className="pl-[1rem] text-red-500 font-bold text-[1.2rem]">
                    {isError.errors["email"]?.message}
                  </span>
                </Box>
              );
            },
            
          },
        ]}
      />
    </Box>
  );
};

export default LoginForm;

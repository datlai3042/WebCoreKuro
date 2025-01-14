import LoginForm from "@/app/views/Login/ui/form";
import styles from "./styles.module.scss";

const BoxLogin = () => {
  return (
    <div
      className={`${styles.login__container} ${styles["login__container--animation"]} w-[30vw] min-h-[50vh]  max-h-[90vh] rounded-xl bg-[#fff]`}
    >
      <LoginForm />
    </div>
  );
};

export default BoxLogin;

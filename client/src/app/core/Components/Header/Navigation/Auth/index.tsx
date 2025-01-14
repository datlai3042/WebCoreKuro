import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoText } from "../../../Application";
import Box from "../../../Box";
import styles from './styles.module.scss';

const NavigationAuth = () => {
  const pathname = usePathname()
  const isActive = (url: string) => url === pathname ? styles['nav--active'] : ''
  return (
    <Box className="w-full min-h-[8rem] xl:h-[8rem] gap-[1rem] xl:gap-[12rem]  flex flex-col sm:flex-row  items-center justify-between xl:justify-center px-[2rem] text-[1.5rem]">
      <Box className="h-full flex items-center w-max">
        <LogoText />
      </Box>
      <Box
        className="h-full w-max flex-1 flex flex-wrap gap-[3rem] justify-end items-center  text-[#6c7284]"
        isTheme={false}
      >
        <Link href={"/"} className={`${styles.nav} ${isActive('/')}`}>Trang chủ</Link>
        <Link href={"/login"} className={`${styles.nav} ${isActive('/login')}`}>Đăng nhập</Link>
        <Link href={"/regsiter"} className={`${styles.nav} ${isActive('/register')}`}>Đăng kí</Link>

      </Box>
    </Box>
  );
};

export default NavigationAuth;

"use client";
import { createContext, SetStateAction, useState } from "react";
import Overlay from "../Components/Overlay";
import BoxLogin from "../Layout/Authentication/Login";

type TAuthenticationContext = {
  showBoxAuth: boolean;
  setShowBoxAuth: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthenticationContext = createContext<TAuthenticationContext>({
  showBoxAuth: false,
  setShowBoxAuth: () => {},
});

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showBoxAuth, setShowBoxAuth] = useState(false);

  return (
    <AuthenticationContext.Provider value={{ showBoxAuth, setShowBoxAuth }}>
      {showBoxAuth ? (
        <Overlay
          ComponentCore={<BoxLogin />}
          onClickOverlay={() => setShowBoxAuth((prev) => !prev)}
        >
          {children}
        </Overlay>
      ) : (
        children
      )}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

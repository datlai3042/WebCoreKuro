"use client";

import { createContext, SetStateAction, useEffect, useState } from "react";
import { CreateDomAlertProps } from "../../Helpers/ElementDOM/elementDom.type";
import elementDom from "../../Helpers/ElementDOM";
import { TApplicationError, TErrorApp } from "./applicationError.type";
import { generateAlertError } from "./aplicationError.util";

export const ApplicationErrorContext = createContext<TApplicationError>({
  clearErroApp: () => {},
  errorApp: null,
  setErrorApp: () => {},
});

export const ApplicationErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorApp, setErrorApp] = useState<TErrorApp>(null);
  const [elementShow, setElementShow] = useState(false);
  const clearErroApp = () => {
    setErrorApp(null);
    setElementShow(false);
  };

  useEffect(() => {
    if (errorApp?.payload && !elementShow) {
      setElementShow(true);
      generateAlertError({
        type: errorApp?.name,
        payload: errorApp?.payload,
      });
    }
  }, [errorApp]);

  return (
    <ApplicationErrorContext.Provider
      value={{ errorApp, setErrorApp, clearErroApp }}
    >
      {children}
    </ApplicationErrorContext.Provider>
  );
};

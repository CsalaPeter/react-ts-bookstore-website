import { createContext, ReactNode, useContext, useState } from "react";

type CurrencyTypeProviderProps = {
  children: ReactNode;
};

type CurrencyTypeContext = {
  currencyType: Intl.NumberFormat;
  setCurrencyType: (currency: string) => void;
  multiplier: number;
};

const CurrencyTypeContext = createContext({} as CurrencyTypeContext);

export function useCurrency() {
  return useContext(CurrencyTypeContext);
}

export const CurrencyTypeProvider = ({
  children,
}: CurrencyTypeProviderProps) => {
  const [multiplier, setMultValue] = useState(1);
  const [currencyType, setValue] = useState(
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    })
  );
  const setCurrencyType = (currency: string) => {
    switch (currency) {
      case "EUR":
        setValue(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          })
        );
        setMultValue(1);
        break;
      case "USD":
        setValue(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          })
        );
        setMultValue(0.99);
        break;
      case "HUF":
        setValue(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "HUF",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        );
        setMultValue(402.5);
        break;
    }
  };

  return (
    <CurrencyTypeContext.Provider
      value={{ currencyType, multiplier, setCurrencyType }}
    >
      {children}
    </CurrencyTypeContext.Provider>
  );
};

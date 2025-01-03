import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import defaultConfig from '@/configs';

// initial state
const initialState = {
  ...defaultConfig,
  onChangeMenuOrientation: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMode: () => {},
  onReset: () => {}
};

type AppSettingContextType = {
  menuOrientation: string;
  miniDrawer: boolean;
  mode: string;
  borderRadius: number;
  container: boolean;
  fontFamily: string;
  outlinedFilled: boolean;
  presetColor: string;
  themeDirection: string;
  onChangeMenuOrientation: (menuOrientation: string) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeMode: (mode: string) => void;
  onReset: () => void;
};

export const AppSettingContext = createContext<AppSettingContextType>(initialState as AppSettingContextType);

export const AppSettingContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [config, setConfig] = React.useState({
    menuOrientation: initialState.menuOrientation,
    miniDrawer: initialState.miniDrawer,
    mode: initialState.mode,
    borderRadius: initialState.borderRadius,
    container: initialState.container,
    fontFamily: initialState.fontFamily,
    outlinedFilled: initialState.outlinedFilled,
    presetColor: initialState.presetColor,
    themeDirection: initialState.themeDirection,
  });

  const onChangeMenuOrientation = (menuOrientation: string) => {
    setConfig({
      ...config,
      menuOrientation
    });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
        ...config,
        miniDrawer
    });
  };

  const onChangeMode = (mode: string) => {
    setConfig({
        ...config,
        mode
    });
  };

  const onReset = () => {
      setConfig({ ...defaultConfig });
  };

  return (
    <AppSettingContext.Provider
      value={{
        ...config,
        onChangeMenuOrientation,
        onChangeMiniDrawer,
        onChangeMode,
        onReset
      }}
    >
      {children}
    </AppSettingContext.Provider>
  );
};

export const useAppSetting = () => React.useContext(AppSettingContext);
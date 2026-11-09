import { View, Text, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadThemeFromStorage, saveThemeToStorage, ThemeMode } from "../store/slice/themeSlice";
import { themes } from "../utils/color-theme";

const useTheme = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    dispatch(loadThemeFromStorage());
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeMode = themeMode === "light" ? "dark" : "light";
    dispatch(saveThemeToStorage(newTheme));
  };

  const setThemeMode = async (mode: ThemeMode) => {
    dispatch(saveThemeToStorage(mode));
  };

  const currentTheme = themes[themeMode];

  const colors = {
    background: themeMode === "light" ? "#EEEEEE" : "#11224E",
    card: themeMode === "light" ? "#EEEEEE" : "#11224E",
    text: themeMode === "light" ? "#11224E" : "#EEEEEE",
    textSecondary: themeMode === "light" ? "#F87B1B" : "#CBD99B",
    border: themeMode === "light" ? "#F87B1B" : "#11224E",
    primary: "#F87B1B",
    primaryDark: "#11224E",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  };

  return {
    themeMode,
    toggleTheme,
    setThemeMode,
    currentTheme,
    colors,
    isDark: themeMode === "dark",
  };
};

export default useTheme;

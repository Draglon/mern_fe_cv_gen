"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { THEME } from "@/lib/constants/theme";
import Switch from "@/views/shared/antd/Switch";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === THEME.dark;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onChangeTheme = (value: boolean) => {
    setTheme(value ? THEME.dark : THEME.light);
  };

  return (
    <div className="theme">
      <Switch onChange={onChangeTheme} defaultChecked={isDarkTheme} />
    </div>
  );
};

export default ThemeSwitcher;

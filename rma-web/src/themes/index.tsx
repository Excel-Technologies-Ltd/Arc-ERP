import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  Themes,
  getTheme,
  selectTheme,
  setTheme,
  themes,
} from "@/stores/themeSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Main() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const Component = getTheme(theme).component;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
  };

  useEffect(() => {
    if (queryParams.get("theme")) {
      const selectedTheme = themes.find(
        (theme) => theme.name === queryParams.get("theme")
      );

      if (selectedTheme) {
        switchTheme(selectedTheme.name);
      }
    }
  }, []);

  return (
    <div>
      <ThemeSwitcher />
      <Component />
    </div>
  );
}

export default Main;

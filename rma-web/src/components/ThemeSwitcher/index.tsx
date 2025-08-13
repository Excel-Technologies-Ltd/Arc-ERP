import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  selectColorScheme,
  setColorScheme,
  ColorSchemes,
} from "@/stores/colorSchemeSlice";
import { selectTheme, setTheme, setLayout, Themes } from "@/stores/themeSlice";
import { selectDarkMode, setDarkMode } from "@/stores/darkModeSlice";
import { Slideover } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import { useState } from "react";
import clsx from "clsx";

function Main() {
  const dispatch = useAppDispatch();
  const [themeSwitcherSlideover, setThemeSwitcherSlideover] = useState(false);

  const activeTheme = useAppSelector(selectTheme);
  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
  };
  const switchLayout = (layout: Themes["layout"]) => {
    dispatch(setLayout(layout));
  };

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll("html")[0];
    el.setAttribute("class", activeColorScheme);
    activeDarkMode && el.classList.add("dark");
  };
  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme));
    setColorSchemeClass();
  };
  setColorSchemeClass();

  const setDarkModeClass = () => {
    const el = document.querySelectorAll("html")[0];
    activeDarkMode ? el.classList.add("dark") : el.classList.remove("dark");
  };
  const switchDarkMode = (darkMode: boolean) => {
    dispatch(setDarkMode(darkMode));
    setDarkModeClass();
  };
  setDarkModeClass();

  const themes: Array<Themes["name"]> = [
    "rubick",
    "icewall",
    "tinker",
    "enigma",
  ];
  const layouts: Array<Themes["layout"]> = [
    "side-menu",
    "simple-menu",
    "top-menu",
  ];
  const colorSchemes: Array<ColorSchemes> = [
    "default",
    "theme-1",
    "theme-2",
    "theme-3",
    "theme-4",
  ];

  const themeImages = import.meta.glob<{
    default: string;
  }>("/src/assets/images/themes/*.{jpg,jpeg,png,svg}", { eager: true });
  const layoutImages = import.meta.glob<{
    default: string;
  }>("/src/assets/images/layouts/*.{jpg,jpeg,png,svg}", { eager: true });

  return (
    <div>
      <Slideover
        open={themeSwitcherSlideover}
        onClose={() => {
          setThemeSwitcherSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setThemeSwitcherSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Templates</div>
                <div className="text-slate-500 mt-0.5">
                  Choose your templates
                </div>
                <div className="grid grid-cols-2 mt-5 gap-y-3.5 gap-x-5">
                  {themes.map((theme, themeKey) => (
                    <div key={themeKey}>
                      <div
                        onClick={() => switchTheme(theme)}
                        className={clsx([
                          "h-28 cursor-pointer bg-slate-50 box p-1",
                          activeTheme.name == theme &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="w-full h-full overflow-hidden rounded-md">
                          {themeImages[
                            `/src/assets/images/themes/${theme}.png`
                          ] !== undefined && (
                            <img
                              className="w-full h-full"
                              src={
                                themeImages[
                                  `/src/assets/images/themes/${theme}.png`
                                ].default
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2.5 capitalize text-center text-xs">
                        {theme}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Layouts</div>
                <div className="text-slate-500 mt-0.5">Choose your layout</div>
                <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-3.5">
                  {layouts.map((layout, layoutKey) => (
                    <div key={layoutKey}>
                      <div
                        onClick={() => switchLayout(layout)}
                        className={clsx([
                          "h-24 cursor-pointer bg-slate-50 box p-1",
                          activeTheme.layout == layout &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="w-full h-full overflow-hidden rounded-md">
                          {layoutImages[
                            `/src/assets/images/layouts/${layout}.png`
                          ] !== undefined && (
                            <img
                              className="w-full h-full"
                              src={
                                layoutImages[
                                  "/src/assets/images/layouts/" +
                                    layout +
                                    ".png"
                                ].default
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2.5 capitalize text-center text-xs">
                        {layout.replace("-", " ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Color Schemes</div>
                <div className="text-slate-500 mt-0.5">
                  Choose your color schemes
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                  {colorSchemes.map((colorScheme, colorKey) => (
                    <div key={colorKey}>
                      <div
                        onClick={() => switchColorScheme(colorScheme)}
                        className={clsx([
                          "h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80",
                          activeColorScheme == colorScheme &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="h-full overflow-hidden rounded-full">
                          <div className="flex items-center h-full gap-1 -mx-2">
                            <div
                              className={clsx([
                                "w-1/2 h-[140%] bg-theme-1 rotate-12",
                                colorScheme,
                              ])}
                            ></div>
                            <div
                              className={clsx([
                                "w-1/2 h-[140%] bg-theme-2 rotate-12",
                                colorScheme,
                              ])}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Appearance</div>
                <div className="mt-0.5 text-slate-500">
                  Choose your appearance
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3.5">
                  <div>
                    <a
                      onClick={() => switchDarkMode(false)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block",
                        "[&.active]:border-2 [&.active]:border-theme-1/60",
                        !activeDarkMode ? "active" : "",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-200"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize">
                      Light
                    </div>
                  </div>
                  <div>
                    <a
                      onClick={() => switchDarkMode(true)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block",
                        "[&.active]:border-2 [&.active]:border-theme-1/60",
                        activeDarkMode ? "active" : "",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-900"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize">
                      Dark
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setThemeSwitcherSlideover(true);
        }}
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer w-14 h-14 bg-theme-1"
      >
        <Lucide className="w-5 h-5 animate-spin" icon="Settings" />
      </div>
    </div>
  );
}

export default Main;

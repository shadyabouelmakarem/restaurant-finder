import { ThemeColors } from "@/interfaces";

export function adjustAppTheme() {
  adjustThemeColors();
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", adjustThemeColors);
}

function adjustThemeColors() {
  const html: HTMLElement = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (prefersDark.matches) {
    for (const color in themeColors.dark) {
      html.style.setProperty(color, (themeColors.dark as any)[color]);
    }
  } else {
    for (const color in themeColors.light) {
      html.style.setProperty(color, (themeColors.light as any)[color]);
    }
  }
}

const themeColors: { dark: ThemeColors; light: ThemeColors } = {
  dark: {
    "--base": "#000",
    "--dark-gray": "#d3d3d3",
    "--light-gray": "#282c34",
    "--sky-blue": "#fb9061",
  },
  light: {
    "--base": "#fff",
    "--dark-gray": "#282c34",
    "--light-gray": "#d3d3d3",
    "--sky-blue": "#61dafb",
  },
};

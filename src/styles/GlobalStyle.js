export const applyTheme = (themeObject) => {
  const root = document.documentElement;
  Object.entries(themeObject).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

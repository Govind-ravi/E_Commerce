export const content = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const darkMode = "media";
export const theme = {
  extend: {
    screens: {
      vs: '350px',
      xxs: "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    transitionProperty: {
      'height': 'height'
    },
    fontSize: {
      'xxs': '0.7rem', // Example custom size
    },
  },
};
export const plugins = [];

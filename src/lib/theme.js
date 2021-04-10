/* eslint-disable import/prefer-default-export */
const breakpoints = ["0", "600px", "1024px", "1280px", "1440px"];

breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

export const theme = {
  breakpoints,
  fontSizes: {
    tiny: ".5rem",
    small: ".625rem",
    body: ".75rem",
    title: "1rem",
    big: "1.25rem",
    large: "2rem",
    larger: "2.5rem",
  },
  space: [
    "0",
    "0.5rem",
    "1rem",
    "2rem",
    "3rem",
    "4rem",
    "5rem",
    "6rem",
    "7rem",
    "8rem",
    "9rem",
  ],
  colors: {
    primary: "#FDC960",
    error: "#DE2121",
    authbg: "#FEE4AF",
    purple: "#AD6EDD",
    link: "#0282B9",
    sidebarbg: "#001939",
    cardbg: "#C0EBF5",
    green: "#00D998",
    input: "#A7A7A7",
    background: "#ffffff",
  },
};

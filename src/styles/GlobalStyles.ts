import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    background: #f3f4f6;
    color: #111827;
    overflow: hidden;
  }
`;
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lucida Grande', Helvetica, Arial, sans-serif;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  a:hover {
    text-decoration: none;
  }
  main {
    min-height: 80vh;
  }
`;

export default GlobalStyle
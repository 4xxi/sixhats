import { createGlobalStyle } from 'styled-components';
import { blue } from '@material-ui/core/colors';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    background-color: ${blue[500]};
  }
`;

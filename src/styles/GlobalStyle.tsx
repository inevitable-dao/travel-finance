import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';
import colors from 'tailwindcss/colors';

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      ${reset}

      html, body {
        background: ${colors.zinc[950]};
      }

      * {
        box-sizing: border-box;
        word-break: keep-all;

        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        /* font-family: koverwatch; */
        letter-spacing: -0.5px;
      }

      img {
        -webkit-user-drag: none;
        user-select: none;
      }

      a {
        text-decoration: none;
        cursor: pointer;
      }

      input,
      button {
        outline: 0;
        background-color: transparent;
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

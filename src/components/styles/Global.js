import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root{
        overflow: auto;
        height: 100%;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.primary};
        font-size: 14px;
    }

    a {
         text-decoration: none;
        color: var(--color-info-light);
    }

    img {
        max-width: 100%;
    }

    input:focus {
      outline: none;
    }

    ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
    padding-left: 1rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.3rem; /* rundness of the scroll thumb */
  }


`;

export default GlobalStyles;

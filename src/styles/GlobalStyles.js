import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
  font-family: "SUSE", sans-serif;
  list-style-type: none;
}

::-webkit-scrollbar {
    width: 0.6rem;

}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;;
  margin: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-dark);
}

:root {
    /* BUTTONS */
--color-green-button: #0F9D58;
--color-red-button: #991b1b;


  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  
  --image-grayscale: 0;
  --image-opacity: 100%;
  
  /* Yellow */
  --color-brand-50: #fefce8;
  --color-yellow-100: #fef9c3;
  --color-yellow-200: #fef08a;
  --color-yellow-300: #fde047;
  --color-yellow-400: #facc15;
  --color-yellow-500: #eab308;
  --color-yellow-600: #ca8a04;
  --color-yellow-700: #a16207;

  /* MAIN */
  --color-brand-bright: #FFE169;
  --color-brand-medium: #FAD643;
  --color-brand-dark: #DBB42C;

  --color-red-bright:#FF6F6F;
  --color-red-medium:#F14B4B;
  --color-red-dark:#B24141;
  --color-red-darker:#5C2A1E;

  --color-green-bright: #66D69B;
  --color-green-medium: #0F9D58;
  --color-green-dark: #0C7A46;
  --color-green-darker: #0A5C34;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
/* button:focus, */
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-dark);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

.layoutContainerGrid {
    display: grid;
    grid-template-rows: 4.5rem 90vh;
    grid-template-columns: 0.85fr 5fr;

  }

  .layoutContainerGrid .styledNavLinkSideBar {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.1rem;
    font-weight: 400;
    color: var("colors.nav-text");
    transition: 0.3s all;
    padding: 0.2rem 2.4rem;
    margin: 0 1rem;

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
      background-color: var(--color-grey-50);
      border-radius: 10px;
      color: var(---grey-300);
    }

    & svg {
      width: 1.6rem;
      height: 2.3rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
      color: var(--color-brand-dark);
    }
  }

  .styledNavLButtonHeader {
    color: var(--color-grey-600);

    transition: all 0.2s;

    &:hover {
      color: var(--color-brand-dark);
      transform: scale(1.2);
    }
  }

  .greenTag {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(187 247 208);
    border-radius: 10%;
    width: 50%;
    height: 50%;
    text-align: center;
  }

  .redTag {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(254 202 202);
    border-radius: 10%;
    width: 50%;
    height: 50%;
    text-align: center;
  }

`;

export default GlobalStyles;

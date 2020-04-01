export const smallMobile = 400;
export const largeMobile = 480;
export const smallTablet = 768;
export const largeTablet = 1024;
export const smallDesktop = 1224;
export const mediumDesktop = 1424;
export const largeDesktop = 1824;

export const maxPage = 1920;

export const smallMobileMQ = (styles: string) => `
  @media screen and (max-width: ${smallMobile}px) {
    ${styles}
  }
`;

export const largeMobileMQ = (styles: string) => `
  @media screen and (max-width: ${largeMobile}px) {
    ${styles}
  }
`;

export const smallTabletMQ = (styles: string) => `
  @media screen and (max-width: ${smallTablet}px) {
    ${styles}
  }
`;

export const largeTabletMQ = (styles: string) => `
  @media screen and (max-width: ${largeTablet}px) {
    ${styles}
  }
`;

export const smallDesktopMQ = (styles: string) => `
  @media screen and (max-width: ${smallDesktop}px) {
    ${styles}
  }
`;

export const mediumDesktopMQ = (styles: string) => `
  @media screen and (max-width: ${mediumDesktop}px) {
    ${styles}
  }
`;

export const largeDesktopMQ = (styles: string) => `
  @media screen and (max-width: ${largeDesktop}px) {
    ${styles}
  }
`;

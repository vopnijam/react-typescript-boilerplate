export const fadeIn = (time = 0.5, startOpacity = 0.5, endOpacity = 1): string => `
  @keyframes fade-in {
    0% {
      opacity: ${startOpacity};
    }
    100% {
      opacity: ${endOpacity};
    }
  };

  opacity: ${endOpacity};

  animation: fade-in ${time}s;
`;

export const slideIn = (time = 0.5, startOpacity = 0.5, endOpacity = 1): string => `
  @keyframes slide-in {
    0% {
      opacity: ${startOpacity};
    }
    100% {
      opacity: ${endOpacity};
    }
  };

  opacity: ${endOpacity};

  animation: slide-in ${time}s;
`;

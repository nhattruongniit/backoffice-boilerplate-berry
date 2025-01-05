import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      z1: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      z1?: string;
    };
  }

  interface TypeText {
    dark: string;
    hint: string;
  }

  interface TypographyVariants {
    mediumAvatar: React.CSSProperties;
    commonAvatar: React.CSSProperties;
    largeAvatar: React.CSSProperties;
    subMenuCaption: React.CSSProperties;
    menuCaption: React.CSSProperties;
    customInput: React.CSSProperties;
  }

  interface PaletteOptions {
    orange?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}

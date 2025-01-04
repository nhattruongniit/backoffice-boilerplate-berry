import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeText {
    dark: string;
    hint: string;
  }

  interface TypographyVariants {
    mediumAvatar: React.CSSProperties;
    commonAvatar: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    mediumAvatar?: React.CSSProperties;
    commonAvatar?: React.CSSProperties;
  }

  interface PaletteOptions {
    orange?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}
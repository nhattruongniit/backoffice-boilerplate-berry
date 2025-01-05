import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';
import { useAppSetting } from '@/contexts/app-setting';

export default function ThemeCustomization({ children }: React.PropsWithChildren) {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor, themeDirection } = useAppSetting();
  const theme = useMemo(() => Palette(mode as PaletteMode, presetColor), [mode, presetColor]);

  const themeTypography = useMemo(() => Typography(theme, borderRadius, fontFamily), [theme, borderRadius, fontFamily]);
  const themeCustomShadows = useMemo(() => customShadows(mode, theme), [mode, theme]);

  const themeOptions: any = useMemo(
    () => ({
      direction: themeDirection,
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [themeDirection, theme, themeCustomShadows, themeTypography],
  );

  const themes = createTheme(themeOptions);
  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

export const DASHBOARD_PATH = '/dashboard/default';
export const HORIZONTAL_MAX_ITEM = 7;

export const MenuOrientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

export const ThemeMode = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const ThemeDirection = {
    LTR: 'ltr',
    RTL: 'rtl'
};

const config = {
    menuOrientation: MenuOrientation.VERTICAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    mode: ThemeMode.LIGHT,
    presetColor: 'default',
    i18n: 'en',
    themeDirection: ThemeDirection.LTR,
    container: false,
    drawerOpen: true
};

// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

export default config;

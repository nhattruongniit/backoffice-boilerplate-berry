import { BrowserRouter, Route, Routes } from 'react-router';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { DocumentTitleHandler, NavigateToResource, UnsavedChangesNotifier } from '@refinedev/react-router';
import { ErrorComponent, RefineSnackbarProvider, useNotificationProvider } from '@refinedev/mui';
import dataProvider from '@refinedev/simple-rest';

// mui core
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import ThemeCustomization from '@/themes';

// context
import { AppSettingContextProvider } from '@/contexts/app-setting';

// routes
import { authenticatedResources, AuthenticatedRoutes } from './routes/authenticated-routes';
import { publicResources, PublicRoutes } from './routes/public-routes';
import { guestResources. GuestRoutes } from './routes/guest-routes';
import { restDataProvider } from './services/rest-service';

import { PATH_NAME } from './configs/path-name';

function App() {
  return (
    <BrowserRouter>
      <AppSettingContextProvider>
        <ThemeCustomization>
          <RefineKbarProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
            <RefineSnackbarProvider>
              <Refine
                dataProvider={{
                  default: restDataProvider,
                  tonyapi: dataProvider('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app'),
                }}
                notificationProvider={useNotificationProvider}
                resources={[...authenticatedResources, ...publicResources, ...guestResources]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  // title: { text: "Refine Project", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route path="/" element={<NavigateToResource resource={PATH_NAME.ANALYTICS} />} />
                  {PublicRoutes}
                  {AuthenticatedRoutes}
                  {GuestRoutes}
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </RefineSnackbarProvider>
          </RefineKbarProvider>
        </ThemeCustomization>
      </AppSettingContextProvider>
    </BrowserRouter>
  );
}

export default App;

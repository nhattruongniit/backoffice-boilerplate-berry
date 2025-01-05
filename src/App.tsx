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
import { AuthenticatedRoutes } from './routes/authenticated-routes';
import { PublicRoutes } from './routes/public-routes';
import { GuestRoutes } from './routes/guest-routes';
import { restDataProvider } from './services/rest-service';

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
                }}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: 'dashboard/statistics',
                    list: '/dashboard/statistics',
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  // title: { text: "Refine Project", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route path="/" element={<NavigateToResource resource="dashboard/statistics" />} />
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

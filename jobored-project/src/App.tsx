import { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { VacancyPage, FavoritesPage, Home } from 'pages';
import { HeaderMegaMenu } from 'components/Header/Header';
import { useStorage } from 'hooks/useLocalState';
import { getAuthToken, GuardedRoute } from 'core';
import { GlobalStyles } from 'global.styles';
import { AppProvider } from 'store/provider';
import { LocalStorageKey, DEFAULT_STORAGE_CONFIG, headerLinks, Paths } from 'constants/';
import NotFound from 'pages/NotFound/NotFound';

function App() {
  const [token, setToken] = useStorage(LocalStorageKey.authToken, DEFAULT_STORAGE_CONFIG);

  const handleAuth = useCallback(async () => {
    try {
      if (token.access_token) return;
      const { access_token, refresh_token } = await getAuthToken();
      setToken({ access_token, refresh_token });
    } catch (e) {
      console.error(e);
    }
  }, [setToken, token]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
        colors: {
          hover: ['#92C1FF', '#5E96FC'],
          active: ['#5E96FC'],
          grey: ['#ACADB9', '#7B7C88', '#F7F7F8'],
        },
        components: {
          Option: {
            styles: {
              option: {
                backgroundColor: '#5E96FC',
              },
            },
          },
          Button: {
            styles: (theme) => ({
              root: {
                transition: 'all 0.2s ease-out',
                ...theme.fn.hover({ backgroundColor: theme.colors.hover[0] }),
                '&:active': {
                  backgroundColor: theme.colors.active,
                },
              },
            }),
          },
          TypographyStylesProvider: {
            styles: {
              root: {
                '& b': {
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  marginTop: '1rem',
                },
                '& ul, ul > li, p,': {
                  padding: 0,
                  margin: 0,
                },
                '& ul': {
                  listStyleType: 'disc',
                  paddingLeft: '1.5rem',
                },
              },
            },
          },
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <GlobalStyles />

      <AppProvider>
        <HeaderMegaMenu links={headerLinks} />
        <Routes>
          <Route path={Paths.home} element={<Home />} />
          <Route
            path={Paths.favourites}
            element={
              <GuardedRoute>
                <FavoritesPage />
              </GuardedRoute>
            }
          />
          <Route path={`${Paths.vacancy}/:id`} element={<VacancyPage />} />
          <Route path={Paths.notFound} element={<NotFound isPage={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </MantineProvider>
  );
}

export default App;

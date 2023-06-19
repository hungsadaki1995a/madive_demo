import { ErrorBoundary } from 'react-error-boundary';

import { ThemeProvider } from '@mui/material/styles';

import { RootStore } from '@/stores';
import CreateStore from '@/utils/useStore';

import ErrorFallback from '@/pages/error/ErrorFallback';

import RoutesWrapper from './routes/RoutesWrapper';
import theme from './styles/theme';

// 100vh - 스크롤 오류
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const MobxStore = new RootStore();

const App = () => {
  return (
    <CreateStore.Provider value={{ MobxStore }}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RoutesWrapper />
        </ErrorBoundary>
      </ThemeProvider>
    </CreateStore.Provider>
  );
};

export default App;

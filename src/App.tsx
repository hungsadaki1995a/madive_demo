import { ThemeProvider } from '@mui/material/styles';

import { RootStore } from '@/stores';
import CreateStore from '@/utils/useStore';

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
        <RoutesWrapper />
      </ThemeProvider>
    </CreateStore.Provider>
  );
};

export default App;

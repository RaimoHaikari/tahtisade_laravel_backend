import { createRoot } from 'react-dom/client';
import App from './app';

import { ThemeProvider } from "styled-components";
import BasicTheme from './themes/basicTheme';

import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('app');
const root = createRoot(container);


root.render(
    <Provider store={store}>
        <ThemeProvider theme={BasicTheme}>
            <App />
        </ThemeProvider>
    </Provider>
);
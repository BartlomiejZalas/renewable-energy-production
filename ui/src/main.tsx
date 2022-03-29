import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StateProvider } from './state/StateProvider';

const theme = createTheme({
    palette: {
      primary: {
        main: '#388e3c',
      },
      secondary: {
        main: '#ffc107',
      },
      background: {
          default: '#f8f8f8',
      }
    },
  });

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StateProvider>
                <App />
            </StateProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

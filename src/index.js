import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider} from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
  primary: blue,
  },
});

ReactDOM.render(
<BrowserRouter>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
</BrowserRouter>

  , document.getElementById('root')
);
registerServiceWorker();

import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom';

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

console.log(theme);


ReactDOM.render(
<MuiThemeProvider theme={theme}>
<BrowserRouter>
      <App />
  </BrowserRouter>
</MuiThemeProvider>

  , document.getElementById('root')
);
registerServiceWorker();

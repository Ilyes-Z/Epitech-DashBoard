import { Route, HashRouter, Redirect} from 'react-router-dom';
import { MuiThemeProvider } from "@material-ui/core/styles";

import Header from 'components/Header/Header';

import Login from 'scenes/Auth/Login/Login';
import Register from 'scenes/Auth/Register/Register';
import Dashboard from 'scenes/Dashboard/Dashboard';

import withAuth from 'services/auth/withAuth';
import withoutAuth from 'services/auth/withoutAuth';

import theme from 'theme';


function App() {

  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className='header'>
            <Header />
          </div>
          <div className='content'>
            <Redirect exact from="/" to="/dashboard" />
            <Route path='/auth/login' component={withoutAuth(Login)} />
            <Route path='/auth/register' component={withoutAuth(Register)} />
            <Route path='/dashboard' component={withAuth(Dashboard)} />
          </div>
        </div>
      </MuiThemeProvider>
    </HashRouter>
  );
}

export default App;

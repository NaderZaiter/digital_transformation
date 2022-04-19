import React from 'react';
import { Provider } from 'react-redux';
import { StackSwitcher } from './src/navigation/StackSwitcher';
import { store } from './src/redux/store';
import Toast from './src/components/ToastComponent/toast';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <Provider store={store}>
        <Toast />
        <StackSwitcher />
      </Provider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
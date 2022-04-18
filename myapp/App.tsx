import React from 'react';
import { Provider } from 'react-redux';
import { StackSwitcher } from './src/navigation/StackSwitcher';
import { store } from './src/redux/store';
import Toast from './src/components/ToastComponent/toast';

const App = () => {
  return (
    <Provider store={store}>
      <Toast />
      <StackSwitcher />
    </Provider>
  );
};

export default App;
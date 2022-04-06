import React from 'react';
import { Provider } from 'react-redux';
import { StackSwitcher } from './src/navigation/StackSwitcher';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StackSwitcher />
    </Provider>
  );
};

export default App;
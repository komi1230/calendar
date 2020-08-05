import React from 'react';
import { CreatePage } from './pages/Top/Top';
import { Calendar } from './pages/Calendar/Calendar';
import { Provider } from 'react-redux'
import { store } from './pages/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <CreatePage /> */}
      <Calendar />
    </Provider>
  )
}

export default App;

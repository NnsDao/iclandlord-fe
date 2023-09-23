import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GlobalSizeProvider from './hooks/sizeContext';

import AppRouter from './router';

function App() {
  console.log(`import.meta.env`, import.meta.env);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalSizeProvider>
          <AppRouter></AppRouter>
        </GlobalSizeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;

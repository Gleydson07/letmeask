import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext'
import { ThemeProvider } from './components/hooks/useTheme';
import AdminRoom from './pages/AdminRoom';
import { Home } from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

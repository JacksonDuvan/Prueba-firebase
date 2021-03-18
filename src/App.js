import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Products } from './pages/Products'


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

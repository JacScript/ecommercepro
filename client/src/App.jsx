import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import Success from "./pages/Success";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/:category" component={ProductList} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart" component={Cart} />
        <PrivateRoute path="/login" component={Login} redirect={Home}/>
        <PrivateRoute path="/register" component={Register} redirect={Home}/>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/register" component={Register} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

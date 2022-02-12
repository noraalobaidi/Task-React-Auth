import "./App.css";
import ProductList from "./components/ProductList";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/products">
            <ProductList />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

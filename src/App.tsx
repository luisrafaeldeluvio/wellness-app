import { NavBar } from "./components/NavBar";
import { Route, Switch, Redirect } from "wouter";
import Home from "./pages/Home";
import Log from "./pages/log";
import Menu from "./pages/Menu";
import Report from "./pages/Report";

const App = () => (
  <>
    <NavBar></NavBar>
    <Switch>
      <Route path="/" component={Home}></Route>
      <Route path="/log" component={Log}></Route>
      <Route path="/menu" component={Menu}></Route>
      <Route path="/report" component={Report}></Route>

      <Route path="/home">
        <Redirect to="/" />
      </Route>
    </Switch>
  </>
);

export default App;

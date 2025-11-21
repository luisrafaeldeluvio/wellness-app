import { NavBar } from "./components/NavBar";
import { Route, Switch, Redirect } from "wouter";
import Home from "./pages/Home";
import Log from "./pages/Log";
import Menu from "./pages/Menu";
import Report from "./pages/Report";
import LogFood from "./pages/LogFood";

const App = () => (
  <div className="flex h-dvh flex-col overflow-hidden">
    <main className="relative flex h-full grow flex-col">
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/log" component={Log}></Route>
        <Route path="/log/logfood" component={LogFood}></Route>
        <Route path="/menu" component={Menu}></Route>
        <Route path="/report" component={Report}></Route>

        <Route path="/home">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
    <NavBar></NavBar>
  </div>
);

export default App;

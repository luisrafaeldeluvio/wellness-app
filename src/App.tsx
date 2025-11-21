import { NavBar } from "./components/NavBar";
import { Route, Switch, Redirect } from "wouter";
import Home from "./pages/Home";
import Log from "./pages/Log";
import Menu from "./pages/Menu";
import Report from "./pages/Report";

const App = () => (
  <div className="flex h-dvh flex-col overflow-hidden">
    <main className="grow flex flex-col h-full relative">
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/log" component={Log}></Route>
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

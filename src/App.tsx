import { NavBar } from "./components/NavBar";
import { Route, Switch, Redirect } from "wouter";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Menu from "./pages/Menu";
import Report from "./pages/Report";
import LogFood from "./pages/LogFood";
import Profile from "./pages/Profile";

const App = () => (
  <div className="flex flex-col overflow-hidden">
    <main className="relative flex h-[calc(100dvh-(var(--spacing)*18))] grow flex-col overflow-y-auto">
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/journal" component={Journal}></Route>
        <Route path="/journal/logfood" component={LogFood}></Route>
        <Route path="/menu" component={Menu}></Route>
        <Route path="/report" component={Report}></Route>

        <Route path="/profile" component={Profile}></Route>

        <Route path="/home">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
    <NavBar></NavBar>
  </div>
);

export default App;

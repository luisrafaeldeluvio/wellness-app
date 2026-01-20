import { NavBar } from "./components/layout/NavBar";
import { Route, Switch, Redirect, useLocation } from "wouter";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Menu from "./pages/Menu";
import Report from "./pages/Report";
import LogFood from "./pages/LogFood";
import Profile from "./pages/Profile";
import { getUser } from "./services/userService";
import { useEffect } from "react";
import CreateProfile from "./pages/CreateProfile";
import LogWeight from "./pages/LogWeight";

const App = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        setLocation("/new");
      }
    })();
  }, []);

  const noNavBar = ["/new", "/journal/logfood", "/Profile"];

  const showNavBar = () => {
    const inList = noNavBar.find((v) => v === location);
    return inList ? false : true;
  };

  return (
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
          <Route path="/new" component={CreateProfile}></Route>
          <Route path="/logweight" component={LogWeight}></Route>
        </Switch>
      </main>

      {showNavBar() ? <NavBar></NavBar> : null}
    </div>
  );
};

export default App;

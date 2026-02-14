import { NavBar } from "./components/layout/NavBar";
import { Route, Switch, Redirect, useLocation } from "wouter";
import Home from "./pages/Home";
import Journal from "./pages/journal/Journal";
import Menu from "./pages/Menu";
import Report from "./pages/Report";
import LogFood from "./pages/journal/LogFood";
import Profile from "./pages/Profile";
import { getUser } from "./services/userService";
import { useEffect } from "react";
import CreateProfile from "./pages/CreateProfile";
import LogWeight from "./pages/LogWeight";
import EditLogFood from "./pages/journal/EditLogFood";
import CreateCustomFood from "./pages/journal/CreateCustomFood";
import FoodItemInfo from "./pages/journal/FoodItemInfo";
import dayjs from "dayjs";

const noNavBar = ["/new", "/journal/logfood", "/profile"];

const App = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) setLocation("/new");
    })();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <main className="relative flex h-[calc(100dvh-(var(--spacing)*16))] grow flex-col overflow-y-auto">
        <Switch>
          <Route path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/journal" nest>
            <Route path="/logfood" nest>
              <Route path="/create" component={CreateCustomFood} />
              <Route path="/:date" component={LogFood} />
            </Route>

            <Route path="/editlogfood/:id" component={EditLogFood} />

            <Route path="/:date" component={Journal} />

            <Route path="/">
              <Redirect to={`/${dayjs().format("YYYY-MM-DD")}`} />
            </Route>
          </Route>

          <Route path="/menu" component={Menu} />
          <Route path="/report" component={Report} />
          <Route path="/profile" component={Profile} />
          <Route path="/home" component={Home} />

          <Route path="/new" component={CreateProfile} />
          <Route path="/logweight" component={LogWeight} />
          <Route path="/food/:date/:id" component={FoodItemInfo} />
        </Switch>
      </main>

      {noNavBar.includes(location) ? null : <NavBar />}
    </div>
  );
};

export default App;

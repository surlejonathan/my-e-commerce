import { Switch, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";

// Global styles
import "./default.scss";
import HomepageLayout from "./layouts/HomepageLayout";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route
          path='/'
          exact
          component={() => (
            <HomepageLayout>
              <Homepage />{" "}
            </HomepageLayout>
          )}
        />
        <Route
          path='/registration'
          component={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;

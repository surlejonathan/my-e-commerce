import { useState, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

// Firebase

import { auth, handleUserProfile } from "./firebase/utils";

// Global styles
import "./default.scss";
import HomepageLayout from "./layouts/HomepageLayout";

function App() {
  const initialState = null;
  const [currentUser, setCurrentUser] = useState(initialState);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) =>
          setCurrentUser({ id: snapshot.id, ...snapshot.data() })
        );
      } else {
        setCurrentUser(initialState);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route
          path='/'
          exact
          component={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path='/registration'
          component={() => (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          to='/login'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;

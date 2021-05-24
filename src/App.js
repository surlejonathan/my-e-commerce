import { useState, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";

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

  console.log(currentUser);
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
          component={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path='/login'
          component={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path='/recovery'
          component={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Recovery />
              </MainLayout>
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;

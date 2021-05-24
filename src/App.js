import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/User/user.actions";

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
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const setCurrentUser = (currentUser) => dispatch(setUser(currentUser));

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) =>
          setCurrentUser({ id: snapshot.id, ...snapshot.data() })
        );
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => authListener();
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
          component={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <MainLayout>
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
              <MainLayout>
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
              <MainLayout>
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

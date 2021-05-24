import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/User/user.actions";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

// hoc
import WithAuth from "./hoc/withAuth";

// Firebase

import { auth, handleUserProfile } from "./firebase/utils";

// Global styles
import "./default.scss";
import HomepageLayout from "./layouts/HomepageLayout";

function App() {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const setCurrentUser = (currentUser) => dispatch(setUser(currentUser));

  const history = useHistory();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
          history.push("/");
        });
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
            <HomepageLayout>
              <Homepage />
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
        <Route
          path='/login'
          component={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path='/recovery'
          component={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path='/dashboard'
          component={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;

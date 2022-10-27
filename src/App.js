import './App.scss';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout'
import { publicRoutes } from './routes';

import AuthContextProvider from './context/AuthContextProvider';

import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Guard = route.guard || Fragment;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthContextProvider>
                    <Layout>
                      <Guard>
                        <Page />  
                      </Guard>
                    </Layout>
                  </AuthContextProvider>
                }
              />
            );
          })}
        </Routes>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppContainer from './components/AppContainer';
import BottomNav from './components/BottomNav';

import Desahogo from './pages/Desahogo';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import React, {useEffect, useState} from "react";
import LoadingPage from "./Pages/LoadingPage";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }, [isLoading]);

  return (
      <Router>
        <AppContainer>
          {isLoading ? (
              <LoadingPage/>
          ) : (
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/desahogo" element={<Desahogo/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
          )}
        </AppContainer>
        <BottomNav/>
      </Router>
  );
};

export default App;

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React, { useReducer } from 'react';

import { DataContext, initialState, dataReducer } from "./DataReducer"

import logo from './logo.svg';
import './App.css';
import { AppRoute } from "./CONST.js"
import Main from "./Main.jsx"
import Info from "./Info.jsx"
import Auth from "./Auth.jsx"
import Logout from "./Logout.jsx"
 
function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);




  return (
    <DataContext.Provider value={{ dispatch, state }}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="/"
        >
          <h1>
            Spring and jwt token
          </h1>
        </a>
        <a
          className="App-link"
          href="https://github.com/Egor18032019/testovoeBitWorks"
          target="_blank"
          rel="noopener noreferrer"
        >
          Репозиторий
        </a>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.ROOT} element={<Main />} />
            <Route path={AppRoute.AUTH} element={<Auth />} />
            <Route path={AppRoute.INFO} element={<Info />} />
            <Route path={AppRoute.LOGOUT} element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div >
    </DataContext.Provider>
  );
}

export default App;

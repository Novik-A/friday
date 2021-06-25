import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Header} from "./Header/Header";
import {Routes} from "./Routes/Routes";
import {store} from '../bll/store';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Provider store={store}>
          <Header/>
          <Routes/>
        </Provider>
      </HashRouter>

    </div>
  );
}

export default App;

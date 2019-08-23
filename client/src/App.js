import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/Login";
import "./styles.scss";
import "semantic-ui-css/semantic.min.css";
import PrivateRoute from './hooks/PrivateRoute'
import BubblePage from './components/BubblePage'

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubblepage" component={BubblePage} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;

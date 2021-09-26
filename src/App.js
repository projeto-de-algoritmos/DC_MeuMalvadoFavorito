import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Form } from "./pages/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
      </Switch>
    </Router>
  );
}

export default App;

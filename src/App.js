import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Form } from "./pages/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-rangeslider/lib/index.css";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Form} />
      </Switch>
    </Router>
  );
}

export default App;

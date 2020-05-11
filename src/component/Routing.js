import React, { Component} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } 
from 'react-router-dom';
import DefaultLayout from "./DefaultLayout";

class Routing extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <Router>
            <Switch>
                <Route path="/address-list" name="Movies List"
                    component={DefaultLayout} />
                <Redirect from="/" to="/address-list" />
            </Switch>
        </Router>
        );
    }
}

export default Routing;

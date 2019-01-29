import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Info from './components/info'
import Signup from './components/signup';
import Foodorder from './components/foodOrder'
import AdminSignIn from './components/adminSignIn'
import Admin from "./components/admin"

import history from './History';

// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
            
    
                    
                    <Route exact path="/" component={Signup} />
                    <Route exact path="/order" component={Foodorder} />
                    <Route  path="/info" component={Info} />
                    <Route  path="/admin" component={AdminSignIn} />
                    <Route  path="/adminPanel" component={Admin} />
                   
                    
                </div>
            </Router>
        )
    }
}

export default Routers;
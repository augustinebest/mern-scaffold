import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Profile from './Components/Profile/Profile';
import Errror from './Components/Error';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact strict component={Homepage} />
                    <Route path='/signup' exact strict component={Signup} />
                    <Route path='/login' exact strict component={Login} />
                    <Route path='/profile' exact strict component={Profile} />
                    <Route path='*' exact strict component={Errror} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Router;
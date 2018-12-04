import React from 'react';
import { NavLink } from 'react-router-dom';

class Homepage extends React.Component {
    render() {
        return (
            <div>
                Homepage
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
            </div>
        )
    }
}

export default Homepage;
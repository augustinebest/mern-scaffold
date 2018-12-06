import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <Fragment>
            <h2>Error 404 page</h2>
            <h5>You tried to access an unauthorized page</h5>
            <NavLink to='/'>Return to home</NavLink>
        </Fragment>
    )
}

export default Error;
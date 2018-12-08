import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }
    const ID = JSON.parse(sessionStorage.getItem('user'));
    if ((window.location.pathname === '/login' && ID) || (window.location.pathname === '/signup' && ID)) window.location.href = '/';
    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__logo"><NavLink className='navLink' to='/'>Sportzlite</NavLink></div>
                <div className='spacer' />
                <div className="toolbar_navigation-items">

                    <ul>
                        {
                            !ID ?
                                <ul style={{ margin: '0px', padding: '0px' }}>
                                    <li><NavLink className='navLink1' to='/login'>login</NavLink></li>
                                    <li><NavLink className='navLink1' to='/signup'>signup</NavLink></li>
                                </ul>
                                :
                                <li><span className='navLink1' onClick={logout}>logout</span></li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__logo"><NavLink className='navLink' to='/'>Sportzlite</NavLink></div>
                <div className='spacer' />
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><NavLink className='navLink1' to='/login'>login</NavLink></li>
                        <li><NavLink className='navLink1' to='/signup'>signup</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
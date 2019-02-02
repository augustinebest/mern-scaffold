import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    componentWillMount() {
        const ID = JSON.parse(sessionStorage.getItem('user'));
        this.setState({
            id: ID
        })
        if ((window.location.pathname === '/login' && ID) || (window.location.pathname === '/signup' && ID) || (!ID && window.location.pathname === '/profile')) window.location.href = '/';
    }

    render() {
        const { id } = this.state;
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo"><NavLink className='navLink' to='/'>Sportzlite</NavLink></div>
                    <div className='spacer' />
                    <div className="toolbar_navigation-items">

                        <ul>
                            {
                                !id ?
                                    <ul style={{ margin: '0px', padding: '0px' }}>
                                        <li><NavLink className='navLink1' to='/login'>login</NavLink></li>
                                        <li><NavLink className='navLink1' to='/signup'>signup</NavLink></li>
                                    </ul>
                                    :
                                    <li><span className='navLink1' onClick={this.logout}>logout</span></li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar;
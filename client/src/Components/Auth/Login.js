import React from 'react';
// import { Url } from '../Factories';
import { NavLink } from 'react-router-dom';
import './Auth.css';

class Login extends React.Component {

    render() {
        const style = {
            position: 'relative',
            width: '100%',
            marginBottom: '5px'
        }
        return (
            <div className='auth_base'>

                <div style={style} className='ui labeled input box'>
                    <div className='ui label label'><i className="fa fa-at"></i></div>
                    <input type='text' placeholder='myemail@example.com' />
                </div>
                <div style={style} className='ui labeled input'>
                    <div className='ui label label'><i className="fa fa-hone fa-unlock-alt"></i></div>
                    <input type='text' placeholder='******' />
                </div>
                <button>login</button><br />
                <span>Don't have a account? <NavLink to='/signup'>Signup</NavLink> </span>

            </div>
        )
    }
}

export default Login;
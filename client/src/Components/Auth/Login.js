import React, { Fragment } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Url } from '../Factories';
import { Alert } from 'reactstrap';
import Loader from '../../Components/loader/Loader';
import { NavLink } from 'react-router-dom';
import './Auth.css';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        success: 'success',
        alert: 'danger',
        err: '',
        visible: true,
        loading: false
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const { username, password } = this.state;
        const data = {
            username: username.toLowerCase(),
            password: password.toLowerCase()
        }
        axios.post(`${Url}/user/login`, data).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    err: res.data.message,
                    alert: 'success',
                    visible: true,
                    loading: false
                })
                sessionStorage.setItem('user', JSON.stringify(res.data.token));
                setTimeout(() => {
                    this.props.history.push("/profile");
                }, 2000)
            } else {
                this.setState({
                    err: res.data.message,
                    visible: true,
                    loading: false
                })
            }
        })
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        const { alert, visible, err, loading } = this.state;
        const style = {
            position: 'relative',
            width: '100%',
            marginBottom: '5px'
        }
        return (
            <Fragment>
                {
                    loading &&
                    <Loader />
                }
                <Navbar />
                <div className='auth_base'>
                    {
                        err &&
                        <Alert color={alert} isOpen={visible} toggle={this.onDismiss}>
                            {err}
                        </Alert>

                    }
                    <form style={{ marginTop: '60px' }} onSubmit={this.onSubmit}>
                        <div style={style} className='ui labeled input box'>
                            <div className='ui label label'><i className="fa fa-user"></i></div>
                            <input type='text'
                                placeholder='username'
                                name='username'
                                onChange={this.handleChange}
                                required />
                        </div>
                        <div style={style} className='ui labeled input'>
                            <div className='ui label label'><i className="fa fa-hone fa-unlock-alt"></i></div>
                            <input type='password'
                                placeholder='******'
                                name='password'
                                onChange={this.handleChange}
                                required />
                        </div>
                        <button type='submit'>login</button>
                    </form>
                    <br />
                    <span>Don't have a account? <NavLink to='/signup'>Signup</NavLink> </span>

                </div>
            </Fragment>
        )
    }
}

export default Login;
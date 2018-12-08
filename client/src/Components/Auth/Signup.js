import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Alert } from 'reactstrap';
import Loader from '../../Components/loader/Loader';
import { Url } from '../Factories';

class Signup extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        const { username, email, password, confirmPassword } = this.state;
        const data = {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password.toLowerCase(),
            confirmPassword: confirmPassword.toLowerCase()
        }
        axios.post(`${Url}/user/signup`, data).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    err: res.data.message,
                    alert: 'success',
                    visible: true,
                    loading: false
                })
                setTimeout(() => {
                    this.props.history.push("/login");
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

    onBlur = (e) => {
        const { username } = this.state;
        const data = {
            username: username.toLowerCase(),
        }
        if (e.target.name === 'username' && data.username.length > 2) {
            axios.post(`${Url}/user/checkForUsername`, data).then(res => {
                if (res.data.code === 200) {
                    this.setState({
                        err: res.data.message,
                        visible: true
                    })
                }
            })
        }
    }

    onFocus = (e) => {
        if (e.target.name === 'username' && e.target.value.length > 2) {
            this.setState({
                visible: false
            })
        }
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
                    <div style={style} className='ui labeled input'>
                        <div className='ui label label'><i className="fa fa-hone fa-user"></i></div>
                        <input type='text'
                            name='username'
                            placeholder='username'
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            onChange={this.handleChange}
                            required />
                    </div>

                    <div style={style} className='ui labeled input box'>
                        <div className='ui label label'><i className="fa fa-at"></i></div>
                        <input type='email'
                            name='email'
                            placeholder='myemail@example.com'
                            onBlur={this.onBlur}
                            onChange={this.handleChange}
                            required />
                    </div>

                    <div style={style} className='ui labeled input'>
                        <div className='ui label label'><i className="fa fa-hone fa-unlock-alt"></i></div>
                        <input type='password'
                            name='password'
                            placeholder='******'
                            onChange={this.handleChange}
                            required />
                    </div>

                    <div style={style} className='ui labeled input'>
                        <div className='ui label label'><i className="fa fa-hone fa-unlock-alt"></i></div>
                        <input type='password'
                            name='confirmPassword'
                            placeholder='re-type password'
                            onChange={this.handleChange}
                            required />
                    </div>
                    <button type='submit'>Signup</button>
                </form><br />

                <span>Already register? <NavLink to='/login'>Login</NavLink> </span>
            </div>
            </Fragment>
        )
    }
}

export default Signup;
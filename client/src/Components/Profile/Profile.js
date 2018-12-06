import React, { Fragment } from 'react';
import axios from 'axios';
import { Url } from '../Factories';

class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    }
    componentWillMount() {
        const token = JSON.parse(sessionStorage.getItem('user'));
        const data = {
            token: token
        }
        axios.post(`${Url}/user/userProfile`, data).then(res => {
            this.setState({
                username: res.data.user.username,
                email: res.data.user.email
            })
        })
    }
    render() {
        const { username, email } = this.state;
        return (
            <Fragment>
                User's profile<br />
                Welcome {username}<br />
                you signed in to {email} account
            </Fragment>
        )
    }
}

export default Profile;
import React, { Fragment } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Url } from '../Factories';
import { timeConverter } from '../Factories';
import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            chatroomCreated: null
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
                email: res.data.user.email,
                chatroomCreated: res.data.user.post
            })
        })
    }

    connectChat = () => {
        alert('You have connected to the socket!');
    }
    render() {
        const { username, email, chatroomCreated } = this.state;
        console.log(chatroomCreated)
        return (
            <Fragment>
                <div style={{ height: '100%' }}>
                    <Navbar />
                    <main style={{ marginTop: '60px' }}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-4 profile__container'>
                                    User's profile<br />
                                    Welcome {username}<br />
                                    you signed in to {email} account
                            </div>
                                <div className='col-md-6 chatroom'>
                                    <h5>Chatroom created so far</h5>
                                        {
                                            chatroomCreated &&
                                            chatroomCreated.map((post, index) => {
                                                return (
                                                    <div onClick={this.connectChat} className='display__content' key={index}>
                                                        <span className='display__caption'><b>{post.postDesc}</b></span><br />
                                                    <span className='display__date'>{timeConverter(post.dateCreated)}</span>
                                                        <div className='display__image'><img style={{ width: '100%', height: '100%' }} src={post.image} alt='loading...' /></div>
                                                        <div className='likes'><span>likes {post.likes.length}</span><span>views {post.views}</span></div>
                                                    </div>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Fragment>
        )
    }
}

export default Profile;
import React from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress  } from 'reactstrap';
import { Url } from './Factories';
import axios from 'axios';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadProgress: null,
            postDesc: '',
            ModalExamplemodal: false,
            alert: 'danger',
            uploadResponse: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    selectedPost = (e) => {
        e.target.name = e.target.value;
        this.setState({
            postDesc: e.target.value
        })
    }

    fileUploadHandler = () => {
        const { postDesc, selectedFile } = this.state;
        if (postDesc.length <= 0) {
            alert('You cannot post an empty post');
        } else {
            if(selectedFile === null) {
                this.uploadlite();
            } else {
                if (!(/\.(jpe?g|png|gif)$/i.test(selectedFile.name))) {
                    alert('You cannot upload file of this nature')
                } else {
                    if(selectedFile.size >= 1048576) {
                        alert('image too large')
                    } else {
                        this.uploadlite();
                    }
                }
            }
        }
    }
    
    uploadlite = () => {
        const token = JSON.parse(sessionStorage.getItem('user'));
        const { postDesc, selectedFile } = this.state;
        const fd = new FormData();
        fd.append('postDesc', postDesc);
        fd.append('image', selectedFile);
        fd.append('token', token)
        axios.post(`${Url}/user/post/${token}`, fd, {
            onUploadProgress: ProgressEvent => {
                console.log('upload progress: ' +  Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
                this.setState({
                    uploadProgress: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)
                })
            }
        }).then(res => {
            console.log(res);
            if(res.data.code === 200) {
                this.setState({
                    uploadResponse: res.data.message,
                    alert: 'success'
                })
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 800)
            } else {
                this.setState({
                    uploadResponse: res.data.message
                })
            }
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    redirect = () => {
        alert('You have not logged in')
    }

    render() {
        const ID = JSON.parse(sessionStorage.getItem('user'));
        const { uploadProgress, uploadResponse, alert } = this.state;
        const { text } = this.props;
        if (text === 'Post') {
            return (
                <div>
                    {
                        ID ?
                        <Button style={{ borderRadius: '100%', fontSize: '16px', fontWeight: '600', padding: '12px', boxShadow: '3px 7px 5px #9aa8b4' }} color="primary" onClick={this.toggle}>{text}</Button>
                        :
                        <Button style={{ borderRadius: '100%', fontSize: '16px', fontWeight: '600', padding: '12px', boxShadow: '3px 7px 5px #9aa8b4' }} color="primary" onClick={this.redirect}>{text}</Button>
                    }
                    <Modal style={{ marginTop: '120px' }} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    {
                        uploadProgress &&
                        <Alert color={alert} toggle={this.onDismiss}>
                            {uploadResponse}
                        </Alert>

                    }
                    <Progress value={uploadProgress}>{uploadProgress}</Progress>
                        <ModalHeader toggle={this.toggle}>What's Happening?</ModalHeader>
                        <ModalBody>
                            <textarea
                                name='postDesc'
                                onChange={this.selectedPost}
                                className="form-control"
                                rows="5"
                                id="comment">
                            </textarea>
                            <input type='file'
                                onChange={this.fileSelectedHandler}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.fileUploadHandler}>Throw a lite</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}

export default ModalExample;
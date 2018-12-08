import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';

class Homepage extends React.Component {
    render() {
        
        return (
            <div style={{ height: '100%' }}>
                <Navbar />
                <main style={{ marginTop: '60px' }}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4 small__column'>
                                Prof
                            </div>
                            <div className='col-md-8 big__column'>
                                Post by Users<br />brbrb
                                <div className='post__lite'>
                                    <Modal text='Post' />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Homepage;
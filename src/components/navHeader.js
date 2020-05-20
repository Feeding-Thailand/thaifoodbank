import React from 'react'
import { Link } from 'gatsby'
import firebase from './firebase'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: 'loading'
        }
    }
    signIn(option) {
        if (option === 'google') {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithRedirect(provider)
        }
        else {
            const provider = new firebase.auth.FacebookAuthProvider()
            firebase.auth().signInWithRedirect(provider)
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user })
            }
            else {
                this.setState({ user: false })
            }
        })
    }
    render() {
        return (
            <div>
                <div onClick={() => this.setState({ showModal: true })} className='avatar' style={{ backgroundImage: `url(${this.state.user.photoURL})` }}>

                </div>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header>
                        <Modal.Title>
                            บัญชีของคุณ
                        </Modal.Title>
                        <button className='btn btn-icon' onClick={() => this.setState({ showModal: false }, () => console.log('close'))}><span className='material-icons'>close</span></button>
                    </Modal.Header>
                    <Modal.Body>

                        {this.state.user === false &&
                            <div className='mt-3 mb-3'>
                                <div className='mb-4 text-center'>
                                    <h4>กรุณาเข้าสู่ระบบ</h4>
                                </div>
                                <div>
                                    <Button variant='light' className='text-dark w-100 mb-4' onClick={() => this.signIn('google')}>
                                        <img width='18px' height='18px' src={require('../assets/images/google.svg')} /> ดำเนินการต่อด้วยบัญชี Google
                                        </Button>
                                    <Button variant='light' className='text-dark w-100' onClick={() => this.signIn('facebook')}>
                                        <img width='18px' height='18px' src={require('../assets/images/facebook.svg')} /> ดำเนินการต่อด้วยบัญชี Facebook
                                </Button>
                                </div>
                            </div>
                        }
                        {this.state.user &&
                            <div>
                                <Button onClick={async () => await firebase.auth().signOut()} variant='warning'>ออกจากระบบ</Button>
                            </div>
                        }


                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
const NavHeader = (props) => (
    <div className='bg-white shadow-xs w-100 d-flex light-border pt-3 pb-3 pl-md-5 pr-md-5 pl-3 pr-3' style={{ borderBottom: 'solid 1px' }}>
        <div className='d-flex w-100' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Link to='/help-matcher'>
                    <span className='logo-header' />
                </Link>
            </div>
            <div>
                <Profile />
            </div>
        </div>

    </div>
)

export default NavHeader
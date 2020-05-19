import React from 'react'
import { Link } from 'gatsby'
import firebase from './firebase'
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: false
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user })
            }
        })
    }
    render() {
        return (
            <div className='avatar' style={{backgroundImage: `url(${this.state.user.photoURL})`}}>

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
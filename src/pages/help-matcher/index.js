import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import HelpList from '../../components/helpList'
import Footer from '../../components/footer'
import Button from 'react-bootstrap/Button'
import { Link } from 'gatsby'
import _ from 'lodash'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import firebase from '../../components/firebase'
function parseAddress(address) {
    var x = address.split(', ')
    x.splice(0, 1)
    return x.join(', ')
}
function formatText(text) {
    if (text.length < 100) {
        return text
    }
    else {
        return `${text.substring(0, 100)} ...`
    }
}

export default class HelpMatcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: 'loading',
            latestPost: 'loading'
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({ loggedIn: true })
                const token = await firebase.auth().currentUser.getIdToken()
                const req = await axios.get(`${apiEndpoint}/post/latest`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (req.data != false) {
                    this.setState({ latestPost: { ...req.data.data, id: req.data.id } })
                }
                else {
                    this.setState({ latestPost: 'n/a' })
                }
            }
            else {
                this.setState({ user: false, loggedIn: false, latestPost: 'n/a' })
            }
        })
    }
    render() {
        return (
            <div>
                <Header>

                </Header>
                <div style={{ backgroundColor: '#f7fafc' }}>
                    <NavHeader></NavHeader>
                    <div className='container pt-5 pb-5' >
                        <div className='mb-5 text-center'>
                            <h1>Help Matcher</h1>
                            <p className='text-muted'>พื้นที่ที่ผู้ให้พบกับผู้รับ ผู้ที่ต้องการความช่วยเหลือสามารถใช้พื้นที่นี้ให้คนที่ต้องการให้ มอบความช่วยเหลือได้</p>
                            <img style={{maxWidth: 720}} className='w-100 mt-3' alt='รายละเอียด Help Matcher' src={require('../../assets/images/help-matcher-fyi.png')} />
                        </div>
                        {this.state.latestPost !== 'loading' && this.state.latestPost !== 'n/a' &&
                            <div className='row mb-4'>
                                <div className='col-12'>
                                    <h2>ข้อมูลขอความช่วยเหลือของคุณ</h2>
                                </div>
                                <div className='col-md-6 mb-4 mt-4'>
                                    <Link to={`/help-matcher/view?id=${this.state.latestPost.id}`}>
                                        <div className='item pb-3 shadow-md pt-3' style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/thaifoodbank.appspot.com/o/${this.state.latestPost.id}%2f1.jpg?alt=media)` }}>
                                            <div className='text-white pl-3 text-over'>
                                                <h4 className='mb-0 text-white'>{this.state.latestPost.name}</h4>
                                                <span>{parseAddress(this.state.latestPost.placename)}</span>
                                                <p className='mb-0'>{formatText(this.state.latestPost.need)}</p>
                                            </div>
                                            <div className='overlay'></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        }
                        {this.state.latestPost === 'n/a' &&
                            <div className='row mb-5'>
                                <div className='col-12'>
                                    <Link to='/help-matcher/register' className='fig-link p-3 item flex-center text-center shadow-md' style={{ backgroundImage: `url(${require('../../assets/images/register-help.jpg')})`, alignItems: 'center' }}>
                                        <h4 className='mb-0 text-white'>ลงทะเบียนขอรับความช่วยเหลือ</h4>
                                    </Link>
                                </div>
                            </div>
                        }
                        <div className='mb-4 row'>
                            <div className='col-md-6 pb-3'>
                                <h2>ผู้ต้องการความช่วยเหลือขณะนี้</h2>
                            </div>
                            <div className='col-md-6 pb-3 d-flex justify-content-md-end align-items-md-start'>
                                <Link to='/help-matcher/map' className='btn btn-primary'>ดูผู้ต้องการความช่วยเหลือใกล้ตัวคุณ</Link>
                            </div>
                        </div>
                        <HelpList />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
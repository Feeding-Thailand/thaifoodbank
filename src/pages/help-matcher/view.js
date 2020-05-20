import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Button from 'react-bootstrap/Button'
import Footer from '../../components/footer'
import { FacebookProvider, Comments } from 'react-facebook'
import queryString from 'query-string'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import firebase from '../../components/firebase'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import * as moment from 'moment'

const Donors = (props) => (
    <div>
        {props.donors && props.donors.map((donor, index) => {
            return (
                <div className='d-flex mb-3' key={index}>
                    <div className='avatar' style={{backgroundImage: `url(${donor.photoURL})`}}/>
                    <div className='ml-3 flex-center'>
                        <span>{donor.displayName}</span>
                        <small className='text-muted'>{moment(donor.createdAt).fromNow()}</small>
                    </div>
                </div>
            )
        })}
    </div>
)
export default class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 'loading',
            images: [],
            contact: 'loading'
        }
    }
    showContact() {
        this.setState({ showModal: true }, async () => {
            if (firebase.auth().currentUser) {
                await this.getContact()
            }
        })
    }
    async getContact() {
        try {
            const id = queryString.parse(this.props.location.search).id
            const token = await firebase.auth().currentUser.getIdToken()
            const req = await axios.get(`${apiEndpoint}/post/${id}/contact`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({ contact: req.data.contact, isAlreadyDonated: req.data.isAlreadyDonated })
        }
        catch (err) {
            console.log(err)
        }

    }
    async donate() {
        this.setState({ saving: true, next: true })
        try {
            const id = queryString.parse(this.props.location.search).id
            const token = await firebase.auth().currentUser.getIdToken()
            const req = await axios.put(`${apiEndpoint}/donate/${id}`, {
                isAnonymous: this.state.isAnonymous ? this.state.isAnonymous : false,
                name: this.state.name
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(req.data)
            this.setState({ showModal: false })

        }
        catch (err) {
            console.log(err)
            this.setState({ saving: false })
        }
    }
    async componentDidMount() {
        try {
            const id = queryString.parse(this.props.location.search).id
            const req = await axios.get(`${apiEndpoint}/post/${id}`)
            this.setState({ data: req.data })
            req.data.photos.map((item, index) => {
                const image = `https://firebasestorage.googleapis.com/v0/b/thaifoodbank.appspot.com/o/${id}%2f${item}?alt=media`
                console.log(image)
                this.setState({ images: [...this.state.images, image] })
            })
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    this.setState({ user: user.uid, name: user.displayName })

                } else {
                    this.setState({ user: false })
                }
            })

        } catch (err) {
            console.log(err)
            this.setState({ data: 'error' })
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
    formHandler(e) {
        const id = e.target.id
        if (id === 'isAnonymous') {
            this.setState({ [id]: e.target.checked })
        }
        else {
            this.setState({ [id]: e.target.value })
        }

    }
    render() {
        return (
            <div>
                <Header>
                    <title>Feeding Thailand | Help Matcher</title>
                </Header>
                <NavHeader></NavHeader>
                <div className='pt-5 pb-5 pl-3 pr-3' style={{ backgroundColor: '#f7fafc' }}>
                    <Modal show={this.state.confirmStatus} onHide={() => this.setState({ confirmStatus: false })}>
                        <Modal.Header>
                            <Modal.Title>
                                ยืนยันสถานะ
                            </Modal.Title>
                            <button className='btn btn-icon' onClick={() => this.setState({ confirmStatus: false })}><span className='material-icons'>close</span></button>
                        </Modal.Header>
                        <Modal.Body>
                            เมื่อท่านกดปุ่ม<b>ยืนยันการได้รับความช่วยเหลือ</b>แล้ว ข้อมูลความช่วยเหลือของคุณจะถูกเปลี่ยนสถานะเป็นได้รับความช่วยเหลือแล้ว
                            และจะถูกนำออกจากหน้าแสดงผู้ต้องการความช่วยเหลือ
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='light' onClick={() => this.setState({ confirmStatus: false })}>
                                ปิดหน้าต่างนี้
                            </Button>
                            <Button variant='secondary'>
                                ยืนยันการได้รับความช่วยเหลือ
                            </Button>

                        </Modal.Footer>

                    </Modal>
                    <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                        <Modal.Header>
                            <Modal.Title>ติดต่อมอบความช่วยเหลือ</Modal.Title>
                            <button onClick={() => this.setState({ showModal: false })} className='btn btn-icon'><span className='material-icons'>close</span></button>
                        </Modal.Header>

                        <Modal.Body>
                            <>
                                {!this.state.user &&
                                    <div className='mt-3 mb-3'>
                                        <div className='mb-4 text-center'>
                                            <h4>กรุณาเข้าสู่ระบบ</h4>
                                        </div>
                                        <div>
                                            <Button variant='light' className='text-dark w-100 mb-4' onClick={() => this.signIn('google')}>
                                                <img width='18px' height='18px' src={require('../../assets/images/google.svg')} /> ดำเนินการต่อด้วยบัญชี Google
                                            </Button>
                                            <Button variant='light' className='text-dark w-100' onClick={() => this.signIn('facebook')}>
                                                <img width='18px' height='18px' src={require('../../assets/images/facebook.svg')} /> ดำเนินการต่อด้วยบัญชี Facebook
                                            </Button>
                                        </div>
                                    </div>
                                }
                                {this.state.user &&
                                    <div>
                                        {this.state.contact === 'loading' &&
                                            <div className='text-center p-3 w-100'>
                                                <Spinner animation='border' variant='primary' />
                                            </div>
                                        }
                                        {this.state.contact !== 'loading' &&
                                            <div>
                                                <div className='alert mt-3 alert-primary'>
                                                    <b>ข้อมูลติดต่อ</b> {this.state.contact}
                                                </div>
                                                <hr />
                                                <h4 className='mb-3'>ข้อมูลผู้บริจาค</h4>
                                                {!this.state.isAlreadyDonated &&
                                                    <Form onChange={(e) => this.formHandler(e)}>
                                                        <Form.Group controlId='name'>
                                                            <Form.Label>ชื่อ-นามสกุล</Form.Label>
                                                            <Form.Control
                                                                disabled={this.state.isAnonymous === true}
                                                                defaultValue={this.state.name}
                                                                placeholder="ชื่อ-นามสกุล"
                                                                isInvalid={!this.state.name && this.state.next && !this.state.isAnonymous}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Check
                                                                custom
                                                                type='checkbox'
                                                                label='ไม่ประสงค์ออกนาม'
                                                                id='isAnonymous'
                                                            />
                                                        </Form.Group>
                                                    </Form>
                                                }
                                                {this.state.isAlreadyDonated &&
                                                    <Alert variant='warning'>คุณได้แสดงความประสงค์บริจาคกับบุคคลนี้ไปแล้ว</Alert>
                                                }
                                                <Button disabled={this.state.saving || this.state.isAlreadyDonated} onClick={async () => await this.donate()} className='mt-3'>ยืนยันการให้ความช่วยเหลือ</Button>

                                            </div>

                                        }
                                    </div>
                                }
                            </>
                        </Modal.Body>
                    </Modal>
                    <div className='shadow-md container bg-white rounded p-4 d-flex' style={{ flexDirection: 'column', alignItems: 'center', maxWidth: 800 }}>
                        {(this.state.data.uid === this.state.user) && this.state.data !== 'loading' &&
                            <div className='w-100 mb-3'>
                                <h4><span className='badge badge-primary'>ข้อมูลของคุณ</span></h4>
                            </div>
                        }
                        <div className='featured-image' style={{ backgroundImage: `url(${this.state.images[0]})` }} />
                        {this.state.data === 'loading' &&
                            <Spinner className='m-4' animation='border' variant='primary' />
                        }
                        {this.state.data !== 'loading' && this.state.data !== 'error' &&
                            <div className='w-100'>
                                <div className='w-100'>
                                    <div className='row'>
                                        <div className='col-md-12 pb-3'>
                                            <h2>{this.state.data.name}</h2>
                                            <span className='text-primary'><span className='material-icons'>place</span> {this.state.data.placename}</span>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>

                                        <div className='col-6'>
                                            {this.state.data.uid !== this.state.user &&
                                                <Button onClick={() => this.showContact()} className='w-100 h-100'>ติดต่อมอบความช่วยเหลือ</Button>
                                            }
                                            {this.state.data.uid === this.state.user &&
                                                <Button onClick={() => this.setState({ confirmStatus: true })} variant='secondary' className='w-100 h-100'>ได้รับความช่วยเหลือแล้ว</Button>
                                            }
                                        </div>
                                        <div className='col-6'>
                                            <Button variant='light' className='w-100 h-100'>แชร์โพสต์นี้</Button>
                                        </div>
                                    </div>

                                </div>
                                <hr />
                                <div className='w-100'>
                                    <h4>รายละเอียด</h4>
                                    <p>{this.state.data.description}</p>
                                    <h4>ความช่วยเหลือที่ต้องการ</h4>
                                    <p className='mb-0'>{this.state.data.need}</p>
                                </div>
                            </div>
                        }
                        <hr />
                        <div className='w-100 mt-3'>
                            <h4 className='mb-4'>ผู้ร่วมช่วยเหลือ <span className='badge badge-danger'>{this.state.data.donorsCount  } คน</span></h4>
                            <Donors donors={this.state.data.donors} />
                        </div>
                        <hr />
                        <div className='w-100'>
                            <FacebookProvider appId="637224560162543">
                                <Comments href="https://thaifoodbank.web.app/help-matcher/view" width='100%' />
                            </FacebookProvider>
                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        )
    }
}
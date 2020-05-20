import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavHeader from '../../components/navHeader'
import firebase from '../../components/firebase'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import { Redirect } from '@reach/router'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            next: false,
        }
    }
    async componentDidMount() {
        const user = await firebase.auth().currentUser
        this.setState({
            displayName: user.displayName,
            photoURL: user.photoURL
        })
    }
    async save() {
        this.setState({ next: true, saving: true })
        if (
            this.state.name &&
            this.state.contact &&
            this.state.postcode &&
            this.state.description &&
            this.state.need &&
            this.state.pid &&
            this.state.imageDataURL
        ) {
            try {
                var payload = {
                    name: String(this.state.name),
                    contact: String(this.state.contact),
                    postcode: String(this.state.postcode),
                    description: String(this.state.description),
                    need: String(this.state.need),
                    pid: String(this.state.pid),
                    imageDataURL: [String(this.state.imageDataURL)]
                }
                const token = await firebase.auth().currentUser.getIdToken()
                const req = await axios.post(`${apiEndpoint}/post/create`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(req.data)
                if (req.data.status === 'success') {
                    this.setState({ redirect: req.data.firestoreId })
                }
                else {
                    this.setState({ error: true, saving: false })
                }
            } catch (err) {
                const response = err.response.data.status
                console.log(response)
                this.setState({ error: true, saving: false, errStatus: response })
            }
        }
        else {
            this.setState({ saving: false })
            console.log('incomplete')
        }
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    formHandler(e) {
        if (e.target.id === 'photo') {
            const file = e.target.files[0]
            this.setState({ fileName: file.name })
            this.getBase64(file).then((base64) => {
                this.setState({ 'imageDataURL': base64 })
            })
        }
        else {
            this.setState({ [e.target.id]: e.target.value })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect noThrow to={`/help-matcher/view?id=${this.state.redirect}`} />
        }
        else {
            return (
                <Form onChange={(e) => this.formHandler(e)}>
                    <Modal show={this.state.showPolicy} onHide={() => this.setState({ showPolicy: false })}>
                        <Modal.Header>
                            <Modal.Title>ข้อตกลงการใช้ข้อมูลส่วนบุคคล</Modal.Title>
                            <button onClick={() => this.setState({ showPolicy: false })} className='btn btn-icon'>
                                <span className='material-icons'>close</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            ข้อตกลงการใช้ข้อมูลส่วนบุคคล
                        </Modal.Body>
                    </Modal>
                    <Form.Group controlId="name">
                        <Form.Label>ชื่อ-นามสกุล</Form.Label>
                        <Form.Control placeholder="ชื่อ-นามสกุล" isInvalid={!this.state.name && this.state.next} />
                    </Form.Group>
                    <Form.Group controlId="contact">
                        <Form.Label>ข้อมูลติดต่อ เช่น Line เบอร์โทร</Form.Label>
                        <Form.Control placeholder="ข้อมูลติดต่อ" isInvalid={!this.state.contact && this.state.next} />
                    </Form.Group>
                    <Form.Group controlId="pid">
                        <Form.Label>รหัสประจำตัวประชาชน <button type='button' onClick={() => this.setState({ showPolicy: true, section: 'pid' })} className='btn btn-icon'><span style={{ fontSize: 18 }} className='text-primary mb-1 material-icons'>help</span></button></Form.Label>
                        <Form.Control placeholder="รหัสประจำตัวประชาชน" isInvalid={(this.state.next && !this.state.pid) || (this.state.errStatus === 'invalid pid')} />

                        {this.state.errStatus === 'invalid pid' &&
                            <small className='text-danger'>รหัสประจำตัวประชาชนไม่ถูกต้อง</small>
                        }
                    </Form.Group>
                    <Form.Group controlId="postcode">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control placeholder="รหัสไปรษณีย์" isInvalid={this.state.errStatus === 'postcode not found' || (this.state.next && !this.state.postcode)} />
                        {this.state.errStatus === 'postcode not found' &&
                            <small className='text-danger'>รหัสไปรษณีย์ไม่ถูกต้อง</small>
                        }
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>รายละเอียดความเป็นอยู่</Form.Label>
                        <Form.Control placeholder='รายละเอียดความเป็นอยู่' as="textarea" rows="3" isInvalid={this.state.next && !this.state.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>อัพโหลดรูปภาพเพิ่มเติม</Form.Label>
                        <Form.File
                            isInvalid={this.state.next && !this.state.imageDataURL}
                            label={this.state.fileName ? this.state.fileName : 'อัพโหลดรูปภาพ'}
                            custom
                            id='photo'
                        />
                    </Form.Group>
                    <Form.Group controlId="need">
                        <Form.Label>สิ่งของที่ต้องการให้ช่วยเหลือ</Form.Label>
                        <Form.Control placeholder='สิ่งของที่ต้องการให้ช่วยเหลือ' as="textarea" rows="3" isInvalid={!this.state.need && this.state.next} />
                    </Form.Group>
                    {this.state.error === true &&
                        <Alert variant='danger'>
                            <b>เกิดข้อผิดพลาด</b> กรุณาตรวจสอบข้อมูล
                        </Alert>
                    }


                    <hr />
                    <div className='text-dark'>การกด<b>บันทึกข้อมูล</b> หมายความว่าท่านยินยอม<button type='button' onClick={() => this.setState({ showPolicy: true })} className='btn btn-link p-0'>ข้อตกลงการใช้ข้อมูลส่วนบุคคล</button>ของเราแล้ว</div>
                    <Button className='mt-3' disabled={this.state.saving} onClick={async () => await this.save()} variant="primary">
                        บันทึกข้อมูล
                    </Button>
                </Form>
            )
        }
    }
}
export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: 'loading',
            redirect: 'loading'
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
        firebase.auth().onAuthStateChanged(async (user) => {

            if (user) {
                this.setState({ loggedIn: true })
                try {
                    const token = await user.getIdToken()
                    const req = await axios.get(`${apiEndpoint}/post/latest`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(req.data)
                    if (req.data === false) {
                        this.setState({ redirect: false })
                    }
                    else {
                        this.setState({ redirect: req.data.id })
                    }
                }
                catch (err) {
                    console.log(err)
                }
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    render() {
        if (this.state.redirect !== 'loading' && this.state.redirect !== false) {
            return <Redirect noThrow to={`/help-matcher/view?id=${this.state.redirect}`} />
        }
        else {
            return (
                <div>
                    <NavHeader />
                    <div className='bg-light-grey pt-5 pb-5'>
                        <Header>
                            <title>ลงทะเบียนขอรับความช่วยเหลือ</title>
                        </Header>

                        <div className='bg-white rounded shadow-md container p-4' style={{ maxWidth: 720 }}>

                            <div>
                                <h1 className='mb-0'>ลงทะเบียน</h1>
                                <h3 style={{ fontWeight: 400 }}>ขอรับความช่วยเหลือ</h3>
                                <p className='bigger-p'>เมื่อท่านลงทะเบียนประสงค์ขอรับความช่วยเหลือทางเว็บไซต์ ระบบจะบันทึกข้อมูลเพื่อนำไปแสดงผลให้ผู้ประสงค์
                                มอบความช่วยเหลือให้ติดต่อหาท่านโดยตรงเพื่อมอบความช่วยเหลือแก่ท่านในลำดับถัดไป
                            </p>
                            </div>
                            <div>
                                {this.state.loggedIn === 'loading' || this.state.redirect === 'loading' &&
                                    <div className='flex-center w-100' style={{alignItems:'center'}}>
                                        <Spinner variant='primary' animation='border' />
                                    </div>
                                }
                                {this.state.loggedIn === true && this.state.redirect !== 'loading' &&
                                    <RegisterForm />
                                }
                                {this.state.loggedIn === false &&
                                    <div className='mt-4'>
                                        <Button variant='light' className='text-dark w-100 mb-4' onClick={() => this.signIn('google')}>
                                            <img width='18px' height='18px' src={require('../../assets/images/google.svg')} /> ดำเนินการต่อด้วยบัญชี Google
                                        </Button>
                                        <Button variant='light' className='text-dark w-100' onClick={() => this.signIn('facebook')}>
                                            <img width='18px' height='18px' src={require('../../assets/images/facebook.svg')} /> ดำเนินการต่อด้วยบัญชี Facebook
                                        </Button>
                                    </div>
                                }
                            </div>


                        </div>
                    </div>
                    <Footer />

                </div>
            )
        }
    }
}
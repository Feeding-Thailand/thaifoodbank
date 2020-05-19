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


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            next: false
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
        this.setState({ next: true })
        if (
            this.state.name &&
            this.state.contact &&
            this.state.postcode &&
            this.state.description &&
            this.state.need &&
            this.state.pid &&
            this.state.imageDataURL
        ) {
            var payload = {
                name: String(this.state.name),
                contact: String(this.state.contact),
                postcode: String(this.state.postcode),
                description: String(this.state.description),
                need: String(this.state.need),
                pid: String(this.state.pid),
                imageDataURL: String(this.state.imageDataURL)
            }
            console.log(payload)
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
                this.setState({ error: true })
            }
        }
        else {
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
                console.log(base64)
                this.setState({ 'imageDataURL': base64 })
            })
        }
        else {
            this.setState({ [e.target.id]: e.target.value })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/help-matcher/view?id=${this.state.redirect}`} />
        }
        else {
            return (
                <Form onChange={(e) => this.formHandler(e)}>
                    <Form.Group controlId="name">
                        <Form.Label>ชื่อ-นามสกุล</Form.Label>
                        <Form.Control placeholder="ชื่อ-นามสกุล" />
                    </Form.Group>
                    <Form.Group controlId="contact">
                        <Form.Label>ข้อมูลติดต่อ เช่น Line เบอร์โทร</Form.Label>
                        <Form.Control placeholder="ข้อมูลติดต่อ" />
                    </Form.Group>
                    <Form.Group controlId="pid">
                        <Form.Label>รหัสประจำตัวประชาชน</Form.Label>
                        <Form.Control placeholder="รหัสประจำตัวประชาชน" />
                    </Form.Group>
                    <Form.Group controlId="postcode">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control placeholder="รหัสไปรษณีย์" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>รายละเอียดความเป็นอยู่</Form.Label>
                        <Form.Control placeholder='รายละเอียดความเป็นอยู่' as="textarea" rows="3" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>อัพโหลดรูปภาพเพิ่มเติม</Form.Label>
                        <Form.File
                            label={this.state.fileName ? this.state.fileName : 'อัพโหลดรูปภาพ'}
                            custom
                            id='photo'
                        />
                    </Form.Group>
                    <Form.Group controlId="need">
                        <Form.Label>สิ่งของที่ต้องการให้ช่วยเหลือ</Form.Label>
                        <Form.Control placeholder='สิ่งของที่ต้องการให้ช่วยเหลือ' as="textarea" rows="3" />
                    </Form.Group>

                    <Button onClick={async () => await this.save()} variant="primary">
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
            loggedIn: 'loading'
        }
    }

    signIn() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    render() {
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
                            {this.state.loggedIn === true &&
                                <RegisterForm />
                            }
                            {this.state.loggedIn === false &&
                                <div className='mt-4'>
                                    <Button variant='light' className='text-dark w-100 mb-4' onClick={() => this.signIn()}>
                                        <img width='18px' height='18px' src={require('../../assets/images/google.svg')} /> ดำเนินการต่อด้วยบัญชี Google
                                    </Button>
                                    <Button variant='light' className='text-dark w-100'>
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
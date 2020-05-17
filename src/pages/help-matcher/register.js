import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavHeader from '../../components/navHeader'
import firebase from '../../components/firebase'
import axios from 'axios'

var payload = {
    name: String(),
    contact: String(),
    postcode: String(),
    description: String(),
    helpNeeded: String(),
    nationalId: String()
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            next: false
        }
    }
    async save() {
        this.setState({ next: true })
        if (
            this.state.name &&
            this.state.contact &&
            this.state.postcode &&
            this.state.description &&
            this.state.helpNeeded &&
            this.state.nationalId
        ) {
            await axios.post()
        }
    }
    formHandler(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
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
                <Form.Group controlId="nationalId">
                    <Form.Label>รหัสประจำตัวประชาชน</Form.Label>
                    <Form.Control placeholder="รหัสประจำตัวประชาชน" />
                </Form.Group>
                <Form.Group controlId="postcode">
                    <Form.Label>รหัสไปรษณีย์</Form.Label>
                    <Form.Control placeholder="รหัสไปรษณีย์" />
                </Form.Group>
                <Form.Group controlId="details">
                    <Form.Label>รายละเอียดความเป็นอยู่</Form.Label>
                    <Form.Control placeholder='รายละเอียดความเป็นอยู่' as="textarea" rows="3" />
                </Form.Group>
                <Form.Group controlId="details">
                    <Form.Label>อัพโหลดรูปภาพเพิ่มเติม</Form.Label>
                    <Form.File
                        id="custom-file"
                        label={'อัพโหลดรูปภาพ'}
                        custom
                    />
                </Form.Group>
                <Form.Group controlId="helpNeeded">
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
                <Footer/>

            </div>
        )
    }
}
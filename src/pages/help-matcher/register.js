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
            const ext = file.name.split('.').pop()
            if (file.size < 2 * 1024 * 1024 && (ext === 'jpg' || ext === 'jpeg' || ext === 'png')) {
                this.setState({ fileName: file.name.substring(0,20), uploadForbidden: false })
                this.getBase64(file).then((base64) => {
                    this.setState({ 'imageDataURL': base64 })
                })
            }
            else {
                this.setState({ uploadForbidden: true })
            }
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
                    <Modal scrollable size='lg' show={this.state.showPolicy} onHide={() => this.setState({ showPolicy: false })}>
                        <Modal.Header>
                            <Modal.Title>ข้อตกลงการใช้ข้อมูลส่วนบุคคล</Modal.Title>
                            <button onClick={() => this.setState({ showPolicy: false })} className='btn btn-icon'>
                                <span className='material-icons'>close</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body className='p-4'>
                            <p>
                                ข้อมูลที่คุณกรอกในหน้าลงทะเบียนขอรับความช่วยเหลือนี้จะถูกนำไปประมวลผลและแสดงผลตาม
                                ข้อความที่ระบุไว้ ดังต่อไปนี้
                            </p>
                            <h5>ข้อมูลที่จะถูกเข้าถึงได้อย่างเป็นสาธารณะ</h5>
                            <p>ข้อมูลที่ระบุในส่วนนี้จะสามารถถูกเข้าถึงได้จากบุคคลภายนอกโดยไม่ต้องมีการยืนยันตัวตน มีจุดประสงค์
                            เพื่อนำไปแสดงผลในส่วน Help Matcher ของเว็บไซต์ Feeding Thailand เพื่อให้บุคคลภายนอกเห็นข้อมูล
                            ของบุคคลที่ต้องการให้ความช่วยเหลือ ข้อมูลในส่วนนี้ได้แก่
                                <ol>
                                    <li>ชื่อ-นามสกุล ที่ท่านระบุ</li>
                                    <li>ที่อยู่อย่างคร่าวของท่าน ได้มาจากรหัสไปรษณีย์ที่ท่านระบุ</li>
                                    <li>ข้อความรายละเอียดความเป็นอยู่</li>
                                    <li>ข้อความรายละเอียดความช่วยเหลือที่ท่านต้องการ</li>
                                    <li>รูปภาพที่ท่านอัพโหลด</li>
                                </ol>
                            </p>
                            <h5>ข้อมูลที่ต้องผ่านการยืนยันตนก่อนการเข้าถึง</h5>
                            <p>
                                ข้อมูลที่ระบุในส่วนนี้จะสามารถถูกเข้าถึงได้จากบุคคลภายนอกภายหลังการยืนยันตัวตนเพื่อป้องกันการรั่วไหลของข้อมูล
                                ข้อมูลในส่วนนี้ได้แก่
                                <ol>
                                    <li>ข้อมูลติดต่อที่ท่านระบุไว้ เพื่อให้ผู้ที่ต้องการให้ความช่วยเหลือสามารถติดต่อกับท่านเพื่อให้ความช่วยเหลือได้โดยตรง</li>
                                </ol>
                            </p>
                            <h5>ข้อมูลที่ไม่สามารถเข้าถึงได้โดยบุคคลภายนอก</h5>
                            <p>ข้อมูลที่ระบุในส่วนนี้จะไม่สามารถเข้าถึงได้จากบุคคลภายนอก และจะถูกรักษาไว้ตามมาตรฐานการเก็บข้อมูลด้วยการเข้ารหัส ข้อมูลในส่วนนี้ได้แก่
                            <ol>
                                    <li>
                                        รหัสประจำตัวประชาชนที่ท่านระบุ ใช้สำหรับการยืนยันตัวตนก่อนการบันทึกข้อมูลขอรับความช่วยเหลือเพื่อไม่ให้ผู้ที่มีรหัสบัตรประจำตัวประชาชนซ้ำกันลงทะเบียนในเวลาเดียวกัน
                                        รหัสประจำตัวประชาชนของท่านจะถูกเข้ารหัสไว้ ไม่สามารถเข้าถึงได้จากบุคคลภายนอก
                                </li>
                                </ol>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({ showPolicy: false })}>ปิดหน้าต่างนี้</Button>
                        </Modal.Footer>

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
                        <Form.Control placeholder="รหัสประจำตัวประชาชน" isInvalid={(this.state.next && !this.state.pid) || (this.state.errStatus === 700)} />

                        {this.state.errStatus === 700 &&
                            <small className='text-danger'>รหัสประจำตัวประชาชนไม่ถูกต้อง</small>
                        }
                    </Form.Group>
                    <Form.Group controlId="postcode">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control placeholder="รหัสไปรษณีย์" isInvalid={this.state.errStatus === 701 || (this.state.next && !this.state.postcode)} />
                        {this.state.errStatus === 701 &&
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
                            isInvalid={this.state.next && !this.state.imageDataURL || this.state.uploadForbidden === true}
                            label={this.state.fileName ? this.state.fileName : 'อัพโหลดรูปภาพ'}
                            custom
                            id='photo'
                        />
                        {this.state.uploadForbidden === true &&
                        <small className='text-danger'>อัพโหลดได้เฉพาะรูปภาพที่มีขนาดน้อยกว่า 2 Mb</small>
                        }
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
                this.setState({ loggedIn: false, redirect: false })
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
                    <div className='bg-light-grey pt-5 pb-5 pl-3 pr-3'>
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
                                    <div className='flex-center w-100 mt-3 mb-3' style={{ alignItems: 'center' }}>
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
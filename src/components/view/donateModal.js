import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Reaptcha from 'reaptcha'
import firebase from '../firebase'
import axios from 'axios'
import { apiEndpoint } from '../constants'

export default class DonateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmed: false,
            contact: 'Loading ...',
        }
    }
    componentDidMount() {
        console.log(this.props.user)
        if (this.props.user) {
            this.setState({ name: this.props.user.displayName })
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
    async getContact(response) {
        this.setState({ confirmed: true })
        try {
            const token = await firebase.auth().currentUser.getIdToken()
            const req = await axios.get(`${apiEndpoint}/post/${this.props.id}/contact?response=${response}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(req.data)
            this.setState({ contact: req.data.contact, isAlreadyDonated: req.data.isAlreadyDonated })
        }
        catch (err) {
            console.log(err)
        }

    }
    async donate() {
        this.setState({ saving: true, next: true })
        try {
            const id = this.props.id
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
            this.props.donationConfirmed()

        }
        catch (err) {
            console.log(err)
            this.setState({ saving: false })
        }
    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={() => this.props.closeModal()}>
                <Modal.Header>
                    <Modal.Title>ติดต่อมอบความช่วยเหลือ</Modal.Title>
                    <button onClick={() => this.props.closeModal()} className='btn btn-icon'><span className='material-icons'>close</span></button>
                </Modal.Header>

                <Modal.Body>
                    <>
                        {!this.props.user &&
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
                        {this.props.user &&
                            <div>
                                <div>
                                    <h4 className='mb-3'>ข้อมูลติดต่อผู้ต้องการความช่วยเหลือ</h4>
                                    {!this.state.confirmed &&
                                        <div>
                                            <Reaptcha sitekey='6LetbPkUAAAAALLugqgdf6Lv3FP05a9XnDoED-3P' onVerify={async (response) => await this.getContact(response)} />
                                            <div className='mt-2 text-muted'>กรุณายืนยันตัวตนโดยกดปุ่มด้านบนก่อน</div>
                                        </div>
                                    }
                                    {this.state.confirmed &&
                                        <div>
                                            <div className='alert mt-3 alert-primary'>
                                                <b>ข้อมูลติดต่อ</b> {this.state.contact}
                                            </div>
                                            <div className='text-muted mt-2'>
                                                เมื่อติดต่อกับผู้ต้องการความช่วยเหลือแล้ว หรือประสงค์จะช่วยเหลือ กรุณากดปุ่มยืนยันความช่วยเหลือ
                                            </div>
                                        </div>
                                    }

                                    <hr />
                                    <h4 className='mb-3'>ข้อมูลผู้บริจาค</h4>
                                    {this.props.isDonated?.isDonated === false &&
                                        <Form onChange={(e) => this.formHandler(e)}>
                                            <Form.Group controlId='name'>
                                                <Form.Label>ชื่อ-นามสกุล</Form.Label>
                                                <Form.Control
                                                    disabled={this.state.isAnonymous === true}
                                                    defaultValue={this.props.user.displayName}
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
                                    {this.props.isDonated?.isDonated === true &&
                                        <Alert variant='warning'>คุณได้แสดงความประสงค์บริจาคกับบุคคลนี้ไปแล้ว</Alert>
                                    }
                                    <Button disabled={this.state.saving || this.state.isDonated?.isDonated} onClick={async () => await this.donate()} className='mt-3'>ยืนยันการให้ความช่วยเหลือ</Button>

                                </div>


                            </div>
                        }
                    </>
                </Modal.Body>
            </Modal>
        )
    }
}
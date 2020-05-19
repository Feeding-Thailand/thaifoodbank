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
import Reaptcha from 'reaptcha'
import Spinner from 'react-bootstrap/Spinner'

export default class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 'loading',
            images: [],
            contact: false
        }
    }
    async getContact() {
        this.setState({ showModal: true })

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
        } catch (err) {
            console.log(err)
            this.setState({ data: 'error' })
        }

    }
    async onVerify(response) {
        console.log(response)
        try {
            const id = queryString.parse(this.props.location.search).id
            const req = await axios.get(`${apiEndpoint}/post/${id}/contact?response=${response}`)
            this.setState({ contact: req.data.contact })
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div>
                <Header>
                    <title>test</title>
                </Header>
                <NavHeader></NavHeader>
                <div className='pt-5 pb-5' style={{ backgroundColor: '#f7fafc' }}>
                    <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                        <Modal.Header>
                            <Modal.Title>ข้อมูลติดต่อ</Modal.Title>
                            <div>
                                <button className='btn btn-icon'>
                                    <span className='material-icons'>close</span>
                                </button>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.contact === false &&
                                <>
                                    <div className='mb-2'><b>กรุณายืนยันตัวตน</b>
                                    </div>
                                    <div>
                                        <Reaptcha sitekey="6LetbPkUAAAAALLugqgdf6Lv3FP05a9XnDoED-3P" onVerify={async (response) => await this.onVerify(response)} />
                                    </div>
                                </>
                            }
                            {this.state.contact &&
                                <div className='alert alert-primary'>
                                    <b>ข้อมูลติดต่อ</b> {this.state.contact}
                                </div>
                            }

                        </Modal.Body>
                    </Modal>
                    <div className='shadow-md container bg-white rounded p-4 d-flex' style={{ flexDirection: 'column', alignItems: 'center', maxWidth: 800 }}>
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
                                            <Button onClick={async () => await this.getContact()} className='w-100 h-100'>ติดต่อมอบความช่วบเหลือ</Button>
                                        </div>
                                        <div className='col-6'>
                                            <Button variant='light' className='w-100 h-100'>แชร์โพสต์นี้</Button>
                                        </div>
                                    </div>

                                </div>

                                <hr />
                                <div className='w-100'>
                                    <h3>รายละเอียด</h3>
                                    <p>{this.state.data.description}</p>
                                    <h3>ความช่วยเหลือที่ต้องการ</h3>
                                    <p className='mb-0'>{this.state.data.need}</p>
                                </div>
                            </div>
                        }

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
import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Button from 'react-bootstrap/Button'
import Footer from '../../components/footer'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import { FacebookProvider, Comments } from 'react-facebook'

export default class Dashboard extends React.Component {
    constructor(props) {
        this.state = {

        }
    }
    async componentDidMount() {
        const req = await axios.get(`${apiEndpoint}/posts/:id`)
        console.log(req.data)
    }
    render() {
        return (
            <div>
                <Header>
                    <title>test</title>
                </Header>
                <NavHeader></NavHeader>
                <div className='pt-5 pb-5' style={{ backgroundColor: '#f7fafc' }}>

                    <div className='shadow-md container bg-white rounded p-4 d-flex' style={{ flexDirection: 'column', alignItems: 'center', maxWidth: 800 }}>
                        <div className='w-100 mt-3 mb-3'>
                            <h4><span className='badge badge-primary'>ข้อมูลของคุณ</span></h4>
                        </div>

                        <div className='featured-image' style={{ backgroundImage: `url(${require('../../assets/images/obama.jpg')})` }} />
                        <div className='w-100'>
                            <div className='row'>
                                <div className='col-md-6 pb-3'>
                                    <h2>Name Lastname</h2>
                                    <span className='text-primary'><span className='material-icons'>place</span> ศาลายา นครปฐม 73170</span>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <Button className='w-100 h-100'>ได้รับความช่วยเหลือแล้ว</Button>
                                </div>
                                <div className='col-6'>
                                    <Button variant='light' className='w-100 h-100'>แก้ไขข้อมูล</Button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='w-100'>

                            <h3>รายละเอียด</h3>
                            <p>ตอนนี้ข้อมือหลุด และไม่มีงานทำคับ มีหลาน อีก 2 คนครับ ตอนนี้ข้อมือหลุด และไม่มีงานทำคับ มีหลาน อีก 2 คนครับตอนนี้ข้อมือหลุด และไม่มีงานทำคับ มีหลาน อีก 2 คนครับตอนนี้ข้อมือหลุด และไม่มีงานทำคับ มีหลาน อีก 2 คนครับ</p>
                            <h3>ความช่วยเหลือที่ต้องการ</h3>
                            <p className='mb-0'>ต้องการนมผง Olive oil with extra cheese</p>
                        </div>                    
                        <hr />
                        <div className='w-100'>
                            <FacebookProvider appId="637224560162543">
                                <Comments href="https://thaifoodbank.web.app/help-matcher/view" width='100%'/>
                            </FacebookProvider>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
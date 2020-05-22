import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Footer from '../../components/footer'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'

export default class Mapping extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestGeo: true,
            position: {}
        }
    }
    async getGeo() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const geo = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                console.log(geo)
                this.setState({ position: geo, requestGeo: false })
                const req = await axios.get(`${apiEndpoint}/posts/${geo.lat}/${geo.lng}/1000`)
                console.log(req.data)
            })
        }
        else {

        }

    }
    render() {
        return (
            <div>
                <div className=' bg-light-grey'>
                    <Header>
                        <title>Help Matcher | ผู้ต้องการความช่วยเหลือรอบตัว</title>
                    </Header>

                    <NavHeader></NavHeader>
                    <Modal show={this.state.requestGeo} onHide={() => { }}>
                        <Modal.Header>
                            <Modal.Title>
                                ขอเรียกใช้ข้อมูลตำแหน่งของท่าน
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='mb-0'>
                                เว็บไซต์ Feeding Thailand ขอเรียกใช้ข้อมูลตำแหน่งจากอุปกรณ์ของท่าน
                                เพื่อแสดงข้อมูลผู้ที่ต้องการความช่วยเหลือที่อยู่ใกล้ตัวท่าน
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>window.location.replace('/help-matcher')} variant='light'>ไม่ยินยอม</Button>
                            <Button onClick={async () => await this.getGeo()}>ยินยอม</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='container pt-5 pb-5'>
                        <div className='row mb-4'>
                            <div className='col-12'>
                                <h2>ผู้ต้องการความช่วยเหลือรอบตัวท่าน</h2>
                            </div>
                        </div>
                        <div className='row'>

                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}
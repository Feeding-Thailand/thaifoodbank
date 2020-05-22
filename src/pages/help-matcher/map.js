import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Footer from '../../components/footer'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import _ from 'lodash'
import Person from '../../components/personCard'
import { Link } from 'gatsby'
import Spinner from 'react-bootstrap/Spinner'

export default class Mapping extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestGeo: true,
            position: {},
            data: 'loading'
        }
    }
    async getGeo() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const geo = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                console.log(geo)
                this.setState({ position: geo, requestGeo: false })
                const req = await axios.get(`${apiEndpoint}/posts/${geo.lat}/${geo.lng}/1000`)
                this.setState({ data: req.data }, () => console.log(this.state.data))
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
                            <Button onClick={() => window.location.replace('/help-matcher')} variant='light'>ไม่ยินยอม</Button>
                            <Button onClick={async () => await this.getGeo()}>ยินยอม</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='container pt-5 pb-5'>
                        <div className='row mb-4'>
                            <div className='col-6'>
                                <h2>ผู้ต้องการความช่วยเหลือรอบตัวท่าน</h2>
                            </div>
                            <div className='col-md-6 pb-3 d-flex justify-content-md-end align-items-md-start'>
                                <Link to='/help-matcher' className='btn btn-primary'>ดูผู้ต้องการความช่วยเหลือทั้งหมด</Link>
                            </div>
                        </div>
                        <div className='row'>
                            {this.state.data !== 'loading' && !_.isEmpty(this.state.data) &&
                                this.state.data.map((item, index) => {
                                    return (
                                        <Person data={{ ...item.data, id: item.id }} key={index} />
                                    )
                                })
                            }
                            {_.isEmpty(this.state.data) &&
                                <div className='container'>
                                    <div className='w-100 pt-5 pb-5 alert alert-dark'>
                                        <h4 className='text-center text-muted mb-0'>ไม่พบข้อมูลผู้ต้องการความช่วยเหลือ</h4>
                                    </div>
                                </div>
                            }
                            {this.state.data === 'loading' &&
                                <div className='flex-center pt-5 pb-5 w-100' style={{ alignItems: 'center' }}>
                                    <Spinner variant='primary' animation="border" />
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
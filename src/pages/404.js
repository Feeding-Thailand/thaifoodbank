import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import { Link } from 'gatsby'
const Privacy = () => (
    <div>
        <Header>
            <title>Feeding Thailand | 404 Not Found</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-1' height='40px' src={require('../assets/images/logo-single-line.svg')} /></Link>
                <h1>404 ไม่พบข้อมุลที่คุณร้องขอ</h1>
                <Link to='/'>กลับไปหน้าหลัก</Link>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default Privacy
import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import {Link} from 'gatsby'
const Join = () => (
    <div>
        <Header>
            <title>Feeding Thailand | ร่วมบริจาค</title>
        </Header>
        <div className='bg-art'>
            <div style={{ maxWidth: 720, minHeight: '100vh' }} className='container pt-5 pb-5 join-card'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')}/></Link>
                <h1>ร่วมบริจาค</h1>                
                <p>
                    Feeding Thailand เป็นองค์กรไม่แสวงกำไร จัดตั้งเพื่อมอบอาหาร โอกาส และคุณภาพชีวิตที่ดีกว่าให้แก่คนไทย
                    ทุกการสนับสนุนจะช่วยให้เรามอบความช่วยเหลือเหล่านี้ให้แก่ผู้คนที่ประสบปัญหาจากวิกฤต COVID-19
                </p>
                <p>
                    ท่านสามารถสนับสนุนเราได้ด้วยการบริจาคที่
                </p>

            </div>
        </div>
        <Footer />
    </div>
)
export default Join
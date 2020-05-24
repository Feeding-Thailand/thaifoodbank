import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import {Link} from 'gatsby'
const Privacy = () => (
    <div>
        <Header>
            <title>Feeding Thailand | นโยบายข้อมูลส่วนบุคคล</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')}/></Link>
                <h1>นโยบายข้อมูลส่วนบุคคล</h1>
                <h5 className='text-muted mb-4'>นโยบายข้อมูลส่วนบุคคลนี้ถูกแก้ไขล่าสุดเมื่อวันที่ 21 พฤษภาคม 2563</h5>
                <p>
                    ข้อมูลส่วนบุคคลคือข้อมูลที่สามารถใช้ในการระบุตัวตนผู้ใช้ได้ เว็บไซต์ Feeding Thailand
                    มีการเก็บข้อมูลส่วนบุคคลของท่านเพื่อให้บริการแก่ท่านตามจุดประสงค์ที่ชี้แจงไว้
            </p>

                <h3>แหล่งที่มาของข้อมูลส่วนบุคคล</h3>
                <p><ol>
                    <li>เมื่อท่านสร้างบัญชีเพื่อใช้บริการต่าง ๆ ของเรา</li>
                    <li>เมื่อท่านกรอกข้อมูลและกดบันทึกข้อมูลภายในเว็บไซต์ของเรา</li>
                    <li>จากการเก็บข้อมูลการใช้แพลตฟอร์มของท่านผ่านบราวเซอร์คุกกี้</li>
                </ol>
                </p>
                <h3>การเก็บรักษาข้อมูลส่วนบุคคล</h3>
                <p>
                    ผู้ควบคุมทำการเก็บรักษาข้อมูลส่วนบุคคลของท่าน ข้อมูลส่วนบุคคลจะถูกจัดเก็บไว้ในเครื่องมืออุปกรณ์ของเรา ได้แก่ คอมพิวเตอร์ โทรศัพท์มือถือ รวมถึงมีการเก็บข้อมูลในบนระบบ Cloud ของ Google Cloud Platform
                </p>
                <h3>ข้อมูลส่วนบุคคลที่เราเก็บ</h3>
                <p>
                    <ol>
                        <li>
                            เมื่อคุณสร้างบัญชีผู้ใช้ในเว็บไซต์ของเรา ระบบจะมีการจัดเก็บข้อมูล
                            ข้อมูลบัญชีผู้ใช้พื้นฐานของท่าน เพื่อใช้ระบุตัวตนของท่านในบริการของเรา
                            เมื่อท่านสร้างบัญชีผ่านบริการเข้าสู่ระบบด้วยบัญชี Google หรือ Facebook
                            เราจะเก็บข้อมูล Email และชื่อแสดงผล และรูปโปรไฟล์ของท่านเพื่อใช้ในบริการของเรา
                            ข้อมูลดังกล่าวจะถูกจัดเก็บไว้จนกว่าจะมีการยกเลิกบัญชี
                    </li>
                        <li>
                            เรามีการจัดเก็บข้อมูลคุกกี้เพื่อติดตามพฤติกรรมการใช้งานบริการต่าง ๆ ของท่านบนเว็บไซต์ Feeding Thailand
                            โดยมีจุดประสงค์เพื่อตรวจจับและป้องกันการใช้งานเว็บไซต์อย่างผิดวัตถุประสงค์ นอกจากนี้ยังมีการ
                        ใช้งานคุกกี้บุคคลที่สาม เพื่อตรวจวัดสถิติการใช้งานเว็บไซต์ โดยบริการของ Google Analytics <a href='https://policies.google.com/privacy?hl=en-US'>นโยบายข้อมูลส่วนบุคคลของ Google</a>
                        </li>
                    </ol>
                </p>
                <h3>ช่องทางการติดต่อ</h3>
                <p>
                    Facebook <a href='https://facebook.com/feedingthailand'>Feeding Thailand</a><br/>
                    เว็บไซต์ <a href='https://feedingthai.org'>feedingthai.org</a><br/>
                    Email <a href='mailto:feedingthailand@gmail.com'>feedingthailand@gmail.com</a>
                </p>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default Privacy
import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import { Link } from 'gatsby'
const Privacy = () => (
    <div>
        <Header>
            <title>Feeding Thailand | นโยบายข้อมูลส่วนบุคคล</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')} /></Link>
                <h1>เกี่ยวกับเรา</h1>
                <p>
                    จากสถานการณ์การแพร่ระบาดของ COVID-19 ที่ได้แพร่ระบาดไปทั่วโลกในปี 2020ส่งผลกระทบถึง สุขภาพกาย สุขภาพใจ วิถีชีวิตความเป็นอยู่ และผลกระทบทางเศรษฐกิจที่เปลี่ยนแปลงไปอย่างไม่มีใครคาดคิดว่าเหตการณ์นี้จะเกิดขึ้นครั้งหนึ่งในชีวิต ประเทศไทยเราเองก็ต้องเผชิญกับภาวะการแพร่ระบาดของโรคนี้อย่างหลีกเลี่ยงไม่ได้  มีคนจำนวนมากต้องประสบปัญหา ขาดรายได้ หลายอาชีพต้องหยุดงาน เราจึงเล็งเห็นถึงปัญหาความเดือดร้อนเหล่านี้ แม้หน่วยงานภาครัฐจะช่วยเหลืออย่างสุดความสามารถ แต่ก็ยังคงไม่เพียงพอและทั่วถึงและต่อเนื่อง  เราพบข่าวการเลือกจบชีวิตเพื่อแก้ปัญหาของคนมากมาย เราจึงมุ่งมั่นที่อยากจะเป็นศูนย์กลางในการรับเรื่องเพื่อขอรับความช่วยเหลือ และศูนย์กลางในการรับบริจาคเครื่องอุปโภคบริโภค
                </p>
                <p>
                    ด้วยแนวคิดจากองค์กร Feeding America เราจึงมุ่งมั่นที่จะเสนอก่อตั้งก่อตั้งโครงการภายใต้ชื่อ Feeding Thailand เพื่อบรรเทาภัยพิบัติแห่งประเทศไทย เพื่อให้วัตถุประสงค์ในการเป็นศูนย์กลางธนาคารอาหาร Thai Food Bank ของเรามีความมั่นคงอย่างยั่งยืนเพื่อมีอาหารเพียงพอในการจัดส่งให้ทุกท่านที่เดือดร้อนให้ทั่วถึงมากที่สุดไม่เพียงแค่ในสถานการณ์ COVID-19 แต่จะต้องดำเนินการสืบต่อไป
                </p>
                <hr />
                <h1>ทีมงาน Feeding Thailand</h1>

                <div className='row mt-5 mb-5'>
                    <div className='col-md-3 col-4'>
                        <div className='profile-pic' style={{ backgroundImage: `url(${require('../assets/images/sirawit.jpg')})` }} />
                    </div>
                    <div className='col-md-9 col-8 flex-center'>
                        <h5>สิรวิชญ์ พงศ์นคินทร์</h5>
                        <p className='text-muted mb-2'>
                            นักเรียนหลังจบการศึกษาชั้นมัธยมศึกษาปีที่ 6 ปัจจุบันกำลังฝึกงานด้านการพัฒนาซอฟต์แวร์เพื่อต่อยอดความรู้ไปในการทำงานจริง                            
                        </p>
                        <div>
                        <a rel='contact-sirawit' target='_blank' href='https://www.facebook.com/pluminf'>
                            Facebook <span className='material-icons'>launch</span>
                        </a>
                        </div>
                    </div>
                </div>
                <div className='row mt-5 mb-5'>
                    <div className='col-md-3 col-4'>
                        <div className='profile-pic' style={{ backgroundImage: `url(${require('../assets/images/porames.jpg')})` }} />
                    </div>
                    <div className='col-md-9 col-8 flex-center'>
                        <h5>ปรเมศวร์ วัฒนประสาน</h5>
                        <p className='text-muted mb-2'>เพื่อนสิรวิชญ์ ศึกษาหลักสูตรคณะแพทยาศาสตร์-วิศวกรรมศาสตร์ โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล</p>
                        <div>
                        <a rel='contact-porames' target='_blank' href='https://www.facebook.com/big.porames/'>
                            Facebook <span className='material-icons'>launch</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default Privacy
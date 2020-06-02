import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'gatsby'
class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showProfile: false
        }
    }
    render() {
        const props = this.props
        return (
            <div className='col-md-4 p-4 col-sm-6 col-12'>
                <ProfileModal
                    close={() => this.setState({ showProfile: false })}
                    show={this.state.showProfile}
                    name={props.name}
                    description={props.description}
                    fbLink={props.fbLink}
                />
                <div onClick={() => this.setState({ showProfile: true })} className='profile-pic shadow-md' style={{ cursor: 'pointer', backgroundImage: `url(${require(`../assets/images/${props.imgName}`)})` }} />
                <h5 style={{ fontWeight: 400 }} className='mt-3 text-center'>{props.name}</h5>
            </div>
        )
    }
}
const ProfileModal = (props) => (
    <Modal show={props.show} onHide={() => props.close()}>
        <Modal.Header>
            <Modal.Title>
                {props.name}
            </Modal.Title>
            <button onClick={() => props.close()} className='btn-icon'><span className='material-icons'>close</span></button>
        </Modal.Header>
        <Modal.Body>
            <p className='mb-2'>
                {props.description}
            </p>
            {props.fbLink &&
                <div>
                    <a rel='contact-sirawit' target='_blank' href={props.fbLink}>
                        Facebook <span className='material-icons'>launch</span>
                    </a>
                </div>
            }
        </Modal.Body>
    </Modal>
)
const AboutUs = () => (
    <div>
        <Header>
            <title>Feeding Thailand | เกี่ยวกับเรา</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')} /></Link>
                <h1>เกี่ยวกับเรา</h1>
                <p>
                    จากสถานการณ์การแพร่ระบาดของ COVID-19 ที่ได้แพร่ระบาดไปทั่วโลกในปี 2020ส่งผลกระทบถึง สุขภาพกาย สุขภาพใจ วิถีชีวิตความเป็นอยู่ และผลกระทบทางเศรษฐกิจที่เปลี่ยนแปลงไปอย่างไม่มีใครคาดคิดว่าเหตการณ์นี้จะเกิดขึ้นครั้งหนึ่งในชีวิต ประเทศไทยเราเองก็ต้องเผชิญกับภาวะการแพร่ระบาดของโรคนี้อย่างหลีกเลี่ยงไม่ได้  มีคนจำนวนมากต้องประสบปัญหา ขาดรายได้ หลายอาชีพต้องหยุดงาน เราจึงเล็งเห็นถึงปัญหาความเดือดร้อนเหล่านี้ แม้หน่วยงานภาครัฐจะช่วยเหลืออย่างสุดความสามารถ แต่ก็ยังคงไม่เพียงพอและทั่วถึงและต่อเนื่อง  เราพบข่าวการเลือกจบชีวิตเพื่อแก้ปัญหาของคนมากมาย เราจึงมุ่งมั่นที่อยากจะเป็นศูนย์กลางในการรับเรื่องเพื่อขอรับความช่วยเหลือ และศูนย์กลางในการรับบริจาคเครื่องอุปโภคบริโภค
                </p>
                <p>
                    ด้วยแนวคิดจากองค์กร Feeding America เราจึงมุ่งมั่นที่จะเสนอก่อตั้งโครงการภายใต้ชื่อ Feeding Thailand เพื่อบรรเทาภัยพิบัติแห่งประเทศไทย เพื่อให้วัตถุประสงค์ในการเป็นศูนย์กลางธนาคารอาหาร Thai Food Bank ของเรามีความมั่นคงอย่างยั่งยืนเพื่อมีอาหารเพียงพอในการจัดส่งให้ทุกท่านที่เดือดร้อนให้ทั่วถึงมากที่สุดไม่เพียงแค่ในสถานการณ์ COVID-19 แต่จะต้องดำเนินการสืบต่อไป
                </p>
                <h3>ช่องทางการติดต่อ</h3>
                <p>
                    Facebook <a href='https://facebook.com/feedingthailand'>Feeding Thailand</a><br />
                    เว็บไซต์ <a href='https://feedingthailand.co'>feedingthailand.co</a><br />
                    Email <a href='mailto:info@feedingthailand.co'>info@feedingthailand.co</a>
                </p>
                <hr />
                <h1>ทีมงาน Feeding Thailand</h1>
                <div className='row mb-5'>
                    <Person
                        imgName='891136.jpg'
                        name='วชิรา พงษารัตน์'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะบริหาร สาขาการจัดการธุรกิจระหว่างประเทศ มหาวิทยาลัยเกษตรศาสตร์</li>
                                    <li>ปริญญาโท คณะบริหาร สาขาการจัดการผู้ประกอบการธุรกิจขนาดกลางและขนาดย่อม มหาวิทยาลัยบูรพา</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง บริษัท ราเซล จำกัด</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='891141.jpg'
                        name='รมณ พงษารัตน์'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะวิทยาศาสตร์และการจัดการ สาขาการจัดการการตลาด</li>
                                    <li>ปริญญาตรี คณะนิติศาสตร์ มหาวิทยาลัยสุโขทัยธรรมธิราช</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง บริษัท เพื่อนสินเชื่อ</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='891192.jpg'
                        name='เคียวกะ อาเบะ (Kyoka Abe)'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>คณะศิลปศาสตร์สาขาจิตรกรรม มหาวิทยาลัย เอดินเบิร์ก ประเทศอังกฤษ</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>ครูพิเศษ วิชาทัศนศิลป์และภาษาญี่ปุ่น</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='891268.jpg'
                        name='อนุวัฒน์ แสวงศร'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมไฟฟ้า มหาวิทยาลัยเทคโนโลยีพพระจอมเกล้าธนบุรี</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>อาชีพอิสระ</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='891278.jpg'
                        name='คัมภีร์พรรณ สมบูรณ์เลิศสิริ'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะศึกษาศาสตร์ สาขาการสอนภาษาจีน มหาวิทยาลัยบูรพา</li>
                                    <li>ปริญญาโท คณะศึกษาศาสตร์ สาขาภาษาศาสตร์ประยุกต์ มหาวิทยาลัย มินซู ประเทศจีน</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>ผู้ก่อตั้งสถานบันสอนภาษาจีนออนไลน์ Say Hi Chinese</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='891286.jpg'
                        name='ดร. อุทุมพร สุระยศ'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี เทคโนโลยีชีวภาพ มหาวิทยาลัยเชียงใหม่</li>
                                    <li>ปริญญาโท วิทยาศาสตร์อาหารและเทคโนโลยี มหาวิทยาลัยเชียงใหม่</li>
                                    <li>ปริญญาเอก เทคโนโลยีชีวภาพและวิศวกรรมทางทะเลประยุกต์ มหาวิทยาลัยนานาชาติ คังนึง-วอนจู ประเทศเกาหลีใต้</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>พนักงานต้อนรับสายการบิน Japan Airlines</li>
                                    <li>นักวิจัยที่สถาบันวิจัยวิทยาศาสตร์ทางทะเลชายฝั่งตะวันออก ประเทศเกาหลีใต้</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='TU_EW00_RJ.jpg'
                        name='ณรงค์พร เหล่าศรีสิน'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมอิเล็กทรอนิกส์  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</li>
                                    <li>ปริญญาโท คณะบริหารธุรกิจ</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>วิทยากรอิสระและนักเขียนอิสระ</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='tatar.jpg'
                        name='จารุวรรณ เชื้อดี'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>ปริญญาตรี คณะศึกษาศาสตร์ สาขาภาพนิ่งและภาพยนตร์ มหาวิทยาลัยบูรพา</li>
                                </ul>
                                <b>ประวัติการทำงาน</b>
                                <ul>
                                    <li>ผู้ก่อตั้ง Winchill Dessert &amp; Bistro</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='sirawit.jpg'
                        name='สิรวิชญ์ พงศ์นคินทร์'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>มัธยมปลาย โรงเรียนมหิดลวิทยานุสรณ์</li>
                                    <li>ปัจจุบันศึกษาคณะวิศวกรรมศาสตร์คอมพิวเตอร์ มหาวิทยาลัย National University of Singapore</li>
                                </ul>
                            </div>
                        }
                    />
                    <Person
                        imgName='porames-2.jpg'
                        name='ปรเมศวร์ วัฒนประสาน'
                        description={
                            <div>
                                <b>ประวัติการศึกษา</b>
                                <ul>
                                    <li>มัธยมปลาย โรงเรียนมหิดลวิทยานุสรณ์</li>
                                    <li>ปัจจุบันศึกษาคณะแพทยศาสตร์ หลักสูตรแพทยศาสตร์บัณฑิต-วิศวกรรมศาสตร์มหาบัณฑิต โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล</li>
                                </ul>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default AboutUs
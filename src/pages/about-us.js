import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import { Link } from 'gatsby'
const Person = (props) => (
    <div className='row mt-5 mb-5'>
        <div className='col-md-3 col-4'>
            <div className='profile-pic' style={{ backgroundImage: `url(${require(`../assets/images/${props.imgName}`)})` }} />
        </div>
        <div className='col-md-9 col-8 flex-center'>
            <h5>{props.name}</h5>
            <p className='text-muted mb-2'>
                {props.description}
            </p>
            {props.fbLink &&
                <div>
                    <a rel='contact-sirawit' target='_blank' href={props.fbLink}>
                        Facebook <span className='material-icons'>launch</span>
                    </a>
                </div>
            }
        </div>
    </div>
)
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
                <h3>ช่องทางการติดต่อ</h3>
                <p>
                    Facebook <a href='https://facebook.com/feedingthailand'>Feeding Thailand</a><br />
                    เว็บไซต์ <a href='https://feedingthailand.co'>feedingthailand.co</a><br />
                    Email <a href='mailto:feedingthailand@gmail.com'>feedingthailand@gmail.com</a>
                </p>
                <hr />
                <h1>ทีมงาน Feeding Thailand</h1>
                <Person
                    imgName='891136.jpg'
                    name='วชิรา พงษารัตน์'
                    description='Ceo &amp; Founder บริษัท ราเซล จำกัด  www.lasellgroups.com 
                    ปริญญาตรีการจัดการธุรกิจ มหาวิทยาลัยเกษตรศาสตร์, ปริญญาโทคณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ มหาวิทยาลัยบูรพา
                    '
                />
                <Person
                    imgName='891141.jpg'
                    name='รมณ พงษารัตน์'
                    description='Founder เพื่อนสินเชื่อ (MoneyFriend) Law &amp; Finance Consultant ปริญญาตรีการจัดการการตลาด มหาวิทยาลัยเกษตรศาสตร์, คณะนิติศาสตร์ มหาวิทยาลัยสุโขทัยธรรมาธิราช'
                />
                <Person
                    imgName='891192.jpg'
                    name='Kyoka Abe'
                    description='Class of 2020 The University of Edinburgh Scotland, UK. BA Painting'
                />
                <Person
                    imgName='891268.jpg'
                    name='อนุวัฒน์ แสวงศร'
                    description='ปริญญาตรีวิศวกรรมไฟฟ้า มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี'
                />
                <Person
                    imgName='891278.jpg'
                    name='คัมภีร์พรรณ  สมบูรณ์เลิศสิริ'
                    description={
                        <>
                            <span>ปริญญาตรีคณะศึกษาศาสตร์ การสอนภาษาจีน มหาวิทยาลัยบูรพา, Bejing Union University, Chinese Language and Literature (Teacher Training)</span><br />
                            <span>ปริญญาโท Minzu University of China. Degree of Master of Arts in Linguistics and Applied Linguistics</span>
                        </>
                    }
                />
                <Person
                    imgName='891286.jpg'
                    name='อาจารย์ ดร.อุทุมพร สุระยศ'
                    description={
                        <>
                            <span>Ph.D. Applied Marine Biotechnology and Engineering, Gangneung-Wonju National University,Republic of Korea</span><br />
                            <span>MS. Food Science and Technology,Chiang Mai University, Thailand</span><br />
                            <span>B.Sc. Biotechnology, Chiang Mai University, Thailand</span>
                        </>
                    }
                />
                <Person
                    imgName='TU_EW00_RJ.jpg'
                    name='ณรงค์พร เหล่าศรีสิน'
                    description='วิทยากรอิสระ และนักเขียน'
                />
                <Person
                    imgName='tatar.jpg'
                    name='จารุวรรณ เชื้อดี'
                    description='คณะศึกษาศาสตร์ ภาพนิ่ง ภาพยนต์ มหาวิทลาลัย บูรพา ปัจจุบัน Winchill Dessert &amp; Bistro (Founder) ศิลปินนักร้องอิสระ'
                />
                <Person
                    imgName='sirawit.jpg'
                    name='สิรวิชญ์ พงศ์นคินทร์'
                    description='นักเรียนหลังจบการศึกษาชั้นมัธยมศึกษาปีที่ 6 ปัจจุบันกำลังฝึกงานด้านการพัฒนาซอฟต์แวร์เพื่อต่อยอดความรู้ไปในการทำงานจริง (ผู้สร้างและจัดการระบบเว็บไซต์)'
                />
                <Person
                    imgName='porames-2.jpg'
                    name='ปรเมศวร์ วัฒนประสาน'
                    description='เพื่อนสิรวิชญ์ ศึกษาหลักสูตรคณะแพทยาศาสตร์-วิศวกรรมศาสตร์ โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล (ผู้ออกแบบและสร้างเว็บไซต์)'
                />
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default Privacy
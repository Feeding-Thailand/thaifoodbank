import React from "react"
import Header from '../components/header'
import Button from 'react-bootstrap/Button'
import Footer from '../components/footer'

const AboutUs = () => (
	<div className='container pt-5 pb-5'>
		<div className='row mt-3'>
			<div className='col-md-6'>
				<h2>เกี่ยวกับเรา</h2>
				<p>กลุ่ม Feeding Thailand เกิดจากการร่วมกลุ่มของจิตอาสา จากหลายหลายวิชาชีพ ที่มีแนวคิดร่วมกันในการต้องการตั้งศูนย์กลางในการจัดหาอาหาร ของใช้ และจัดการแจกจ่ายอาหารเพื่อช่วยเหลือผู้ที่ได้รับความเดือดร้อนจากภัยพิบัติในทุกสถานการณ์ได้อย่างทั่วถึงให้มากที่สุด</p>
				<a href='/about-us'>อ่านเรื่องราวของเรา<span className='material-icons'>chevron_right</span></a>
			</div>
			<div className='col-md-6'></div>
		</div>
		<hr/>
		<h2 className='text-center'>โครงการของเรา</h2>
		<div className='row mt-5 mb-5'>
			<div className='col-md-4'>
				<div className='pt-3 pb-3'>
					<h3>Help Matcher</h3>
					<p>พื้นที่ที่ผู้ให้พบกับผู้รับ ผู้ที่ต้องการความช่วยเหลือสามารถใช้พื้นที่นี้ให้คนที่ต้องการให้ มอบความช่วยเหลือได้</p>
				</div>
			</div>
			<div className='col-md-8'>
				<img className='img-fluid' src={require('../assets/images/feeding.jpg')} />
			</div>
		</div>
		<div className='row mt-5'>
			<div className='col-md-4'>
				<div className='pt-3 pb-3'>
					<h3>Food Bank</h3>
					<p>ธนาคารอาหาร ร่วมส่งอาหารเข้ามายังศูนย์ Feeding Thailand เราจะจัดส่งให้แก่คนที่ต้องการ</p>
				</div>

			</div>
			<div className='col-md-8'>
				<img className='img-fluid' src={require('../assets/images/food.jpg')} />
			</div>

		</div>


	</div>
)
const JoinUs = () => (
	<div className='topo-pattern hero light-border' style={{ borderBottom: '1px solid', borderTop: '1px solid', height: '90vh' }}>
		<div className='container text-center'>
			<h2>ร่วมเป็นส่วนหนึ่งกับพวกเรา</h2>
			<div className='mt-3'>
				<button style={{ width: 100 }} className="btn mr-4 btn-primary">ร่วมบริจาค</button>
				<button style={{ width: 100 }} className="btn btn-outline-primary">ติดต่อเรา</button>
			</div>
		</div>
	</div>
)
const IndexPage = () => (
	<div>
		<Header>
			<title>Feeding Thailand</title>
		</Header>
		<div className='hero d-flex'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 mb-5 mb-md-0 d-flex' style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start'}}>
						<img className='mb-3' src={require('../assets/images/feeding-thailand-logo.svg')} height='120px'/>
						<h3>ช่วยเหลือคนไทยในภาวะวิกฤต</h3>
						<Button size='lg' className='shadow-md mt-3'>ลงทะเบียนขอรับความช่วยเหลือ</Button>
					</div>
					<div className='col-md-6'>
						<img className='img-fluid' src={require('../assets/images/shopping_landing.svg')} />
					</div>
				</div>
			</div>
		</div>

		<AboutUs />
		<JoinUs />
		<Footer />
	</div>
)

export default IndexPage

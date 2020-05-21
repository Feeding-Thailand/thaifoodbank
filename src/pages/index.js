import React from "react"
import Header from '../components/header'
import Button from 'react-bootstrap/Button'
import Footer from '../components/footer'
import { Link } from 'gatsby'
import PostHero from '../components/post-hero-md'
const Counter = () => (
	<div className='gradient-purple mt-1'>
		<div className='container pt-5 pb-5 flex-center text-white' style={{ minHeight: 250 }}>
			<div className='row'>
				<div className='col-md-6 p-3'>
					<div className='counter text-center'>
						<h2 className='text-white'>20 คน</h2>
						<span>กำลังรอการช่วยเหลือ</span>
					</div>
				</div>
				<div className='col-md-6 p-3'>
					<div className='counter text-center'>
						<h2 className='text-white'>60 คน</h2>
						<span>ได้รับความช่วยเหลือไปแล้ว</span>
					</div>
				</div>
			</div>
		</div>
	</div>
)
const Posts = () => (
	<div>
		<div className='container pt-5 pb-5'>
			<h2 className='text-center mb-0'>ข่าวสารล่าสุดจากเรา</h2>
			<div className='row'>
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
			</div>
			<div className='row'>
				<div className='col-12 text-center'>
					<Link to='/blog'>อ่านข่าวทั้งหมด<span className='material-icons'>chevron_right</span></Link>
				</div>
			</div>
		</div>
	</div>
)
const AboutUs = () => (
	<div>
		<div className='container pt-3 pb-3'>
			<div className='row mt-4'>
				<div className='col-md-6'>
					<h2>เกี่ยวกับเรา</h2>
					<p>กลุ่ม Feeding Thailand เกิดจากการร่วมกลุ่มของจิตอาสา จากหลายหลายวิชาชีพ ที่มีแนวคิดร่วมกันในการต้องการตั้งศูนย์กลางในการจัดหาอาหาร ของใช้ และจัดการแจกจ่ายอาหารเพื่อช่วยเหลือผู้ที่ได้รับความเดือดร้อนจากภัยพิบัติในทุกสถานการณ์ได้อย่างทั่วถึงให้มากที่สุด</p>
					<a href='/about-us'>อ่านเรื่องราวของเรา<span className='material-icons'>chevron_right</span></a>
				</div>
				<div className='col-md-6'></div>
			</div>
			<hr />
			<h2 className='text-center'>โครงการของเรา</h2>
		</div>
		<div className='row m-0 mt-3'>
			<Link to='/help-matcher' className='fig-link col-md-6 bg-cover hero-home flex-center' style={{ backgroundImage: `url(${require('../assets/images/feeding.jpg')})` }}>
				<h3 className='text-white'>Help Matcher</h3>
				<p className='text-white mb-0'>พื้นที่ที่ผู้ให้พบกับผู้รับ ผู้ที่ต้องการความช่วยเหลือสามารถใช้พื้นที่นี้ให้คนที่ต้องการให้ มอบความช่วยเหลือได้</p>
			</Link>
			<Link to='/help-matcher' className='fig-link col-md-6 bg-cover hero-home flex-center' style={{ backgroundImage: `url(${require('../assets/images/food.jpg')})` }}>
				<h3 className='text-white'>Food Bank</h3>
				<p className='text-white mb-0'>ธนาคารอาหาร ร่วมส่งอาหารเข้ามายังศูนย์ Feeding Thailand เราจะจัดส่งให้แก่คนที่ต้องการ</p>
			</Link>

		</div>
	</div>
)
const JoinUs = () => (
	<div className='mt-1 topo-pattern hero' style={{ height: '80vh' }}>

		<div className='container text-center'>
			<h2 className='text-white'>ร่วมเป็นส่วนหนึ่งกับพวกเรา</h2>
			<div className='mt-3'>
				<button style={{ width: 100 }} className="btn mr-4 btn-light">ร่วมบริจาค</button>
				<button style={{ width: 100 }} className="btn btn-outline-light">ติดต่อเรา</button>
			</div>
		</div>
	</div>
)
const IndexPage = () => (
	<div>
		<Header>
			<title>Feeding Thailand</title>
		</Header>
		<div className='hero d-flex' style={{ backgroundImage: `url(${require('../assets/images/cover.jpg')})` }}>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 mb-5 mb-md-0 d-flex' style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start' }}>
						<img className='mb-3' src={require('../assets/images/feeding-thailand-logo.svg')} height='120px' />
						<h3 className='text-white'>ช่วยเหลือคนไทยในภาวะวิกฤต</h3>
						<Link to='/help-matcher' className='btn btn-lg btn-primary shadow-md mt-3'>ลงทะเบียนขอรับความช่วยเหลือ</Link>
					</div>
				</div>
			</div>
		</div>
		<div className='bg-light-grey'>
			<AboutUs />

		</div>
		<Counter />
		<Posts />
		<JoinUs />
		<Footer />

	</div>
)

export default IndexPage

import React from "react"
import Header from '../components/header'
import Footer from '../components/footer'
import { Link } from 'gatsby'
import PostHero from '../components/post-hero-md'
import JoinUs from '../components/joinUs'
import firebase from '../components/firebase'

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	async componentDidMount() {
		const db = firebase.firestore()
		const snap = await db.collection('stats').doc('stats').get()
		this.setState(snap.data())
	}
	render() {
		return (
			<div className='mt-1'>
				<div className='container pt-5 pb-5 flex-center' style={{ minHeight: 250 }}>
					<div className='row'>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.currentPosts} คน</h2>
								<span>กำลังรอการช่วยเหลือ</span>
							</div>
						</div>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.donors} คน</h2>
								<span>จำนวนผู้บริจาค</span>
							</div>
						</div>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.closedPosts} คน</h2>
								<span>ได้รับความช่วยเหลือไปแล้ว</span>
							</div>
						</div>
					</div>
				</div>
				<div className='container mb-5' style={{maxWidth: 800}}>
					<div className='aspect-1-1 shadow-lg-new' style={{ backgroundImage: `url(${require('../assets/images/1589284815752_0.jpg')})` }}>
						<div className='text-alt'>
							<span className='sarabun text-white'>หนึ่งในครอบครัวที่ได้รับการช่วเหลือจาก Feeding Thailand</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
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
			<h2 className='text-center mb-4'>โครงการของเรา</h2>
			<div className='row'>
				<PostHero
					image={require('../assets/images/help-logo.png')}
					link='/help-matcher'
					title='Help Matcher'
					excerpt='พื้นที่ที่ผู้ให้พบกับผู้รับ ผู้ที่ต้องการความช่วยเหลือสามารถใช้พื้นที่นี้ให้คนที่ต้องการให้ มอบความช่วยเหลือได้'
				/>
				<PostHero
					image={require('../assets/images/tfb-logo.png')}
					link='#'
					title='Food Bank'
					excerpt='ธนาคารอาหาร ร่วมส่งอาหารเข้ามายังศูนย์ Feeding Thailand เราจะจัดส่งให้แก่คนที่ต้องการ'
				/>
				<PostHero
					image={require('../assets/images/job-matcher-logo.png')}
					link='#'
					title='Job Finder'
					excerpt='พื้นที่ประชาสัมพันธ์ให้กับคนที่ต้องการงานในช่วงวิกฤต'
				/>
				<PostHero
					image={require('../assets/images/online-university-logo.png')}
					link='#'
					title='Online Education'
					excerpt='แพลตฟอร์มการศึกษาออนไลน์ เปิดโอกาสให้ทุกคนได้รับการศึกษา'
				/>

			</div>
			<div className='text-center mb-4 mt-3'>
				<Link to='projects'>ดูโครงการทั้งหมดของเรา<span className='material-icons'>chevron_right</span></Link>
			</div>
		</div>
	</div>
)

const IndexPage = () => (
	<div>
		<Header>
			<title>Feeding Thailand | หน้าแรก</title>
		</Header>
		<div className='hero d-flex' style={{ backgroundImage: `url(${require('../assets/images/hero-home.jpg')})` }}>
			<div className='container'>
				<div className='row'>
					<div className='col-12 mb-5 mb-md-0 d-flex' style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
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
		<JoinUs />
		<Footer />

	</div>
)

export default IndexPage
